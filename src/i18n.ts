export type Lang = 'ar' | 'en';

type Dict = Record<string, { ar: string; en: string }>;

export const copy: Dict = {
  'meta.title': {
    ar: 'نسوة | رفيقتكِ للدورة والعبادة',
    en: 'Niswah | Your cycle and worship companion',
  },
  'nav.features': { ar: 'المزايا', en: 'Features' },
  'nav.tour': { ar: 'جولة في التطبيق', en: 'App tour' },
  'nav.privacy': { ar: 'الخصوصية', en: 'Privacy' },
  'nav.download': { ar: 'حمّلي التطبيق', en: 'Get the app' },
  'nav.lang': { ar: 'English', en: 'العربية' },

  'hero.eyebrow': { ar: 'رفيقة المرأة المسلمة', en: 'Made for Muslim women' },
  'hero.title': {
    ar: 'دورتكِ وعبادتكِ،<br><em>في طمأنينة.</em>',
    en: 'Your cycle and your worship,<br><em>understood.</em>',
  },
  'hero.body': {
    ar: 'نسوة تتابع معكِ دورتكِ يومًا بيوم، وتبيّن لكِ أحكام الحيض والطهارة والصلاة حسب مذهبكِ، مع رؤى هادئة تساعدكِ على فهم جسدكِ، وبخصوصية تامة.',
    en: 'Niswah is your private companion: cycle tracking that understands haid and tahara, a prayer status that follows your madhhab, and calm insights that help you understand your body.',
  },
  'hero.stat1': { ar: 'بالعربية والإنجليزية', en: 'Two languages' },
  'hero.stat2': { ar: 'التقويم الهجري والميلادي', en: 'Hijri and Gregorian' },
  'hero.stat3': { ar: 'خصوصيتكِ أولاً', en: 'Private by design' },
  'hero.hint': {
    ar: 'اضغطي على بطاقة «كيف نفسيتكِ اليوم؟» في الشاشة الوسطى',
    en: 'Tap "How is your mood today?" on the middle phone',
  },

  'store.apple.small': { ar: 'متوفّر على', en: 'Download on the' },
  'store.google.small': { ar: 'متوفّر على', en: 'Get it on' },

  'features.eyebrow': { ar: 'كل ما تحتاجينه', en: 'Everything in one place' },
  'features.title': { ar: 'صحتكِ وفقهكِ في تطبيق واحد', en: 'Your health and fiqh, together' },
  'features.body': {
    ar: 'من تسجيل اليوم إلى معرفة ما يجب عليكِ من صلاة، تجمع نسوة ما كنتِ تبحثين عنه في أماكن متفرقة.',
    en: 'From logging your day to knowing which prayers apply to you, Niswah brings together what used to live in scattered places.',
  },
  'f1.t': { ar: 'تتبع الدورة', en: 'Cycle tracking' },
  'f1.d': {
    ar: 'سجّلي شدة التدفق ولون الدم والمزاج والطاقة، واعرفي موعد دورتكِ القادمة.',
    en: 'Log flow, colour, mood and energy, and see when your next period is due.',
  },
  'f2.t': { ar: 'تخطيط للحمل', en: 'Pregnancy planning' },
  'f2.d': {
    ar: 'اعرفي موعد الإباضة المتوقع وخطّطي بتوقعات مبنية على دوراتكِ أنتِ.',
    en: 'See your expected ovulation and plan with predictions built from your own cycles.',
  },
  'f3.t': { ar: 'تتبع الحمل', en: 'Pregnancy tracking' },
  'f3.d': {
    ar: 'وضع خاص بالحمل مع لوحة متابعة وتقرير خاص به.',
    en: 'A dedicated pregnancy mode with its own dashboard and report.',
  },
  'f4.t': { ar: 'طبيبة ذكية', en: 'Smart doctor' },
  'f4.d': {
    ar: 'اسألي عن أعراضكِ واحصلي على اقتراحات مبنية على بياناتكِ.',
    en: 'Ask about your symptoms and get suggestions based on your own data.',
  },
  'f5.t': { ar: 'مجتمع نسائي', en: "Women's community" },
  'f5.d': {
    ar: 'شاركي سؤالاً أو تجربة دون كشف هويتكِ، مع رسائل خاصة.',
    en: 'Share a question or experience without revealing who you are, with private messages.',
  },
  'f6.t': { ar: 'تقارير PDF', en: 'PDF reports' },
  'f6.d': {
    ar: 'تقارير جاهزة لطبيبتكِ أو لزوجكِ، تشاركينها متى شئتِ.',
    en: 'Ready-made reports for your doctor or husband, shared only when you choose.',
  },
  'f7.t': { ar: 'تفسير الأحلام', en: 'Dream interpretation' },
  'f7.d': {
    ar: 'اكتبي حلمكِ واحصلي على تفسير له داخل التطبيق.',
    en: 'Describe a dream and get an interpretation right in the app.',
  },
  'f8.t': { ar: 'رؤى يومية', en: 'Daily insights' },
  'f8.d': {
    ar: 'رؤى لطيفة كل يوم بحسب مرحلتكِ من الدورة وما سجّلتِه.',
    en: 'Gentle guidance each day, based on your cycle phase and what you have logged.',
  },

  'tour.eyebrow': { ar: 'من داخل التطبيق', en: 'Inside the app' },
  'tour.title': { ar: 'شاشات حقيقية من نسوة', en: 'Real screens from Niswah' },

  's1.k': { ar: 'اليوم', en: 'Today' },
  's1.t': { ar: 'يومكِ في نظرة واحدة', en: 'Your day at a glance' },
  's1.d': {
    ar: 'دائرة الدورة تُظهر أين أنتِ الآن، مع زر واحد لتسجيل الدورة. اضغطي على «كيف نفسيتكِ اليوم؟» لتسجيل المزاج والطاقة والنوم.',
    en: 'The cycle ring shows where you are today, with one tap to log your cycle. Tap "How is your mood today?" to log mood, energy and sleep.',
  },
  's2.k': { ar: 'التسجيل', en: 'Daily log' },
  's2.t': { ar: 'تسجيل لطيف وسريع', en: 'Gentle, quick logging' },
  's2.d': {
    ar: 'اختاري شدة التدفق ولون الدم ومزاجكِ وطاقتكِ، ثم احفظي السجل.',
    en: 'Pick flow intensity, colour, mood and energy, then save the entry.',
  },
  's3.k': { ar: 'الفقه والصلاة', en: 'Fiqh and prayer' },
  's3.t': { ar: 'اعرفي ما عليكِ من عبادة', en: 'Know what applies to you' },
  's3.d': {
    ar: 'حالتكِ الفقهية مبنية على مذهبكِ، ومواقيت الصلاة تتغيّر بحسبها. ووضع الاستحاضة لتتبّع النزيف غير المنتظم.',
    en: 'Your status follows your madhhab and your prayer times adapt to it, with an istihadah mode for irregular bleeding.',
  },
  's4.k': { ar: 'التقويم', en: 'Calendar' },
  's4.t': { ar: 'هجري أو ميلادي، كما تحبين', en: 'Hijri or Gregorian, your choice' },
  's4.d': {
    ar: 'أيام الحيض والحيض المتوقع والطهارة واضحة في عرض شهري أو سنوي أو لفترة مخصصة.',
    en: 'Haid, expected haid and tahara laid out monthly, yearly or for a custom period.',
  },
  's5.k': { ar: 'الرؤى', en: 'Insights' },
  's5.t': { ar: 'توقعات مبنية على نمطكِ', en: 'Predictions from your pattern' },
  's5.d': {
    ar: 'بعد تسجيل دورتين تعرفين موعد الدورة القادمة والإباضة، وتتابعين اتجاهات الأعراض.',
    en: 'After two logged cycles you see your next period and ovulation window, and follow symptom trends.',
  },
  's6.k': { ar: 'الملف الشخصي', en: 'Profile' },
  's6.t': { ar: 'مصمم حول حياتكِ', en: 'Shaped around your life' },
  's6.d': {
    ar: 'اختاري مدينتكِ لمواقيت الصلاة، وفعّلي أدوات الزواج والحمل عندما تحتاجينها.',
    en: 'Choose your city for prayer times, and switch on marriage and pregnancy tools when you need them.',
  },

  'mood.eyebrow': { ar: 'متابعة الحالة النفسية', en: 'Mental state check-in' },
  'mood.title': { ar: 'كيف نفسيتكِ اليوم؟', en: 'How is your mood today?' },
  'mood.body': {
    ar: 'من بطاقة واحدة في شاشة اليوم، سجّلي مزاجكِ وطاقتكِ ونومكِ في ثوانٍ، بشكل مستقل عن بيانات الدورة والدم، لتفهمي نمطكِ بهدوء.',
    en: 'From one card on the Today screen, log your mood, energy and sleep in seconds, separately from your cycle data, and get to know your pattern.',
  },
  'mood.step1': { ar: 'اضغطي «تسجيل» على بطاقة «كيف نفسيتكِ اليوم؟»', en: 'Tap "Log" on the "How is your mood today?" card' },
  'mood.step2': { ar: 'اختاري من ١ إلى ٥ ثم احفظي الحالة', en: 'Pick 1 to 5 for each, then save' },
  'mood.c1': { ar: 'المزاج', en: 'Mood' },
  'mood.c2': { ar: 'الطاقة', en: 'Energy' },
  'mood.c3': { ar: 'النوم', en: 'Sleep' },

  'privacy.title': { ar: 'بياناتكِ لكِ وحدكِ', en: 'Your data stays yours' },
  'privacy.body': {
    ar: 'يمكنكِ استخدام نسوة كضيفة، والمشاركة في المجتمع دون كشف هويتكِ. والتقارير لا تخرج من التطبيق إلا عندما تشاركينها أنتِ.',
    en: 'Use Niswah as a guest and post in the community without revealing who you are. Reports leave the app only when you choose to share them.',
  },
  'privacy.p1': { ar: 'استخدام كضيفة', en: 'Guest mode' },
  'privacy.p2': { ar: 'مجتمع مجهول الهوية', en: 'Anonymous community' },
  'privacy.p3': { ar: 'تقارير تشاركينها بنفسكِ', en: 'Reports you choose to share' },

  'cta.title': { ar: 'ابدئي مع نسوة اليوم', en: 'Start with Niswah today' },
  'cta.body': {
    ar: 'متوفر على iPhone وAndroid، بالعربية والإنجليزية.',
    en: 'Available for iPhone and Android, in Arabic and English.',
  },
  'footer.note': {
    ar: 'نسوة للتوعية والتنظيم، وليست بديلاً عن الطبيبة أو أهل العلم.',
    en: 'Niswah is for awareness and organisation, not a replacement for a doctor or scholar.',
  },
};

