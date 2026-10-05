import { Html, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, CalendarDays, HeartPulse, MessageCircleHeart, MoonStar, Sparkles, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

const features = [
  { id: 'cycle', ar: 'الدورة', en: 'Cycle', icon: HeartPulse },
  { id: 'calendar', ar: 'التقويم', en: 'Calendar', icon: CalendarDays },
  { id: 'insights', ar: 'التحليلات', en: 'Insights', icon: BarChart3 },
  { id: 'fiqh', ar: 'الفقه', en: 'Fiqh', icon: MoonStar },
  { id: 'ai', ar: 'نسوة AI', en: 'Niswah AI', icon: Sparkles },
  { id: 'pregnancy', ar: 'الحمل', en: 'Pregnancy', icon: MessageCircleHeart },
  { id: 'community', ar: 'المجتمع', en: 'Community', icon: Users },
] as const;

type Feature = (typeof features)[number]['id'];
const demo = { name: 'سارة', day: 12, cycleLength: 28, nextPeriod: 16, madhhab: 'حنفي', pregnancyWeek: 18 };

const copy: Record<Feature, [string, string]> = {
  cycle: ['دورة مفهومة، لا مجرد تواريخ.', 'حلقة حية توضح يوم الدورة، المرحلة الحالية والتوقع القادم.'],
  calendar: ['تقويم يقرأ النمط معك.', 'الأيام المسجلة والمتوقعة ونافذة الخصوبة في مشهد واحد.'],
  insights: ['من السجل إلى معنى.', 'تحويل الأشهر السابقة إلى اتجاهات سهلة القراءة.'],
  fiqh: ['السياق الصحي والفقهي معاً.', 'إرشاد مرتبط بحالة الدورة وفق المذهب المختار.'],
  ai: ['مساعد يفهم سياقك.', 'نسوة AI يقرأ السؤال داخل سياق الدورة والحالة الحالية.'],
  pregnancy: ['رحلة الحمل أسبوعاً بأسبوع.', 'تقدم الحمل والمعلومات المهمة في واجهة هادئة.'],
  community: ['مجتمع نصي يركز على التجربة.', 'أسئلة وتجارب نسائية مع الخصوصية والمحتوى أولاً.'],
};

export default function App() {
  const [active, setActive] = useState<Feature>('cycle');
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => setActive((current) => {
      const i = features.findIndex((f) => f.id === current);
      return features[(i + 1) % features.length].id;
    }), 4200);
    return () => window.clearInterval(id);
  }, [autoplay]);

  const current = features.find((f) => f.id === active)!;
  return <main className="shell">
    <section className="hero">
      <div className="copy">
        <div className="eyebrow"><i /> تجربة نسوة التفاعلية</div>
        <h1>صحتك، دورتك وعبادتك — مفهومة في مكان واحد.</h1>
        <p className="lead">استكشف تجربة نسوة كما لو كان التطبيق بين يديك. جميع البيانات المعروضة تجريبية لإبراز المزايا فقط.</p>
        <div className="pills">
          {features.map((f) => {
            const Icon = f.icon;
            return <button key={f.id} className={active === f.id ? 'pill active' : 'pill'} onClick={() => { setAutoplay(false); setActive(f.id); }}>
              <Icon size={16}/><span>{f.ar}</span>
            </button>;
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div className="caption" key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
            <small>{current.en}</small><h2>{copy[active][0]}</h2><p>{copy[active][1]}</p>
          </motion.div>
        </AnimatePresence>
        <button className="auto" onClick={() => setAutoplay(v => !v)}><i className={autoplay ? 'live' : ''}/>{autoplay ? 'إيقاف العرض التلقائي' : 'تشغيل العرض التلقائي'}</button>
      </div>
      <div className="stage">
        <div className="glow g1"/><div className="glow g2"/>
        <Canvas camera={{ position:[0,0,7.2], fov:31 }} dpr={[1,1.7]}>
          <ambientLight intensity={2.3}/><directionalLight position={[4,6,7]} intensity={4}/>
          <Phone active={active}/>
        </Canvas>
        <span className="tag top">{current.en}</span><span className="tag bottom">Mock data • Private by design</span>
      </div>
    </section>
  </main>;
}

function Phone({ active }: { active: Feature }) {
  const ref = useRef<Group>(null);
  useFrame(({clock,pointer}) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = -.08 + Math.sin(t*.45)*.055 + pointer.x*.035;
    ref.current.rotation.x = .018 + Math.sin(t*.34)*.016 - pointer.y*.018;
    ref.current.position.y = Math.sin(t*.7)*.055;
  });
  return <group ref={ref}>
    <RoundedBox args={[3.34,6.62,.28]} radius={.34} smoothness={6}><meshStandardMaterial color="#191718" roughness={.22} metalness={.6}/></RoundedBox>
    <RoundedBox args={[3.14,6.36,.045]} radius={.28} smoothness={6} position={[0,0,.166]}><meshStandardMaterial color="#fffaf8"/></RoundedBox>
    <Html transform position={[0,-.02,.205]} distanceFactor={1.72} style={{pointerEvents:'none'}}>
      <div className="phone" dir="rtl"><Screen active={active}/></div>
    </Html>
  </group>;
}

function Screen({ active }: { active: Feature }) {
  return <div className="screen">
    <header><div><small>مرحباً {demo.name}</small><b>نسوة</b></div><span>س</span></header>
    <AnimatePresence mode="wait">
      <motion.div className="view" key={active} initial={{opacity:0,x:14}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-14}}>
        {active === 'cycle' && <Cycle/>}
        {active === 'calendar' && <Calendar/>}
        {active === 'insights' && <Insights/>}
        {active === 'fiqh' && <Fiqh/>}
        {active === 'ai' && <AI/>}
        {active === 'pregnancy' && <Pregnancy/>}
        {active === 'community' && <Community/>}
      </motion.div>
    </AnimatePresence>
    <nav><span className={active==='cycle'?'on':''}>اليوم</span><span className={active==='calendar'?'on':''}>التقويم</span><span className={active==='insights'?'on':''}>التحليلات</span><span className={active==='community'?'on':''}>المجتمع</span></nav>
  </div>;
}

