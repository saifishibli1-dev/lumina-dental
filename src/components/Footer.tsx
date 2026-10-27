import { PageId } from '../types';
import { CLINIC_INFO, TREATMENTS } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-white tracking-tight">
              Lumina Dental Studio
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Boutique multi-speciality oral healthcare center in Beverly Hills & Santa Monica, California. Dedicated to biological preservation, computer-guided implantology, and anxiety-free smile aesthetics.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>ADA Member · California Dental Board Lic. #48921 · HIPAA & OSHA Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Explore Practice
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Philosophy & Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Treatments & Fees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smile Gallery & Clinic Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('book-appointment')}
                  className="text-teal-400 hover:text-teal-300 transition-colors cursor-pointer text-left font-medium inline-flex items-center gap-1"
                >
                  Book Appointment <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Treatments */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Specialized Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {TREATMENTS.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => handleNav('treatments')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* California Studio Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              California Studios
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Beverly Hills (Flagship)</span>
                  <span>{CLINIC_INFO.headquarters}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Santa Monica Studio</span>
                  <span>{CLINIC_INFO.branch}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phonePrimary.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors tabular-nums">
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition-colors">
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon–Fri 8:00 AM – 6:00 PM · Sat 9:00 AM – 3:00 PM (PST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Lumina Dental Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>California Dental Board Lic. #48921</span>
            <span aria-hidden="true">·</span>
            <span>ADA & AACD Member</span>
            <span aria-hidden="true">·</span>
            <span>HIPAA & OSHA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
