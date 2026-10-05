import { Html, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import { ShowcaseApp, type ShowcaseFeature } from 'niswah-app/src/showcase/ShowcaseApp';

const features: Array<{ id: ShowcaseFeature; ar: string; en: string }> = [
  { id: 'today', ar: 'اليوم', en: 'Today' },
  { id: 'calendar', ar: 'التقويم', en: 'Calendar' },
  { id: 'insights', ar: 'التحليلات', en: 'Insights' },
  { id: 'ai', ar: 'نسوة AI', en: 'Niswah AI' },
  { id: 'fiqh', ar: 'الفقه', en: 'Fiqh state' },
  { id: 'pregnancy', ar: 'الحمل', en: 'Pregnancy' },
  { id: 'community', ar: 'المجتمع', en: 'Community' },
];

export default function App() {
  const [active, setActive] = useState<ShowcaseFeature>('today');
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const index = features.findIndex((x) => x.id === current);
        return features[(index + 1) % features.length].id;
      });
    }, 5200);
    return () => window.clearInterval(id);
  }, [autoplay]);

  const meta = features.find((x) => x.id === active)!;

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-slate-900">
      <section className="mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="order-2 lg:order-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-rose-500">Niswah interactive showcase</span>
          <h1 className="mt-4 max-w-[620px] font-serif text-5xl font-bold leading-[1.05] text-[#8E244D] md:text-7xl">
            واجهة نسوة نفسها — داخل تجربة ثلاثية الأبعاد.
          </h1>
          <p className="mt-5 max-w-[600px] text-sm leading-8 text-gray-400 md:text-base">
            الهاتف يعرض مكونات نسوة الفعلية من تطبيقك، مع بيانات تجريبية فقط بدلاً من بيانات المستخدم الحقيقية.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => { setAutoplay(false); setActive(f.id); }}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${active === f.id
                  ? 'border-rose-200 bg-rose-50 text-rose-700'
                  : 'border-black/5 bg-white text-gray-400 hover:text-rose-600'}`}
              >
                {f.ar}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-black/5 pt-6">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">{meta.en}</div>
            <button onClick={() => setAutoplay((v) => !v)} className="mt-5 text-[10px] font-bold uppercase tracking-widest text-rose-500">
              {autoplay ? 'إيقاف العرض التلقائي' : 'تشغيل العرض التلقائي'}
            </button>
          </div>
        </div>

        <div className="showcase-stage order-1 h-[760px] min-h-[660px] rounded-[48px] lg:order-2">
          <Canvas camera={{ position: [0, 0, 7.2], fov: 30 }} dpr={[1, 1.6]}>
            <ambientLight intensity={2.4} />
            <directionalLight position={[4, 7, 8]} intensity={4.5} />
            <Phone active={active} />
          </Canvas>
        </div>
      </section>
    </main>
  );
}

function Phone({ active }: { active: ShowcaseFeature }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = -0.06 + Math.sin(t * 0.42) * 0.045 + pointer.x * 0.025;
    ref.current.rotation.x = 0.015 + Math.sin(t * 0.31) * 0.012 - pointer.y * 0.014;
    ref.current.position.y = Math.sin(t * 0.64) * 0.045;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[3.38, 6.78, 0.26]} radius={0.38} smoothness={8} className="phone-shell">
        <meshStandardMaterial color="#171516" roughness={0.26} metalness={0.62} />
      </RoundedBox>
      <RoundedBox args={[3.17, 6.55, 0.035]} radius={0.31} smoothness={8} position={[0, 0, 0.155]}>
        <meshStandardMaterial color="#FDFCFB" />
      </RoundedBox>
      <Html transform position={[0, 0, 0.19]} distanceFactor={1.74} style={{ pointerEvents: 'none' }}>
        <div className="phone-viewport" dir="rtl">
          <ShowcaseApp feature={active} />
        </div>
      </Html>
    </group>
  );
}
