import { ServiceDetail, TeamMember, TestimonialItem, FAQItem } from '../types';

const IMAGE_BASE = 'https://img1.wsimg.com/isteam/ip/ad53a9d5-6482-419b-b51e-987c2f4738db';

export const STUDIO_INFO = {
  name: 'Hair Brazil Extensions',
  tagline: 'Premium Hair Extensions, Wigs & Custom Hair Solutions',
  address: '1800 N Powerline Rd, #1-2 Mezzanine, Pompano Beach, FL 33069, USA',
  phone: '+1 (305) 300-1475',
  phoneHref: 'tel:+13053001475',
  whatsapp: 'https://wa.me/13053001475',
  email: '',
  hoursWeekday: 'By appointment',
  hoursSunday: 'By appointment',
  openBadge: 'Private services · By appointment',
  instagram: 'https://www.instagram.com/hairbrazilextensionspompano/',
  tiktok: '',
  youtube: '',
  facebook: '',
  maps: 'https://www.google.com/maps/search/?api=1&query=1800+N+Powerline+Rd+%231-2+Mezzanine+Pompano+Beach+FL+33069',
  logo: `${IMAGE_BASE}/6815829F-9B6F-4A26-B354-895A9B3BE9F4.png`,
};

export const WHATSAPP_MESSAGES = {
  consultation: 'Hi! I would like to schedule an appointment at Hair Brazil Extensions.',
  extensions: 'Hi! I would like more information about your human hair extensions.',
  wigs: 'Hi! I would like to learn more about your wigs.',
  systems: "Hi! I'm interested in your custom hair systems.",
  training: 'Hi! I would like more information about your professional training courses.',
};

