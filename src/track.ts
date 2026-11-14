// Privacy-conscious funnel tracking for the TikTok growth agent.
// Sends only: event name, a random browser id, a random event id, campaign
// tags from the URL, which store button, page language and a coarse referrer
// kind. No cookies, no IPs stored, no health data, nothing from the app.
// Off when VITE_GROWTH_TRACK_URL is unset or the visitor asks not to be tracked.

type Lang = 'ar' | 'en';
type Source = 'tiktok' | 'search' | 'other' | 'direct';

const ENDPOINT = import.meta.env.VITE_GROWTH_TRACK_URL as string | undefined;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const TOKEN = /^[A-Za-z0-9_.-]{1,64}$/;

function optedOut(): boolean {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === '1';
}

function randomId(): string {
  return crypto.randomUUID();
}

function store(kind: 'local' | 'session') {
  try { return kind === 'local' ? window.localStorage : window.sessionStorage; } catch { return null; }
}

function visitorId(): string {
  const ls = store('local');
  const existing = ls?.getItem('niswah-vid');
  if (existing && /^[A-Za-z0-9-]{16,64}$/.test(existing)) return existing;
  const id = randomId();
  try { ls?.setItem('niswah-vid', id); } catch { /* storage blocked: per-page id */ }
  return id;
}

/** Campaign tags from this URL, or the ones remembered from the landing URL in this tab. */
export function campaign(search = location.search): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const params = new URLSearchParams(search);
  const fromUrl: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v && TOKEN.test(v)) fromUrl[k] = v;
  }
  const ss = store('session');
  if (Object.keys(fromUrl).length) {
    try { ss?.setItem('niswah-utm', JSON.stringify(fromUrl)); } catch { /* ignore */ }
    return fromUrl;
  }
  try { return JSON.parse(ss?.getItem('niswah-utm') ?? '{}'); } catch { return {}; }
}

export function sourceOf(referrer = document.referrer): Source {
  if (!referrer) return 'direct';
  let host = '';
  try { host = new URL(referrer).hostname; } catch { return 'other'; }
  if (/(^|\.)tiktok\.com$/.test(host)) return 'tiktok';
  if (/(^|\.)(google|bing|duckduckgo|yahoo|yandex)\./.test(host)) return 'search';
  if (host === location.hostname) return 'direct';
  return 'other';
}

function send(event: 'landing_visit' | 'store_click', extra: { store?: 'app_store' | 'google_play' }, lang: Lang) {
  if (!ENDPOINT || optedOut()) return;
  const body = JSON.stringify({ event, visitor_id: visitorId(), event_id: randomId(), ...campaign(), ...extra, language: lang, source: sourceOf() });
  // keepalive lets the store-click event finish while the App Store opens.
  fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true, credentials: 'omit' }).catch(() => {});
}

export function initTracking(getLang: () => Lang) {
  send('landing_visit', {}, getLang());
  document.querySelectorAll<HTMLAnchorElement>('a[data-store="apple"]').forEach((a) =>
    a.addEventListener('click', () => send('store_click', { store: 'app_store' }, getLang())),
  );
}
