# Niswah landing page

Bilingual (Arabic RTL / English) marketing site for the Niswah app, built with Vite, TypeScript and Three.js.

- The hero renders three 3D iPhones in Three.js; every phone screen is a real screenshot from the app's golden tests (`niswah999/test/goldens`), stored in `public/screens`.
- Language follows `?lang=ar|en`, then the last choice, then the browser language. Copy lives in `src/i18n.ts`.
- Store links are in `index.html`. Google Play uses the app's package id `com.niswah.niswah`; the App Store link is a placeholder (`#APP_STORE_URL`) until the app has an App Store id.

```bash
npm install
npm run dev     # local dev server
npm run build   # type-check and build to dist/
```

## Conversion tracking (TikTok growth agent)

`src/track.ts` sends `landing_visit` and App Store `store_click` events to the
`growth-track` Supabase function. It is off unless `VITE_GROWTH_TRACK_URL` is set
in Vercel, e.g. `https://<project-ref>.supabase.co/functions/v1/growth-track`.
It sends only campaign tags, a random browser id, page language and a coarse
referrer kind; no cookies, and nothing when the browser sends DNT or GPC.
Tag TikTok links like `https://niswah.app/?utm_source=tiktok&utm_medium=bio&utm_campaign=tiktok_bio`.
