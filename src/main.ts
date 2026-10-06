import './styles.css';
import { applyLang, initialLang, screens, type Lang } from './i18n';
import { createShowcase } from './scene';

let lang: Lang = initialLang();

/** Where the mood card sits on the Today screenshot, as fractions of its height. */
const MOOD_CARD = { top: 0.66, bottom: 0.86 };

const canvas = document.querySelector<HTMLCanvasElement>('#hero-canvas')!;
const showcase = createShowcase(canvas);
if (!showcase) document.body.classList.add('no-webgl');

function render() {
  applyLang(lang);
  showcase?.setDirection(lang === 'ar');
  showcase?.setScreens([
    { main: screens.calendar[lang] },
    // Tapping the "How is your mood today?" card opens the mood check-in, as in the app.
    { main: screens.dashboard[lang], alt: screens.mood[lang], hotspot: MOOD_CARD },
    { main: screens.log[lang] },
  ]);
}

document.querySelectorAll<HTMLButtonElement>('[data-lang-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    render();
  }),
);

render();

// Reveal sections as they scroll into view.
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Gentle tilt on the 2D phone mockups, skipped when the visitor prefers reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

// Tour: tapping the mood card on the Today phone opens the mood check-in; tapping again goes back.
document.querySelectorAll<HTMLElement>('[data-mood-phone]').forEach((phone) => {
  const img = phone.querySelector<HTMLImageElement>('img')!;
  phone.addEventListener('click', (e) => {
    const r = img.getBoundingClientRect();
    const fromTop = (e.clientY - r.top) / r.height;
    const open = img.dataset.screen === 'mood';
    if (!open && (fromTop < MOOD_CARD.top || fromTop > MOOD_CARD.bottom)) return;
    img.dataset.screen = open ? 'dashboard' : 'mood';
    img.src = screens[img.dataset.screen][lang];
    phone.classList.toggle('mood-open', !open);
  });
});

const header = document.querySelector('.site-header')!;
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });
