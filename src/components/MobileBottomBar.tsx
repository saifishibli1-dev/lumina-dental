import { PageId } from '../types';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MobileBottomBarProps {
  onNavigate: (page: PageId) => void;
}

export default function MobileBottomBar({ onNavigate }: MobileBottomBarProps) {
  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Lumina Dental Studio, I would like to inquire about booking an appointment.'
  )}`;

  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto h-11">
        <a
          href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-full rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-slate-700" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 h-full rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => {
            onNavigate('book-appointment');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[1.4] flex items-center justify-center gap-1.5 h-full rounded-lg bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-colors active:scale-95 cursor-pointer whitespace-nowrap px-2"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>
      </div>
    </aside>
  );
}
