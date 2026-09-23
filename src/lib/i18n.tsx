import { createContext, useContext } from 'react';

export type Lang = 'en' | 'ar';

export interface Translations {
  nav: {
    home: string;
    treatments: string;
    offers: string;
    team: string;
    reviews: string;
    contact: string;
    admin: string;
    book: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    bookCta: string;
    offersCta: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  treatments: {
    label: string;
    title: string;
    subtitle: string;
    cat1: string;
    cat1Desc: string;
    cat2: string;
    cat2Desc: string;
    cat3: string;
    cat3Desc: string;
    cat4: string;
    cat4Desc: string;
    learnMore: string;
    beforeAfter: string;
    before: string;
    after: string;
    disclaimer: string;
  };
  offers: {
    label: string;
    title: string;
    subtitle: string;
    aed: string;
    claim: string;
    save: string;
    from: string;
    whatsappCta: string;
  };
  team: {
    label: string;
    title: string;
    subtitle: string;
  };
  reviews: {
    label: string;
    title: string;
    subtitle: string;
    googleReview: string;
  };
  booking: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    selectService: string;
    date: string;
    time: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    successMsg: string;
    whatsapp: string;
    close: string;
    another: string;
    slotTaken: string;
    noSlots: string;
    error: string;
    chooseDate: string;
  };
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    contact: string;
    hours: string;
    follow: string;
    rights: string;
    phone: string;
    email: string;
    address: string;
    openMaps: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    signOut: string;
    dashboard: string;
    appointments: string;
    leads: string;
    noData: string;
    status: string;
    updateStatus: string;
    back: string;
    loginError: string;
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    notes: string;
    message: string;
    submitted: string;
    welcome: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: 'Home',
      treatments: 'Treatments',
      offers: 'Offers',
      team: 'Our Team',
      reviews: 'Reviews',
      contact: 'Contact',
      admin: 'Admin',
      book: 'Book Consultation',
    },
    hero: {
      badge: 'Dubai’s Premier Luxury Aesthetic Clinic',
      title1: 'Where Beauty',
      title2: 'Meets Artistry',
      subtitle:
        'Experience the pinnacle of aesthetic care — advanced laser treatments, master injectables, skin boosters, and cosmetic dentistry, delivered in an atmosphere of uncompromising luxury.',
      bookCta: 'Book Consultation',
      offersCta: 'View Special Offers',
      stat1: '15+',
      stat1Label: 'Years of Excellence',
      stat2: '12K+',
      stat2Label: 'Happy Clients',
      stat3: '30+',
      stat3Label: 'Premium Treatments',
    },
    treatments: {
      label: 'Our Services',
      title: 'Signature Treatments',
      subtitle:
        'Each treatment is a curated experience, performed by internationally trained specialists using the latest medical-grade technology.',
      cat1: 'Laser Hair Removal & Facial Lasers',
      cat1Desc:
        'Painless, permanent hair reduction and skin-rejuvenating laser facials tailored to your skin tone.',
      cat2: 'Injectables & Fillers',
      cat2Desc:
        'Russian Lips, Botox / Fox Eyes, and Jawline Fillers — subtle, natural-looking enhancements by master practitioners.',
      cat3: 'Skin Boosters & Deep Cleansing Facials',
      cat3Desc:
        'Deep hydration and radiance-boosting protocols that restore your skin’s natural luminosity.',
      cat4: 'Cosmetic Dentistry & Dental Veneers',
      cat4Desc:
        'Hollywood-grade veneers and smile makeovers crafted to perfect proportions and natural whiteness.',
      learnMore: 'Learn More',
      beforeAfter: 'Before & After',
      before: 'Before',
      after: 'After',
      disclaimer:
        'Individual results may vary — subject to in-clinic consultation. Before/after imagery shown for illustrative purposes.',
    },
    offers: {
      label: 'This Month Only',
      title: 'Active Monthly Specials',
      subtitle:
        'Exclusive Instagram offers curated for this month — claim yours before they expire.',
      aed: 'AED',
      claim: 'Claim Offer',
      save: 'Save',
      from: 'From',
      whatsappCta: 'Ask about this offer on WhatsApp',
    },
    team: {
      label: 'Medical & Aesthetic Team',
      title: 'Our Specialists',
      subtitle:
        'Meet the verified doctors and beauty specialists behind every La Belleza transformation.',
    },
    reviews: {
      label: 'Client Love',
      title: 'Google Reviews',
      subtitle:
        'Authentic five-star experiences from clients who trusted us with their beauty journey.',
      googleReview: '5-star Google Review',
    },
    booking: {
      title: 'Book Your Consultation',
      subtitle: 'Reserve your private appointment with our specialist team.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      service: 'Preferred Service',
      selectService: 'Select a service',
      date: 'Preferred Date',
      time: 'Preferred Time',
      notes: 'Additional Notes',
      notesPlaceholder: 'Tell us about your goals or any questions...',
      submit: 'Confirm Booking',
      submitting: 'Submitting...',
      success: 'Booking Confirmed!',
      successMsg: 'We’ve received your request. Our team will contact you shortly to confirm.',
      whatsapp: 'Continue on WhatsApp',
      close: 'Close',
      another: 'Book Another',
      slotTaken: 'This slot was just booked. Please choose another time.',
      noSlots: 'All slots for this date are fully booked.',
      error: 'Something went wrong. Please try again or call us directly.',
      chooseDate: 'Please choose a date first',
    },
    footer: {
      about: 'About La Belleza',
      aboutText:
        'Dubai’s destination for luxury aesthetic care. Where medical precision meets artistic vision, in an atmosphere of pure indulgence.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      hours: 'Operating Hours',
      follow: 'Follow Us',
      rights: 'All rights reserved.',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      openMaps: 'Open in Google Maps',
    },
    admin: {
      loginTitle: 'Admin Sign In',
      loginSubtitle: 'Access the clinic management dashboard',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      signOut: 'Sign Out',
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      leads: 'Leads',
      noData: 'No records yet.',
      status: 'Status',
      updateStatus: 'Update status',
      back: 'Back to site',
      loginError: 'Invalid credentials. Please try again.',
      name: 'Name',
      phone: 'Phone',
      service: 'Service',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      message: 'Message',
      submitted: 'Submitted',
      welcome: 'Welcome back',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      treatments: 'العلاجات',
      offers: 'العروض',
      team: 'فريقنا',
      reviews: 'التقييمات',
      contact: 'تواصل',
      admin: 'الإدارة',
      book: 'احجز استشارة',
    },
    hero: {
      badge: 'عيادة التجميل الفاخرة الأولى في دبي',
      title1: 'حيث الجمال',
      title2: 'يلتقي بالإبداع',
      subtitle:
        'اختبر قمة الرعاية الجمالية — علاجات الليزر المتقدمة، حقن احترافية، معززات البشرة، وطب الأسنان التجميلي، في أجواء فاخرة لا تقبل المساومة.',
      bookCta: 'احجز استشارة',
      offersCta: 'عرض العروض الخاصة',
      stat1: '+١٥',
      stat1Label: 'سنوات من التميز',
      stat2: '+١٢ ألف',
      stat2Label: 'عميل سعيد',
      stat3: '+٣٠',
      stat3Label: 'علاج فاخر',
    },
    treatments: {
      label: 'خدماتنا',
      title: 'العلاجات المميزة',
      subtitle:
        'كل علاج هو تجربة منسقة بعناية، يؤديها أخصائيون مدربون دولياً باستخدام أحدث التقنيات الطبية.',
      cat1: 'إزالة الشعر بالليزر وليزر الوجه',
      cat1Desc:
        'إزالة دائمة وغير مؤلمة للشعر وعلاجات ليزر للوجه تناسب لون بشرتك.',
      cat2: 'الحقن والفيلر',
      cat2Desc:
        'الشفاه الروسية، البوتوكس / عيون الثعلب، وفيلر خط الفك — تحسينات طبيعية بمظهر طبيعي.',
      cat3: 'معززات البشرة وتنظيف العميق',
      cat3Desc:
        'بروتوكولات ترطيب عميق وإشراق تعيد لبشرتك لمعانها الطبيعي.',
      cat4: 'طب الأسنان التجميلي وقشور الأسنان',
      cat4Desc:
        'قشور بمستوى هوليوود وتصميم ابتسامة بإتقان متناسب وبياض طبيعي.',
      learnMore: 'اعرف المزيد',
      beforeAfter: 'قبل وبعد',
      before: 'قبل',
      after: 'بعد',
      disclaimer:
        'النتائج الفردية قد تختلف — تخضع لاستشارة داخل العيادة. صور قبل/بعد لأغراض توضيحية فقط.',
    },
    offers: {
      label: 'هذا الشهر فقط',
      title: 'العروض الشهرية النشطة',
      subtitle:
        'عروض حصرية من إنستغرام لهذا الشهر — احجزي عرضك قبل انتهائه.',
      aed: 'درهم',
      claim: 'احصل على العرض',
      save: 'وفّر',
      from: 'ابتداءً من',
      whatsappCta: 'اسألي عن هذا العرض عبر واتساب',
    },
    team: {
      label: 'الفريق الطبي والتجميلي',
      title: 'أخصائيونا',
      subtitle:
        'تعرّفي على الأطباء والمتخصصين المعتمدين خلف كل تحوّل في لا بيليزا.',
    },
    reviews: {
      label: 'حب العملاء',
      title: 'تقييمات جوجل',
      subtitle:
        'تجارب حقيقية بخمس نجوم من عملاء وثقوا بنا في رحلتهم الجمالية.',
      googleReview: 'تقييم جوجل ★٥',
    },
    booking: {
      title: 'احجز استشارتك',
      subtitle: 'احجز موعدك الخاص مع فريق الأخصائيين لدينا.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      service: 'الخدمة المفضلة',
      selectService: 'اختر خدمة',
      date: 'التاريخ المفضل',
      time: 'الوقت المفضل',
      notes: 'ملاحظات إضافية',
      notesPlaceholder: 'أخبرنا عن أهدافك أو أي أسئلة...',
      submit: 'تأكيد الحجز',
      submitting: 'جارٍ الإرسال...',
      success: 'تم تأكيد الحجز!',
      successMsg: 'لقد استلمنا طلبك. سيتواصل معك فريقنا قريباً للتأكيد.',
      whatsapp: 'تابع عبر واتساب',
      close: 'إغلاق',
      another: 'احجز آخر',
      slotTaken: 'تم حجز هذا الموعد للتو. يرجى اختيار وقت آخر.',
      noSlots: 'جميع المواعيد لهذا التاريخ محجوزة بالكامل.',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
      chooseDate: 'يرجى اختيار تاريخ أولاً',
    },
    footer: {
      about: 'عن لا بيليزا',
      aboutText:
        'وجهتك في دبي للرعاية الجمالية الفاخرة. حيث الدقة الطبية تلتقي بالرؤية الفنية في أجواء من الترف الخالص.',
      quickLinks: 'روابط سريعة',
      contact: 'تواصل',
      hours: 'ساعات العمل',
      follow: 'تابعنا',
      rights: 'جميع الحقوق محفوظة.',
      phone: 'هاتف',
      email: 'بريد إلكتروني',
      address: 'عنوان',
      openMaps: 'افتح في خرائط جوجل',
    },
    admin: {
      loginTitle: 'تسجيل دخول الإدارة',
      loginSubtitle: 'الوصول إلى لوحة إدارة العيادة',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      signingIn: 'جارٍ تسجيل الدخول...',
      signOut: 'تسجيل الخروج',
      dashboard: 'لوحة التحكم',
      appointments: 'المواعيد',
      leads: 'العملاء المحتملون',
      noData: 'لا توجد سجلات بعد.',
      status: 'الحالة',
      updateStatus: 'تحديث الحالة',
      back: 'العودة للموقع',
      loginError: 'بيانات غير صحيحة. يرجى المحاولة مرة أخرى.',
      name: 'الاسم',
      phone: 'الهاتف',
      service: 'الخدمة',
      date: 'التاريخ',
      time: 'الوقت',
      notes: 'ملاحظات',
      message: 'رسالة',
      submitted: 'أُرسلت',
      welcome: 'مرحباً بعودتك',
    },
  },
};

export interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
