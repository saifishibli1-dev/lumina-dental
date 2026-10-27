import { useState } from 'react';
import { PageId, TreatmentItem } from '../types';
import { TREATMENTS } from '../data/clinicData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Cpu,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface TreatmentDetailPageProps {
  treatment: TreatmentItem;
  onNavigate: (page: PageId) => void;
  onSelectTreatment: (treatment: TreatmentItem) => void;
  onPreselectTreatmentForBooking: (treatmentTitle: string) => void;
}

export default function TreatmentDetailPage({
  treatment,
  onNavigate,
  onSelectTreatment,
  onPreselectTreatmentForBooking,
}: TreatmentDetailPageProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleBookThis = () => {
    onPreselectTreatmentForBooking(treatment.title);
    onNavigate('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Back button & Breadcrumb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
          <button
            onClick={() => onNavigate('treatments')}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Treatments</span>
          </button>
          <span>/</span>
          <span>{treatment.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{treatment.title}</span>
        </div>

        {/* Hero Title & Metadata */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <span>{treatment.category} Speciality</span>
              <span aria-hidden="true">·</span>
              <span>Lumina Clinical Protocol</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {treatment.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {treatment.fullDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-xs text-slate-500 block">Starting Investment</span>
                <span className="font-heading text-xl font-bold text-teal-900 tabular-nums">
                  {treatment.priceStarting}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-xs text-slate-500 block">Typical Duration</span>
                <span className="font-heading text-xl font-bold text-slate-900">
                  {treatment.duration}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 block">Required Visits</span>
                <span className="font-heading text-xl font-bold text-slate-900">
                  {treatment.sessions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Clinical Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Clinical Benefits */}
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Key Patient Advantages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {treatment.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-teal-50/50 border border-teal-100/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Step by Step Procedure Timeline */}
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Step-by-Step Experience
                </span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1">
                  How The Procedure Works
                </h2>
              </div>

              <div className="space-y-4">
                {treatment.procedureSteps.map((stepItem) => (
                  <div
                    key={stepItem.step}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
                  >
                    <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      {stepItem.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-bold text-slate-900">
                        {stepItem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Technology & Instrumentation */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Technology Deployed
              </h2>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Cpu className="w-4 h-4 text-teal-700" />
                  <span>Precision Equipment & Diagnostic Standards</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {treatment.technologyUsed.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200 text-slate-800 text-xs px-3 py-1.5 rounded-lg shadow-2xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Frequently Asked Questions */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Common Patient Concerns
              </h2>

              <div className="space-y-3">
                {treatment.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-heading font-semibold text-sm sm:text-base text-slate-900">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Switcher */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Direct Booking Action Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-md space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  California Consult
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Book For {treatment.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Includes comprehensive intraoral camera examination, digital X-rays, and direct doctor discussion.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Starting Price:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{treatment.priceStarting}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">{treatment.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pain-Free Protocol:</span>
                  <span className="font-semibold text-teal-700">Guaranteed</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookThis}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>No cancellation fees · Free rescheduling</span>
              </div>
            </div>

            {/* Other Treatments Quick Nav */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Other Specialities
              </h4>
              <div className="space-y-2">
                {TREATMENTS.filter((t) => t.id !== treatment.id).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTreatment(t);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-white p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-slate-400 text-[11px] shrink-0">{t.priceStarting}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
