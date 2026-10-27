import { useState } from 'react';
import { PageId, TreatmentItem } from '../types';
import { TREATMENTS, TESTIMONIALS, BEFORE_AFTER_CASES, CLINIC_INFO, CLINIC_HIGHLIGHTS } from '../data/clinicData';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import SmileCostEstimatorModal from '../components/SmileCostEstimatorModal';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  MapPin,
  Clock,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectTreatment: (treatment: TreatmentItem) => void;
  onPreselectTreatmentForBooking: (treatmentTitle: string) => void;
}

export default function HomePage({
  onNavigate,
  onSelectTreatment,
  onPreselectTreatmentForBooking,
}: HomePageProps) {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  const featuredTreatments = TREATMENTS.slice(0, 6);

  const handleBookNow = () => {
    onNavigate('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTreatments = () => {
    onNavigate('treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTreatmentClick = (treatment: TreatmentItem) => {
    onSelectTreatment(treatment);
    onNavigate('treatment-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 md:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 lg:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span>Premier Dental Care · Beverly Hills, California</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight">
                A Healthier Smile Starts Here.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience gentle, microscope-guided precision dentistry in Beverly Hills & Santa Monica. From Swiss dental implants and Diamond Invisalign aligners to handcrafted porcelain veneers, we engineer smiles with absolute comfort and natural elegance.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 rounded-lg shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  type="button"
                  onClick={handleExploreTreatments}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all duration-200 cursor-pointer hover:border-slate-400"
                >
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-900 tabular-nums">4.9 / 5.0</span>
                  <span className="text-slate-500">(1,420+ Verified Reviews)</span>
                </div>
                <div className="hidden sm:inline text-slate-300">|</div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>100% Pain-Free Guarantee Protocol</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Media */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
                <img
                  src="/images/hero_lumina_clinic_1790676529245.jpg"
                  alt="Lumina Dental Studio modern treatment operatory in Beverly Hills, California"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Trust Note */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block font-heading">
                      Private Suite Atmosphere
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Noise-canceling headphones & ceiling Netflix cinema
                    </span>
                  </div>
                  <button
                    onClick={() => setIsEstimatorOpen(true)}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100"
                  >
                    <span>Fee Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REASSURANCE & PRACTICE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {CLINIC_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-400/20 text-teal-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Certified Diamond Apex Invisalign Provider & Swiss Straumann Center</span>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Learn our clinical hygiene standards</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TREATMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              Specialized Care
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Precision Dental Treatments
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              From preventative wellness to full mouth rehabilitation, each procedure is executed with microscopic precision and utmost patient comfort.
            </p>
          </div>
          <button
            onClick={handleExploreTreatments}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-teal-700 transition-colors py-2 cursor-pointer self-start md:self-auto"
          >
            <span>View All 8 Specialities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 hover:border-teal-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {treatment.category} · {treatment.sessions}
                  </span>
                  <span className="text-xs font-bold text-teal-700 font-heading bg-teal-50 px-2.5 py-1 rounded-md">
                    From {treatment.priceStarting}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {treatment.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {treatment.shortDesc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                    Key Highlights
                  </span>
                  <p className="text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{treatment.benefits[0]}</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleTreatmentClick(treatment)}
                  className="text-xs font-semibold text-slate-900 group-hover:text-teal-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Procedure Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onPreselectTreatmentForBooking(treatment.title);
                    handleBookNow();
                  }}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50/70 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Book Consult
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BEFORE / AFTER SMILE MAKEOVER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
            Clinical Evidence & Aesthetics
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            Real Transformations, Zero Artifice
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Inspect verified clinical before-and-after smile designs. Drag the slider to witness how sub-millimeter ceramic artistry restores facial balance.
          </p>
        </div>

        <BeforeAfterSlider item={BEFORE_AFTER_CASES[0]} />

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 hover:text-teal-900 underline underline-offset-4 cursor-pointer"
          >
            <span>Explore full smile gallery & clinic tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-10 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
                Patient Testimonials
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
                Trusted by Southern California Patients
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Read authentic feedback from patients across Beverly Hills, Santa Monica, Bel Air, and West Hollywood.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-heading text-teal-400 tabular-nums">4.9</span>
              <div className="text-xs text-slate-400">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>Google Verified Clinic</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2.5 py-1 rounded-md">
                      {t.treatment}
                    </span>
                    <span className="text-xs text-slate-400">{t.date}</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{t.name}</span>
                    <span className="text-slate-400">{t.location}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CONVERSION & APPOINTMENT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase">
                Personalized Consultation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Ready for a healthier, more confident smile?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Schedule your comprehensive digital examination with 3D intraoral scan and consult directly with our senior specialists at our Beverly Hills or Santa Monica studio.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Same-Day Emergency Slots Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>Dedicated Patient Parking on Bedford Dr & 4th St</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-teal-50 transition-colors shadow-lg cursor-pointer text-center font-heading active:scale-[0.98]"
              >
                Book Your Appointment Now
              </button>

              <button
                type="button"
                onClick={() => setIsEstimatorOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer text-center"
              >
                View Fee & Treatment Estimator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Estimator Modal */}
      <SmileCostEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSelectTreatmentForBooking={(title) => {
          onPreselectTreatmentForBooking(title);
          handleBookNow();
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
}
