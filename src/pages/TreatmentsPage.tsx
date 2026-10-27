import { useState } from 'react';
import { PageId, TreatmentItem } from '../types';
import { TREATMENTS } from '../data/clinicData';
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import SmileCostEstimatorModal from '../components/SmileCostEstimatorModal';

interface TreatmentsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectTreatment: (treatment: TreatmentItem) => void;
  onPreselectTreatmentForBooking: (treatmentTitle: string) => void;
}

export default function TreatmentsPage({
  onNavigate,
  onSelectTreatment,
  onPreselectTreatmentForBooking,
}: TreatmentsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  const categories = ['All', 'Cosmetic', 'Restorative', 'Orthodontics', 'General', 'Pediatric'];

  const filteredTreatments = TREATMENTS.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleOpenDetails = (t: TreatmentItem) => {
    onSelectTreatment(t);
    onNavigate('treatment-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTreatment = (t: TreatmentItem) => {
    onPreselectTreatmentForBooking(t.title);
    onNavigate('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              Clinical Specialities & Procedures
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Advanced Dental Care Services
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every procedure is performed in private suites equipped with high-resolution digital imaging, computer-assisted anesthesia, and hospital-grade sterilization.
            </p>
          </div>

          <button
            onClick={() => setIsEstimatorOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors cursor-pointer self-start md:self-auto"
          >
            <Calculator className="w-4 h-4 text-teal-600" />
            <span>Interactive Fee Calculator</span>
          </button>
        </div>

        {/* Filter Controls (interactive buttons) & Search */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Functional Category Filter Segment */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search treatments or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm font-medium text-slate-600">
              No treatments found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-teal-700 font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTreatments.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 tracking-wider">
                      {t.category}
                    </span>
                    <span className="text-xs font-bold text-teal-800 font-heading bg-teal-50 px-2.5 py-1 rounded-md">
                      {t.priceStarting}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    {t.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {t.shortDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.sessions}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Core Advantages:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {t.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenDetails(t)}
                    className="text-xs font-semibold text-slate-800 hover:text-teal-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Full Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBookTreatment(t)}
                    className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reassurance strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 block text-sm">
                Transparent Fee Guarantee
              </span>
              <span>All treatment fees are discussed upfront before starting. No hidden diagnostic line items.</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            Have a question? Inquire directly
          </button>
        </div>
      </section>

      {/* Fee Estimator Modal */}
      <SmileCostEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSelectTreatmentForBooking={(title) => {
          onPreselectTreatmentForBooking(title);
          onNavigate('book-appointment');
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
}
