import './styles.css';
import { applyLang, initialLang, screens, type Lang } from './i18n';
import { createShowcase } from './scene';

let lang: Lang = initialLang();

const canvas = document.querySelector<HTMLCanvasElement>('#hero-canvas')!;
const showcase = createShowcase(canvas);
if (!showcase) document.body.classList.add('no-webgl');

function render() {
  applyLang(lang);
  showcase?.setDirection(lang === 'ar');
  showcase?.setScreens([
    { main: screens.calendar[lang] },
    { main: screens.dashboard[lang] },
    // Clicking the flow-intensity phone flips it to the mood check-in screen and back.
    { main: screens.log[lang], alt: screens.mood[lang] },
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

const header = document.querySelector('.site-header')!;
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });
