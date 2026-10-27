export type PageId =
  | 'home'
  | 'about'
  | 'treatments'
  | 'treatment-details'
  | 'gallery'
  | 'contact'
  | 'book-appointment';

export interface TreatmentItem {
  id: string;
  title: string;
  shortDesc: string;
  category: 'General' | 'Cosmetic' | 'Orthodontics' | 'Restorative' | 'Pediatric';
  duration: string;
  priceStarting: string;
  sessions: string;
  iconName: string;
  fullDesc: string;
  benefits: string[];
  procedureSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  technologyUsed: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  education: string;
  image?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  timeline: string;
  doctor: string;
  details: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  branch: string;
  message: string;
}

export interface BookingConfirmation extends AppointmentFormData {
  bookingId: string;
  createdAt: string;
}
