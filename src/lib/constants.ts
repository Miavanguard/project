export const CLINIC = {
  name: 'La Belleza Aesthetica Clinic',
  nameAr: 'عيادة لا بيليزا الجمالية',
  phone: '+971 52 101 0107',
  phoneRaw: '971521010107',
  phoneSecondary: '+971 55 744 6123',
  phoneSecondaryRaw: '971557446123',
  whatsapp: '971521010107',
  whatsappDefaultText:
    'Hello La Belleza Clinic, I would like to book a consultation.',
  email: 'concierge@labelleza.ae',
  address: '9th St, Nad Al Hammar Avenues, Dubai, United Arab Emirates',
  addressAr: 'شارع ٩، أفيينيوز ند الحمر، دبي، الإمارات العربية المتحدة',
  mapsUrl: 'https://maps.app.goo.gl/mrFSERnyGoWHEroDA',
  mohLicense: 'MOH Approval No: 2T98XWX-150926',
  hours: 'Sat–Thu: 10:00 AM – 8:00 PM | Fri: 2:00 PM – 8:00 PM',
  hoursAr: 'السبت–الخميس: ١٠ ص – ٨ م | الجمعة: ٢ م – ٨ م',
  instagram: 'https://www.instagram.com/labellezaclinic',
  tiktok: 'https://tiktok.com',
} as const;

/** Canonical WhatsApp deep-link used by CTAs and the floating widget. */
export function getWhatsAppUrl(text?: string): string {
  const msg = encodeURIComponent(text ?? CLINIC.whatsappDefaultText);
  return `https://wa.me/${CLINIC.whatsapp}?text=${msg}`;
}

export const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00',
];

export const SERVICES = [
  'Laser Hair Removal',
  'Facial Laser',
  'Russian Lips',
  'Botox / Fox Eyes',
  'Jawline Fillers',
  'Skin Boosters',
  'Deep Cleansing Facial',
  'Sculptra Collagen',
  'Barbie Face Package',
  'Hollywood Smile 6D',
  'Cosmetic Dentistry',
  'Dental Veneers',
  'General Consultation',
] as const;

export interface SpecialOffer {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  price: number;
  originalPrice?: number;
  /** When true, price displays as "From AED X" */
  fromPrice?: boolean;
  badgeEn: string;
  badgeAr: string;
  /** Drop in a custom photo URL — falls back to a luxury gradient placeholder */
  imageUrl?: string;
}

/**
 * Active Monthly Specials — update this array (or swap for Supabase fetch)
 * to refresh homepage promotions without touching UI components.
 */
export const OFFERS: SpecialOffer[] = [
  {
    id: 'barbie-face',
    titleEn: 'Barbie Face Offer',
    titleAr: 'عرض وجه باربي',
    descEn: 'Full face rejuvenation package for a sculpted, radiant, doll-like glow.',
    descAr: 'باقة تجديد كاملة للوجه لإطلالة منحوتة ومشرقة بتوهج ناعم.',
    price: 4999,
    badgeEn: 'Featured',
    badgeAr: 'مميز',
    imageUrl: '/treatment-injectables.webp',
  },
  {
    id: 'sculptra',
    titleEn: 'Sculptra Collagen Session',
    titleAr: 'جلسة سكلبترا للكولاجين',
    descEn: 'Stimulate natural collagen for firmer, youthful skin that lasts.',
    descAr: 'تحفيز الكولاجين الطبيعي لبشرة أكثر صلابة وشباباً تدوم طويلاً.',
    price: 2200,
    badgeEn: 'Collagen Boost',
    badgeAr: 'تعزيز الكولاجين',
    imageUrl: '/treatment-skin.webp',
  },
  {
    id: 'deep-facial',
    titleEn: 'Deep Cleansing Facial',
    titleAr: 'تنظيف عميق للبشرة',
    descEn: 'A luxurious deep-cleansing facial that purifies, exfoliates, and hydrates for an instant glow.',
    descAr: 'تنظيف عميق فاخر للبشرة ينقي ويقشر ويرطب للحصول على توهج فوري.',
    price: 333,
    badgeEn: 'Most Popular',
    badgeAr: 'الأكثر طلباً',
    imageUrl: '/treatment-skin.webp',
  },
  {
    id: 'laser-package',
    titleEn: 'Laser Hair Removal Package',
    titleAr: 'باقة إزالة الشعر بالليزر',
    descEn: 'Medical-grade laser hair removal packages tailored to your needs.',
    descAr: 'باقات إزالة شعر بالليزر بمستوى طبي مصممة حسب احتياجاتك.',
    price: 99,
    fromPrice: true,
    badgeEn: 'From',
    badgeAr: 'ابتداءً من',
    imageUrl: '/treatment-laser.webp',
  },
  {
    id: 'hollywood-smile',
    titleEn: 'Hollywood Smile 6D',
    titleAr: 'ابتسامة هوليوود ٦ دي',
    descEn: 'Premium 6D Hollywood smile makeover for brilliant, camera-ready teeth.',
    descAr: 'تجميل ابتسامة هوليوود ٦ دي لأسنان لامعة وجاهزة للتصوير.',
    price: 3999,
    badgeEn: 'Smile Makeover',
    badgeAr: 'تجميل الابتسامة',
    imageUrl: '/treatment-dental.webp',
  },
];

