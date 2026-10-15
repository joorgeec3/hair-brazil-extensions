export interface TreatmentItem {
  name: string;
  price: string;
  description?: string;
  duration?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  startingPrice: string;
  heroImage: string;
  number: string;
  tagline: string;
  whyLoveTitle: string;
  whyLoveDescription: string;
  approachTitle: string;
  approachDescription: string;
  treatments: TreatmentItem[];
  benefits: {
    title: string;
    description: string;
  }[];
  galleryImages: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote?: string;
  text?: string;
  author?: string;
  tag?: string;
  number?: string;
  image?: string;
  isImageCard?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  previewImage?: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  treatment: string;
  experienceGoal: string;
  tellUsMore: string;
  date: string;
  time: string;
  message: string;
}
