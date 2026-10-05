import { Html, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity, ArrowDownRight, ArrowUpRight, BarChart2, Bell, Brain, CalendarDays,
  ChevronRight, Heart, Home, MessageSquare, Minus, Moon, Plus, Search, Send,
  Sparkles, TrendingUp, User, Users, Wind, Zap
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Group } from 'three';

type Feature = 'today' | 'calendar' | 'insights' | 'ai' | 'fiqh' | 'pregnancy' | 'community';

const featureList: Array<{id:Feature; ar:string; en:string}> = [
  {id:'today', ar:'اليوم', en:'Today'},
  {id:'calendar', ar:'التقويم', en:'Calendar'},
  {id:'insights', ar:'التحليلات', en:'Insights'},
  {id:'ai', ar:'نسوة AI', en:'Niswah AI'},
  {id:'fiqh', ar:'الفقه', en:'Fiqh state'},
  {id:'pregnancy', ar:'الحمل', en:'Pregnancy'},
  {id:'community', ar:'المجتمع', en:'Community'},
];

const DEMO = {
  day: 12,
  cycleLength: 28,
  periodLength: 6,
  regularity: 91,
  madhhab: 'حنفي',
};

export default function App() {
  const [active, setActive] = useState<Feature>('today');
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const idx = featureList.findIndex((x) => x.id === current);
        return featureList[(idx + 1) % featureList.length].id;
      });
    }, 5200);
    return () => window.clearInterval(id);
  }, [autoplay]);

  const meta = featureList.find((x) => x.id === active)!;

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-slate-900">
      <section className="mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="order-2 lg:order-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-rose-500">Niswah interactive showcase</span>
          <h1 className="mt-4 max-w-[620px] font-serif text-5xl font-bold leading-[1.05] text-[#8E244D] md:text-7xl">
            نفس نسوة. نفس الواجهة. بيانات تجريبية فقط.
          </h1>
          <p className="mt-5 max-w-[600px] text-sm leading-8 text-gray-400 md:text-base">
            العرض يستخدم لغة نسوة البصرية نفسها من التطبيق: الخطوط، الألوان، البطاقات، حلقة الدورة، التنقل، وحالات الفقه والذكاء الاصطناعي.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {featureList.map((f) => (
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
            <div className="mt-2 text-xl font-bold text-gray-800">
              {active === 'today' && 'حلقة الدورة والحالة اليومية'}
              {active === 'calendar' && 'التقويم والتوقعات'}
              {active === 'insights' && 'التحليلات والأنماط'}
              {active === 'ai' && 'نسوة AI داخل سياق المستخدم'}
              {active === 'fiqh' && 'الحالة الفقهية المرتبطة بالدورة'}
              {active === 'pregnancy' && 'متابعة الحمل'}
              {active === 'community' && 'مجتمع نسوة النصي'}
            </div>
            <button onClick={() => setAutoplay(v => !v)} className="mt-5 text-[10px] font-bold uppercase tracking-widest text-rose-500">
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

function Phone({ active }: { active: Feature }) {
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
          <NiswahDemo active={active} />
        </div>
      </Html>
    </group>
  );
}

function NiswahDemo({ active }: { active: Feature }) {
  const mainTab: Feature = ['today','calendar','insights','community'].includes(active) ? active : 'today';
  return (
    <div className="relative min-h-full bg-[#FDFCFB] pb-28 font-arabic">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {active === 'today' && <TodayDemo />}
          {active === 'calendar' && <CalendarDemo />}
          {active === 'insights' && <InsightsDemo />}
          {active === 'community' && <CommunityDemo />}
          {active === 'ai' && <AIDemo />}
          {active === 'fiqh' && <FiqhDemo />}
          {active === 'pregnancy' && <PregnancyDemo />}
        </motion.div>
      </AnimatePresence>
      <BottomNav active={mainTab} aiActive={active === 'ai'} />
    </div>
  );
}

function BottomNav({ active, aiActive }: { active: Feature; aiActive: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[100]">
      <nav className="pointer-events-auto flex w-full items-center justify-between border-t border-black/5 bg-white/80 px-6 pb-8 pt-3 backdrop-blur-xl shadow-[0_-10px_30px_rgba(15,23,42,0.04)]">
        <Tab icon={Home} label="اليوم" active={active === 'today'} />
        <Tab icon={CalendarDays} label="التقويم" active={active === 'calendar'} />
        <Tab icon={BarChart2} label="التحليلات" active={active === 'insights'} />
        <div className={`relative -mt-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-[#FDFCFB] shadow-[0_15px_35px_rgba(184,50,95,0.35)] ${aiActive ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-pink-600 opacity-80" />
          <Sparkles className="relative z-10 h-6 w-6 text-white" />
        </div>
        <Tab icon={Users} label="المجتمع" active={active === 'community'} />
        <Tab icon={User} label="الحساب" active={false} />
      </nav>
    </div>
  );
}

function Tab({ icon: Icon, label, active }: { icon:any; label:string; active:boolean }) {
  return <div className="relative flex flex-col items-center space-y-1">
    <Icon className={`h-6 w-6 ${active ? 'text-rose-600' : 'text-rose-900/30'}`} />
    <span className={`text-[8px] font-bold uppercase tracking-widest ${active ? 'text-rose-600' : 'text-rose-900/30'}`}>{label}</span>
    {active && <div className="absolute -bottom-2 h-1 w-1 rounded-full bg-rose-600" />}
  </div>;
}

function TodayDemo() {
  return (
    <div className="min-h-[812px] bg-[#FDFCFB] px-6 pb-32 pt-12">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-300">الاثنين • 5 أكتوبر</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#8E244D]">صباح الخير</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-400 shadow-sm"><Bell className="h-5 w-5"/></div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500"><User className="h-5 w-5"/></div>
        </div>
      </header>
      <CycleRing />
      <div className="mt-8 rounded-3xl border-l-4 border-emerald-600 bg-emerald-600/10 p-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">طُهر</span>
          <ChevronRight className="h-4 w-4 opacity-30" />
        </div>
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">الصلاة واجبة اليوم.</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">وفق المذهب الحنفي</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <InfoCard title="الدورة القادمة" value="بعد 16 يوم" icon={CalendarDays} color="text-rose-500 bg-rose-50"/>
        <InfoCard title="نافذة الخصوبة" value="خلال يومين" icon={Heart} color="text-amber-600 bg-amber-50"/>
      </div>
      <div className="mt-6 rounded-[32px] border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">تسجيل اليوم</p><p className="mt-1 text-sm font-bold text-gray-800">أضيفي الأعراض أو النزف</p></div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-200"><Plus className="h-5 w-5"/></div>
        </div>
      </div>
    </div>
  );
}

function CycleRing() {
  const radius = 140;
  const outerStroke = 6;
  const innerStroke = 16;
  const cycleLength = 28;
  const currentDay = 12;
  const segments = [
    {label:'حيض', duration:6, color:'#BE123C'},
    {label:'طُهر', duration:3, color:'#0D9488'},
    {label:'خصوبة', duration:6, color:'#D97706'},
    {label:'طُهر', duration:9, color:'#0D9488'},
    {label:'قبل الدورة', duration:3, color:'#4F46E5'},
    {label:'متوقع', duration:1, color:'#FB7185', dashed:true},
  ];
  let accumulated=0, activeIndex=0, dayInPhase=0;
  for(let i=0;i<segments.length;i++){
    if(currentDay<=accumulated+segments[i].duration){activeIndex=i;dayInPhase=currentDay-accumulated;break;}
    accumulated += segments[i].duration;
  }
  const currentPhase=segments[activeIndex];
  const nextPhase=segments[(activeIndex+1)%segments.length];
  const startDay=segments.slice(0,activeIndex).reduce((n,s)=>n+s.duration,0);
  const outerR=radius-outerStroke/2;
  const outerC=outerR*2*Math.PI;
  const innerR=radius-outerStroke-12-innerStroke/2;
  const innerC=innerR*2*Math.PI;
  const phaseStartAngle=(startDay/cycleLength)*360-90;
  const ratio=Math.min(1,dayInPhase/currentPhase.duration);
  const arc=(currentPhase.duration/cycleLength)*innerC;
  const progress=ratio*arc;
  const angle=phaseStartAngle+(ratio*(currentPhase.duration/cycleLength)*360);
  let cumulative=0;

  return <div className="flex flex-col items-center space-y-10">
    <div className="relative flex items-center justify-center">
      <div className="absolute h-[300px] w-[300px] rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"/>
      <svg height={radius*2} width={radius*2} className="relative z-10 overflow-visible">
        <g transform={`rotate(-90 ${radius} ${radius})`}>
          {segments.map((s,idx)=>{
            const arcLength=(s.duration/cycleLength)*outerC;
            const offset=cumulative;cumulative+=arcLength;
            return <circle key={idx} stroke={s.color} fill="transparent" strokeWidth={outerStroke}
              strokeDasharray={s.dashed?'4,2':`${arcLength-2} ${outerC-(arcLength-2)}`}
              strokeDashoffset={-offset} r={outerR} cx={radius} cy={radius}
              className={idx===activeIndex?'opacity-100':'opacity-30'} />;
          })}
        </g>
        <circle stroke="#F5F5F5" fill="transparent" strokeWidth={innerStroke} r={innerR} cx={radius} cy={radius} transform={`rotate(-90 ${radius} ${radius})`}/>
        <motion.circle stroke={currentPhase.color} fill="transparent" strokeWidth={innerStroke} strokeLinecap="round"
          r={innerR} cx={radius} cy={radius} transform={`rotate(-90 ${radius} ${radius})`}
          strokeDashoffset={-(startDay/cycleLength)*innerC}
          initial={{strokeDasharray:`0 ${innerC}`}} animate={{strokeDasharray:`${progress} ${innerC}`}} transition={{duration:1,ease:'easeOut'}}/>
        <circle fill="white" stroke={currentPhase.color} strokeWidth={3} r={7}
          cx={radius+innerR*Math.cos(angle*Math.PI/180)} cy={radius+innerR*Math.sin(angle*Math.PI/180)} />
      </svg>
      <div className="absolute z-20 flex w-full flex-col items-center justify-center px-10 text-center">
        <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">{dayInPhase} يوم من {currentPhase.duration}</span>
        <span className="mb-2 font-serif text-[32px] font-bold leading-tight" style={{color:currentPhase.color}}>{currentPhase.label}</span>
        <div className="mb-3 h-px w-8 bg-gray-200"/>
        <span className="text-[11px] font-medium text-gray-400"><b className="text-gray-600">{nextPhase.label} خلال {Math.max(1,currentPhase.duration-dayInPhase+1)} أيام</b></span>
      </div>
    </div>
    <div className="w-full max-w-[320px] space-y-4">
      <div className="relative">
        <div className="absolute -top-5 z-10 flex -translate-x-1/2 flex-col items-center" style={{right:`${currentDay/cycleLength*100}%`}}>
          <span className="mb-0.5 whitespace-nowrap rounded border border-rose-100 bg-white px-1 text-[9px] font-black text-rose-500 shadow-sm">أنتِ هنا</span>
          <div className="h-0 w-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-rose-500"/>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-gray-100 shadow-inner">{segments.map((s,i)=><div key={i} style={{width:`${s.duration/cycleLength*100}%`,backgroundColor:s.color,opacity:i===activeIndex?1:.3}}/>)}</div>
      </div>
    </div>
  </div>;
}

function InfoCard({title,value,icon:Icon,color}:{title:string;value:string;icon:any;color:string}) {
  return <div className="rounded-[32px] border border-black/5 bg-white p-5 shadow-sm">
    <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-2xl ${color}`}><Icon className="h-4 w-4"/></div>
    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{title}</p>
    <p className="mt-1 text-sm font-bold text-gray-800">{value}</p>
  </div>;
}

function CalendarDemo() {
  const days=Array.from({length:35},(_,i)=>i+1);
  return <div className="min-h-[812px] bg-[#FDFCFB] pb-32">
    <header className="p-6 pt-12">
      <h1 className="font-serif text-3xl font-bold text-[#8E244D]">التقويم</h1>
      <p className="mt-2 text-sm text-gray-400">تابعي الدورة والتوقعات والخصوبة.</p>
    </header>
    <main className="px-6">
      <section className="rounded-[32px] border border-black/5 bg-white p-5 shadow-xl shadow-black/5">
        <div className="mb-5 flex items-center justify-between"><ChevronRight className="h-5 w-5 rotate-180 text-gray-300"/><b className="font-serif text-xl text-gray-800">أكتوبر 2026</b><ChevronRight className="h-5 w-5 text-gray-300"/></div>
        <div className="grid grid-cols-7 gap-2 text-center">{['س','ح','ن','ث','ر','خ','ج'].map(x=><span className="text-[9px] font-bold text-gray-300" key={x}>{x}</span>)}{days.map((d,i)=>{
          const day=d>31?d-31:d;
          const isHaid=[1,2,3,4,5,6].includes(day)&&d<=31;
          const fertile=[10,11,12,13,14,15].includes(day)&&d<=31;
          const expected=[29,30,31].includes(day)&&d<=31;
          return <div key={i} className="flex aspect-square items-center justify-center">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${isHaid?'bg-rose-700 text-white':fertile?'bg-amber-50 text-amber-700':expected?'border border-dashed border-rose-300 bg-rose-50 text-rose-500':'text-gray-500'}`}>{day}</span>
          </div>;
        })}</div>
      </section>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] font-bold text-gray-400">
        <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-700"/>حيض</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500"/>خصوبة</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full border border-dashed border-rose-400"/>متوقع</span>
      </div>
    </main>
  </div>;
}

function InsightsDemo() {
  const symptomData=[
    ['تقلصات',85,'#FF5C8D',Activity,'up'],['صداع',45,'#4FC3F7',Brain,'down'],['المزاج',65,'#9575CD',Heart,'stable'],['الطاقة',30,'#81C784',Zap,'up'],['النوم',55,'#FFD54F',Moon,'down']
  ] as const;
  return <div className="min-h-[812px] bg-[#FDFCFB] pb-32">
    <header className="space-y-2 p-6 pt-12"><h1 className="font-serif text-3xl font-bold text-[#8E244D]">التحليلات</h1><p className="text-sm text-gray-400">أنماط دورتك وأعراضك مع الوقت.</p></header>
    <main className="space-y-8 px-6">
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-1 rounded-[32px] border border-black/5 bg-white p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">متوسط الدورة</p><div><span className="font-serif text-2xl font-bold text-rose-600">28</span><span className="text-xs text-gray-400"> يوم</span></div></div>
        <div className="space-y-1 rounded-[32px] border border-black/5 bg-white p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">الانتظام</p><div><span className="font-serif text-2xl font-bold text-emerald-600">{DEMO.regularity}%</span></div></div>
      </section>
      <section className="space-y-7 rounded-[32px] border border-black/5 bg-white p-6 shadow-xl shadow-black/5">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-[#FF5C8D]"/><h3 className="text-sm font-bold text-gray-800">اتجاهات الأعراض</h3></div><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">آخر 3 أشهر</span></div>
        {symptomData.map(([name,value,color,Icon,trend],i)=><div className="space-y-2" key={name}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{backgroundColor:`${color}1A`,color}}><Icon className="h-4 w-4"/></div><span className="text-xs font-bold text-gray-700">{name}</span></div><div className="flex items-center gap-2"><span className="text-[10px] font-bold text-gray-400">{value}%</span>{trend==='up'?<ArrowUpRight className="h-3 w-3 text-rose-400"/>:trend==='down'?<ArrowDownRight className="h-3 w-3 text-emerald-400"/>:<Minus className="h-3 w-3 text-gray-300"/>}</div></div><div className="h-2 overflow-hidden rounded-full bg-gray-50"><motion.div initial={{width:0}} animate={{width:`${value}%`}} transition={{duration:1,delay:i*.1}} className="h-full rounded-full" style={{backgroundColor:color}}/></div></div>)}
      </section>
    </main>
  </div>;
}

function CommunityDemo() {
  const posts=[
    ['مريم أحمد','السلام عليكم يا أخوات، هل من نصيحة لتخفيف آلام الدورة الشهرية بطرق طبيعية؟','24','12'],
    ['أخت مجهولة','أشعر بضيق شديد خلال هذه الأيام من دورتي، هل هذا طبيعي؟','45','30']
  ];
  return <div className="min-h-[812px] bg-[#FDFCFB] pb-32">
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white px-6 pb-6 pt-12"><div className="mb-6 flex items-center justify-between"><h1 className="font-serif text-3xl font-bold text-rose-800">المجتمع</h1><div className="flex gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-400"><Search className="h-5 w-5"/></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-400"><Users className="h-5 w-5"/></div></div></div><p className="max-w-[280px] text-xs leading-relaxed text-gray-400">مساحة آمنة للأسئلة والتجارب بين النساء.</p></header>
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4 rounded-[32px] border border-black/5 bg-white p-4 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-200"><User className="h-5 w-5"/></div><span className="text-sm text-gray-400">اكتبي ما يدور في بالك...</span><div className="flex-1"/><div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-200"><Plus className="h-5 w-5"/></div></div>
      <div><div className="mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-rose-400"/><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">مواضيع رائجة</span></div><div className="flex gap-2 overflow-hidden">{['#فقه_الطهارة','#صحة_المرأة','#تكيس_المبايض'].map(t=><span className="whitespace-nowrap rounded-full border border-rose-100 bg-rose-50 px-3 py-2 text-[10px] font-bold text-rose-800" key={t}>{t}</span>)}</div></div>
      {posts.map(([name,text,likes,comments])=><div className="rounded-[32px] border border-black/5 bg-white p-5 shadow-sm" key={name}><div className="flex items-center justify-between"><b className="text-sm text-gray-800">{name}</b><span className="text-[9px] text-gray-300">منذ ساعتين</span></div><p className="mt-4 text-xs leading-7 text-gray-600">{text}</p><div className="mt-4 flex gap-5 border-t border-black/5 pt-3 text-[10px] font-bold text-gray-400"><span className="flex items-center gap-1"><Heart className="h-4 w-4 text-rose-400"/>{likes}</span><span className="flex items-center gap-1"><MessageSquare className="h-4 w-4"/>{comments}</span></div></div>)}
    </div>
  </div>;
}

function AIDemo() {
  return <div className="min-h-[812px] bg-emerald-50/40 pb-32">
    <header className="flex items-center justify-between border-b border-black/5 bg-white/80 px-6 pb-5 pt-12 backdrop-blur-xl"><div><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100"><Sparkles className="h-4 w-4 text-emerald-600"/></div><h1 className="font-serif text-2xl font-bold text-emerald-900">نسوة AI</h1></div><p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-emerald-700/40">مساعدتك الصحية والفقهية</p></div></header>
    <div className="px-5 py-6">
      <div className="mb-6 flex justify-end"><div className="max-w-[85%] rounded-[24px] rounded-br-none bg-emerald-600 p-4 text-sm leading-relaxed text-white shadow-sm">تأخرت دورتي يومين، هل هذا طبيعي؟</div></div>
      <div className="mb-6 flex justify-start"><div className="flex max-w-[88%] items-end gap-2"><div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100"><Sparkles className="h-4 w-4 text-emerald-600"/></div><div className="rounded-[24px] rounded-bl-none border border-black/5 bg-white p-4 text-sm leading-relaxed text-emerald-900 shadow-sm">قد يحدث تغير بسيط بين الدورات. وبحسب نمطك المسجل، التأخر يومين ما يزال ضمن التفاوت الذي ظهر عندك سابقاً.</div></div></div>
      <div className="mt-6 rounded-[24px] border border-emerald-100 bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-widest text-emerald-700/40">السياق المستخدم</p><p className="mt-2 text-xs font-bold text-emerald-900">المذهب الحنفي • اليوم 12 • غير حامل</p></div>
    </div>
    <div className="absolute bottom-[92px] left-5 right-5 flex items-center gap-3 rounded-[24px] border border-black/5 bg-white p-3 shadow-xl"><span className="flex-1 text-xs text-gray-300">اكتبي سؤالك...</span><div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white"><Send className="h-4 w-4"/></div></div>
  </div>;
}

function FiqhDemo() {
  return <div className="min-h-[812px] bg-[#FDFCFB] px-6 pb-32 pt-12">
    <h1 className="font-serif text-3xl font-bold text-[#8E244D]">الحالة الفقهية</h1>
    <p className="mt-2 text-sm text-gray-400">مرتبطة ببيانات الدورة والمذهب المختار.</p>
    <div className="mt-8 rounded-[32px] border-l-4 border-emerald-600 bg-emerald-600/10 p-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">طُهر</span>
      <p className="mt-3 text-lg font-bold text-gray-800">الصلاة واجبة</p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">وفق المذهب الحنفي</p>
    </div>
    <div className="mt-6 space-y-3">
      {[
        ['الصلاة','تجب الصلاة'],['الصيام','يجوز الصيام'],['الغُسل','لا يلزم حالياً']
      ].map(([a,b])=><div className="flex items-center justify-between rounded-[24px] border border-black/5 bg-white p-5 shadow-sm" key={a}><div><p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{a}</p><p className="mt-1 text-sm font-bold text-gray-800">{b}</p></div><span className="text-emerald-600">✓</span></div>)}
    </div>
  </div>;
}

function PregnancyDemo() {
  return <div className="min-h-[812px] bg-[#FDFCFB] px-6 pb-32 pt-12">
    <h1 className="font-serif text-3xl font-bold text-[#8E244D]">الحمل</h1>
    <p className="mt-2 text-sm text-gray-400">متابعة أسبوعية بواجهة نسوة نفسها.</p>
    <div className="mt-8 rounded-[40px] bg-rose-50 p-8 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400">الأسبوع الحالي</p>
      <p className="mt-3 font-serif text-6xl font-bold text-rose-700">18</p>
      <p className="mt-2 text-xs font-bold text-rose-900/50">من 40 أسبوعاً</p>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white"><motion.div initial={{width:0}} animate={{width:'45%'}} transition={{duration:1}} className="h-full rounded-full bg-rose-500"/></div>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-4"><InfoCard title="الثلث" value="الثاني" icon={Heart} color="text-rose-500 bg-rose-50"/><InfoCard title="المتبقي" value="22 أسبوع" icon={CalendarDays} color="text-purple-500 bg-purple-50"/></div>
    <div className="mt-6 rounded-[32px] border border-black/5 bg-white p-6 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">هذا الأسبوع</p><p className="mt-2 text-sm font-bold leading-7 text-gray-800">تطور الجنين • التغيرات الجسدية • نصائح ومواعيد مهمة</p></div>
  </div>;
}