export interface Review {
  id: string;
  name: string;
  nameAr: string;
  textEn: string;
  textAr: string;
  rating: 5;
  source: 'Google';
}

export const REVIEWS: Review[] = [
  {
    id: 'latifa',
    name: 'Latifa Al Hammadi',
    nameAr: 'لطيفة الحمادي',
    textEn:
      'I recently did my veneers here, and the entire process was absolutely perfect. The staff were extremely professional, kind, and patient with every question I had. The dentist explained everything clearly, made me feel comfortable, and paid great attention to detail.',
    textAr:
      'أجريت قشور الأسنان هنا مؤخراً، وكانت التجربة مثالية بالكامل. كان الطاقم محترفاً ولطيفاً للغاية وصبوراً مع كل أسئلتي. شرحت الطبيبة كل شيء بوضوح وجعلتني أشعر بالراحة مع اهتمام كبير بالتفاصيل.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'bikhansha',
    name: 'Bikhansha T.',
    nameAr: 'بيخانشا ت.',
    textEn:
      "This is not just treatment, it's true artistry and highest level of professionalism. The results are incredible.",
    textAr:
      'هذا ليس علاجاً فحسب، بل فن حقيقي وأعلى مستويات الاحتراف. النتائج مذهلة.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'dina',
    name: 'Dina Azar',
    nameAr: 'دينا عازار',
    textEn:
      "I'm only on my second laser hair removal session, and the results are already amazing. The clinic is very clean and professional, and the staff are super friendly.",
    textAr:
      'أنا في جلستي الثانية فقط لإزالة الشعر بالليزر، والنتائج مذهلة بالفعل. العيادة نظيفة واحترافية جداً والطاقم ودود للغاية.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'hind',
    name: 'Hind Senan',
    nameAr: 'هند سنان',
    textEn:
      'I visited La Belleza Aesthetic Clinic for a facial treatment with specialist Saba Alhayali, and I was thoroughly impressed. I have sensitive skin, but after the treatment, my skin looked glowing, clean, and radiant.',
    textAr:
      'زرت عيادة لا بيليزا لعلاج وجه مع الأخصائية صبا الحيالي وانبهرت تماماً. بشرتي حساسة، لكن بعد العلاج بدت بشرتي مشرقة ونظيفة ومتوهجة.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'khadija',
    name: 'Khadija Jassem',
    nameAr: 'خديجة جاسم',
    textEn:
      "I'm so grateful to Dr. Sarah. I used to struggle with my teeth after braces, and she transformed my smile exactly the way I wanted. The result is beautiful!",
    textAr:
      'أنا ممتنة جداً للدكتورة سارة. كنت أعاني من أسناني بعد التقويم، وحولت ابتسامتي تماماً كما أردت. النتيجة رائعة!',
    rating: 5,
    source: 'Google',
  },
];

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  initials: string;
  /** Optional headshot path — drop files into /public/team/ */
  imageUrl?: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'clara',
    name: 'Dr. Clara Elbadry',
    nameAr: 'د. كلارا البدري',
    roleEn: 'Dermatology & Aesthetics',
    roleAr: 'الأمراض الجلدية والتجميل',
    initials: 'CE',
    imageUrl: '/team/clara.jpg',
  },
  {
    id: 'sarah',
    name: 'Dr. Sarah Al Ani',
    nameAr: 'د. سارة العاني',
    roleEn: 'Cosmetic Dentist',
    roleAr: 'طبيبة أسنان تجميلية',
    initials: 'SA',
    imageUrl: '/team/sarah.jpg',
  },
  {
    id: 'diyar',
    name: 'Dr. Diyar Malik',
    nameAr: 'د. ديار مالك',
    roleEn: 'Aesthetic & General Dentistry',
    roleAr: 'طب الأسنان التجميلي والعام',
    initials: 'DM',
    imageUrl: '/team/diyar.jpg',
  },
  {
    id: 'nahla',
    name: 'Dr. Nahla Sany',
    nameAr: 'د. نهلة ساني',
    roleEn: 'Cosmetic Dentist',
    roleAr: 'طبيبة أسنان تجميلية',
    initials: 'NS',
    imageUrl: '/team/nahla.jpg',
  },
  {
    id: 'saba',
    name: 'Saba Alhayali',
    nameAr: 'صبا الحيالي',
    roleEn: 'Facial Specialist & Beauty Therapist',
    roleAr: 'أخصائية وجه ومعالجة تجميل',
    initials: 'SH',
    imageUrl: '/team/saba.jpg',
  },
];