/** Real screenshots from the app's golden tests. Some screens only exist in Arabic. */
export const screens: Record<string, { ar: string; en: string }> = {
  dashboard: { ar: 'screens/dashboard_ar.webp', en: 'screens/dashboard_en.webp' },
  calendar: { ar: 'screens/calendar_ar.webp', en: 'screens/calendar_en.webp' },
  insights: { ar: 'screens/insights_ar.webp', en: 'screens/insights_en.webp' },
  profile: { ar: 'screens/profile_ar.webp', en: 'screens/profile_en.webp' },
  log: { ar: 'screens/cycle_log_sheet_ar.webp', en: 'screens/cycle_log_sheet_en.webp' },
  mood: { ar: 'screens/mood_ar.webp', en: 'screens/mood_en.webp' },
  moodCard: { ar: 'screens/mood_card_ar.webp', en: 'screens/mood_card_en.webp' },
  prayer: { ar: 'screens/today_lower_ar.webp', en: 'screens/today_lower_en.webp' },
};

export function applyLang(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = copy['meta.title'][lang];

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const entry = copy[el.dataset.i18n!];
    if (entry) el.innerHTML = entry[lang];
  });
  document.querySelectorAll<HTMLImageElement>('img[data-screen]').forEach((img) => {
    const entry = screens[img.dataset.screen!];
    if (entry) img.src = entry[lang];
  });
  try {
    localStorage.setItem('niswah-lang', lang);
  } catch {
    /* storage unavailable */
  }
}

export function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  try {
    const saved = localStorage.getItem('niswah-lang');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}