const Stat = ({label,value}:{label:string,value:string}) => <div className="stat"><small>{label}</small><b>{value}</b></div>;

function Cycle() {
  const deg = demo.day / demo.cycleLength * 360;
  return <div className="stack"><div className="rose"><small>دورتك الآن</small><div className="ring" style={{'--p':deg+'deg'} as React.CSSProperties}><div><span>اليوم</span><b>{demo.day}</b><em>من {demo.cycleLength}</em></div></div><p>متبقي تقريباً <b>{demo.nextPeriod} يوم</b> على الدورة القادمة</p></div><div className="cols"><Stat label="متوسط الدورة" value="28 يوم"/><Stat label="مدة الحيض" value="6 أيام"/></div><div className="soft"><small>حالة اليوم</small><b>طُهر • مرحلة جُريبية</b></div></div>;
}
function Calendar() {
  const days = Array.from({length:35},(_,i)=>i+1);
  return <div className="stack"><div className="title"><b>أكتوبر 2026</b><small>توقعات شخصية</small></div><div className="cal">{['س','ح','ن','ث','ر','خ','ج'].map(x=><small key={x}>{x}</small>)}{days.map(d=><span key={d} className={[1,2,3,4,5,6].includes(d)?'period':[29,30,31,32,33,34].includes(d)?'pred':[12,13,14,15,16,17].includes(d)?'fertile':''}>{d<=31?d:d-31}</span>)}</div><div className="legend"><span>● مسجل</span><span>◌ متوقع</span><span>● خصوبة</span></div></div>;
}
function Insights() {
  return <div className="stack"><div className="title"><b>نمط دورتك</b><small>آخر 6 أشهر</small></div><div className="chart">{[27,29,28,28,30,28].map((v,i)=><motion.i key={i} initial={{height:8}} animate={{height:36+(v-26)*12}} transition={{delay:i*.06}}><span>{v}</span></motion.i>)}</div><div className="callout"><Sparkles size={14}/> دورتك مستقرة نسبياً ضمن نطاق 27–30 يوماً.</div></div>;
}
function Fiqh() {
  return <div className="stack"><div className="fiqh"><MoonStar size={27}/><small>حالتك الشرعية اليوم</small><b>طُهر</b><em>وفق المذهب {demo.madhhab}</em></div><div className="ruling"><span>الصلاة</span><b>تجب الصلاة</b><i>✓</i></div><div className="ruling"><span>الصيام</span><b>يجوز الصيام</b><i>✓</i></div><div className="note">يربط نسوة بيانات الدورة بالحالة الفقهية لإظهار الإرشاد المناسب للسياق.</div></div>;
}
function AI() {
  return <div className="stack ai"><div className="aibadge"><Sparkles size={16}/> نسوة AI</div><div className="bubble user">هل تأخر دورتي يومين أمر طبيعي؟</div><motion.div className="bubble answer" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.45}}>قد يحدث تغير بسيط بين الدورات. أستطيع مقارنة التأخر مع نمطك المسجل وإرشادك لما يستحق المتابعة.</motion.div><div className="context"><small>السياق المستخدم</small><b>طول الدورة • السجل • المرحلة الحالية</b></div></div>;
}
function Pregnancy() {
  const p = Math.round(demo.pregnancyWeek/40*100);
  return <div className="stack"><div className="preg"><small>رحلة الحمل</small><b>الأسبوع {demo.pregnancyWeek}</b><div><motion.i initial={{width:0}} animate={{width:p+'%'}}/></div><em>{p}% من الرحلة</em></div><div className="soft"><small>هذا الأسبوع</small><b>تطور الجنين • نصائح مخصصة • مواعيد مهمة</b></div><div className="cols"><Stat label="الثلث" value="الثاني"/><Stat label="المتبقي" value="22 أسبوع"/></div></div>;
}
function Community() {
  return <div className="stack"><div className="title"><b>مجتمع نسوة</b><small>مساحة نصية خاصة</small></div><Post name="لينا" text="هل يتغير طول الدورة مع التوتر أو السفر؟" replies="18 رد"/><Post name="مها" text="شاركوني تجاربكم مع تتبع الأعراض قبل الدورة." replies="31 رد"/><div className="compose">اكتبي سؤالاً للمجتمع…</div></div>;
}
function Post({name,text,replies}:{name:string,text:string,replies:string}) { return <div className="post"><b>{name}</b><small>الآن</small><p>{text}</p><span>{replies}</span></div>; }