const whatsappLink = (message: string) => `${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

export const SERVICES: ServiceDetail[] = [
  {
    id: 'hair-extensions', slug: 'hair-extensions', title: 'Human Hair Extensions',
    subtitle: 'Premium human-hair extensions selected and customized for a natural-looking result.', startingPrice: 'Ask for details', number: '(01)', tagline: 'Premium hair, personalized for you',
    heroImage: `${IMAGE_BASE}/IMG_4481.jpeg`,
    whyLoveTitle: 'Hair that feels personal',
    whyLoveDescription: 'Explore premium human-hair extensions with personalized guidance on texture, color, length and overall look.',
    approachTitle: 'A considered consultation',
    approachDescription: 'Every recommendation begins with your goals and the finish you want. Contact the team for current collection and appointment details.',
    treatments: [
      { name: 'Human Hair Extensions', price: 'Contact us', duration: 'By appointment', description: 'Premium extensions with personalized guidance.' },
      { name: 'Custom Hair Selection', price: 'Contact us', duration: 'By appointment', description: 'Find the texture, color and length that suit your look.' },
    ],
    benefits: [{ title: 'Natural-Looking Results', description: 'Solutions selected to blend beautifully with your own hair.' }, { title: 'Premium Quality', description: 'Explore quality human-hair options for a refined finish.' }, { title: 'Personal Guidance', description: 'Ask the team about the right solution for your needs.' }],
    galleryImages: [`${IMAGE_BASE}/IMG_4018.jpeg`, `${IMAGE_BASE}/IMG_0060.jpeg`, `${IMAGE_BASE}/ols/IMG_8968.jpeg`],
  },
  {
    id: 'wigs', slug: 'wigs', title: 'Premium Wigs',
    subtitle: 'Beautiful wigs designed around confidence, comfort and your personal style.', startingPrice: 'Ask for details', number: '(02)', tagline: 'Confidence in every detail',
    heroImage: `${IMAGE_BASE}/1BFCE4E8-A927-48FD-ADC8-EFF29222892B.png`,
    whyLoveTitle: 'A look that feels like you', whyLoveDescription: 'Discover premium wigs and personalized hair solutions with expert service and attention to natural-looking details.', approachTitle: 'Personalized hair solutions', approachDescription: 'Connect with Hair Brazil Extensions to explore the current selection and discuss the look you have in mind.',
    treatments: [{ name: 'Premium Wigs', price: 'Contact us', duration: 'By appointment', description: 'Explore premium wig options for your desired look.' }, { name: 'Personalized Consultation', price: 'Contact us', duration: 'By appointment', description: 'Discuss fit, style and the solution that feels right for you.' }],
    benefits: [{ title: 'Personal Expression', description: 'Find a style that supports your confidence and individuality.' }, { title: 'Expert Service', description: 'Receive thoughtful guidance throughout your selection.' }, { title: 'Natural Finish', description: 'Explore options designed for beautiful, natural-looking results.' }],
    galleryImages: [`${IMAGE_BASE}/ols/IMG_1749.jpeg`, `${IMAGE_BASE}/ols/IMG_5719.jpeg`, `${IMAGE_BASE}/IMG_4651.jpeg`],
  },
  {
    id: 'custom-hair-systems', slug: 'custom-hair-systems', title: 'Custom Hair Systems',
    subtitle: 'Personalized hair systems crafted to support a natural, confident appearance.', startingPrice: 'Ask for details', number: '(03)', tagline: 'Crafted around your needs', heroImage: `${IMAGE_BASE}/ols/IMG_1748.jpeg`,
    whyLoveTitle: 'A solution made for you', whyLoveDescription: 'Hair Brazil Extensions creates personalized hair solutions with expert craftsmanship and a focus on natural-looking results.', approachTitle: 'From consultation to customization', approachDescription: 'Share your goals with the team and ask about available custom hair-system options, materials and next steps.',
    treatments: [{ name: 'Custom Hair Systems', price: 'Contact us', duration: 'By appointment', description: 'Personalized systems designed around your needs.' }, { name: 'Hair Replacement Consultation', price: 'Contact us', duration: 'By appointment', description: 'Discuss your goals and receive tailored guidance.' }],
    benefits: [{ title: 'Customized Approach', description: 'A solution considered around your individual needs.' }, { title: 'Professional Craftsmanship', description: 'Quality materials and careful attention to detail.' }, { title: 'Confidence', description: 'Support for a look that feels natural and personal.' }],
    galleryImages: [`${IMAGE_BASE}/ols/IMG_2792.jpeg`, `${IMAGE_BASE}/ols/660CCF76-D5A7-40EB-AF32-4147BB97B818.jpeg`, `${IMAGE_BASE}/ols/IMG_5685.jpeg`],
  },
  {
    id: 'professional-training', slug: 'professional-training', title: 'Professional Hair Training',
    subtitle: 'Hands-on education in hair extensions, wigs and hair systems—from fabrication to application.', startingPrice: 'Ask for details', number: '(04)', tagline: 'Learn from professional experience', heroImage: `${IMAGE_BASE}/IMG_4134.jpeg`,
    whyLoveTitle: 'Build practical confidence', whyLoveDescription: 'Hair Brazil Extensions shares professional experience through hands-on training for beauty professionals.', approachTitle: 'Training that stays practical', approachDescription: 'Ask about current course details and available training pathways directly through WhatsApp.',
    treatments: [{ name: 'Professional Training', price: 'Contact us', duration: 'Ask for details', description: 'Hands-on education in extensions, wigs and hair systems.' }, { name: 'Training Inquiry', price: 'Contact us', duration: 'By appointment', description: 'Request current course information by WhatsApp.' }],
    benefits: [{ title: 'Hands-On Learning', description: 'Practical education from fabrication to application.' }, { title: 'Professional Experience', description: 'Learn from 48 years of professional experience.' }, { title: 'Career Development', description: 'Build skills for a rewarding profession in beauty.' }],
    galleryImages: [`${IMAGE_BASE}/ols/IMG_4699.jpeg`, `${IMAGE_BASE}/IMG_3620.jpeg`, `${IMAGE_BASE}/IMG_5707.jpeg`],
  },
];

export const PETAL_SERVICES = SERVICES.map((service) => ({ id: service.id, title: service.title, description: service.subtitle, price: service.startingPrice, link: `/services/${service.slug}` }));
export const TESTIMONIALS: TestimonialItem[] = [];
export const FAQS: FAQItem[] = [
  { question: 'Do I need an appointment?', answer: 'Yes. Private services are provided by appointment. Contact Hair Brazil Extensions through WhatsApp to request availability.' },
  { question: 'What services do you offer?', answer: 'Hair Brazil Extensions offers premium human hair extensions, wigs, custom hair systems and professional training.' },
  { question: 'How can I learn about current options and pricing?', answer: 'Contact the team directly for personalized recommendations, current availability and pricing.' },
  { question: 'Where are you located?', answer: '1800 N Powerline Rd, #1-2 Mezzanine, Pompano Beach, FL 33069, USA.' },
];
export const TEAM_MEMBERS: TeamMember[] = [];
export const getWhatsAppLink = (message: string) => whatsappLink(message);