export interface BeforeAfterItem {
  id: string;
  titleEn: string;
  titleAr: string;
  beforeSrc: string;
  afterSrc: string;
}

/** Swap beforeSrc / afterSrc paths when custom clinical photos are ready */
export const BEFORE_AFTER: BeforeAfterItem[] = [
  {
    id: 'lip-filler',
    titleEn: 'Lip Filler',
    titleAr: 'فيلر الشفاه',
    beforeSrc: '/before-after-1.webp',
    afterSrc: '/after-after-1.webp',
  },
  {
    id: 'laser-resurfacing',
    titleEn: 'Laser Skin Resurfacing',
    titleAr: 'تجديد البشرة بالليزر',
    beforeSrc: '/treatment-laser.webp',
    afterSrc: '/treatment-skin.webp',
  },
  {
    id: 'profhilo',
    titleEn: 'Profhilo Hydration',
    titleAr: 'بروفييلو للترطيب',
    beforeSrc: '/treatment-skin.webp',
    afterSrc: '/after-after-1.webp',
  },
  {
    id: 'aesthetic-dentistry',
    titleEn: 'Aesthetic Dentistry',
    titleAr: 'طب الأسنان التجميلي',
    beforeSrc: '/treatment-dental.webp',
    afterSrc: '/after-after-1.webp',
  },
  {
    id: 'facial-glow',
    titleEn: 'Facial Glow',
    titleAr: 'توهج الوجه',
    beforeSrc: '/before-after-1.webp',
    afterSrc: '/treatment-injectables.webp',
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  captionEn: string;
  captionAr: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: 'lobby',
    src: '/hero-clinic.webp',
    captionEn: 'Reception Lounge',
    captionAr: 'صالة الاستقبال',
  },
  {
    id: 'laser-suite',
    src: '/treatment-laser.webp',
    captionEn: 'Laser Suite',
    captionAr: 'جناح الليزر',
  },
  {
    id: 'injectables',
    src: '/treatment-injectables.webp',
    captionEn: 'Injectables Suite',
    captionAr: 'جناح الحقن',
  },
  {
    id: 'skin-room',
    src: '/treatment-skin.webp',
    captionEn: 'Skin Therapy Room',
    captionAr: 'غرفة علاجات البشرة',
  },
  {
    id: 'dental',
    src: '/treatment-dental.webp',
    captionEn: 'Dental Studio',
    captionAr: 'استوديو الأسنان',
  },
  {
    id: 'results',
    src: '/after-after-1.webp',
    captionEn: 'Client Results',
    captionAr: 'نتائج العملاء',
  },
  {
    id: 'ambiance',
    src: '/bg-texture.webp',
    captionEn: 'Clinic Ambiance',
    captionAr: 'أجواء العيادة',
  },
  {
    id: 'before-after',
    src: '/before-after-1.webp',
    captionEn: 'Transformation Journey',
    captionAr: 'رحلة التحوّل',
  },
];
