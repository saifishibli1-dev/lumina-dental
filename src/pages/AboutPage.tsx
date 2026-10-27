import { PageId } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  Award,
  Users,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-6">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
            About Lumina Dental Studio · Beverly Hills & Santa Monica
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Where Advanced Science Meets Human Compassion
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded in 2014 in Beverly Hills, Lumina Dental Studio was created to replace clinical anxiety with restorative peace of mind. We reject rushed appointments and aggressive overtreatment in favor of evidence-based biological tooth preservation.
          </p>
        </div>
      </section>

      {/* 2. Editorial Image & Clinic Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/images/clinic_interior_lounge_1790676578766.jpg"
              alt="Lumina Dental Studio luxury reception lounge in Beverly Hills, California"
              referrerPolicy="no-referrer"
              className="w-full h-[360px] sm:h-[460px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl text-xs text-slate-700 shadow-sm border border-slate-100">
              <span className="font-semibold block text-slate-900">
                Flagship Studio · Bedford Drive, Beverly Hills, CA
              </span>
              <span>Spacious, sanitized suites engineered for tranquility and absolute acoustic privacy.</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Our Clinical Philosophy
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Too often, dentistry is practiced as a reactionary repair trade. At Lumina, our senior clinicians view the oral cavity as a vital bio-aesthetic ecosystem. Every procedure begins with micro-level diagnostics using high-definition 3D imaging, allowing us to intervene conservatively while preserving natural enamel.
              </p>
              <p>
                Whether you visit us for a preventive clean with Swiss warm-water AirFlow or an intricate full-arch implant restoration, we dedicate generous time to explain your options transparently. No jargon, no surprise line items, and zero unnecessary treatments.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-teal-800 tabular-nums block">
                  18,500+
                </span>
                <span className="text-xs text-slate-500">Patients Treated</span>
              </div>
              <div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-teal-800 tabular-nums block">
                  12+ Years
                </span>
                <span className="text-xs text-slate-500">Southern California Presence</span>
              </div>
              <div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-teal-800 tabular-nums block">
                  99.4%
                </span>
                <span className="text-xs text-slate-500">Patient Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              The Lumina Difference
            </span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-1">
              Four Standards That Define Our Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Ethical & Conservative
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We protect your natural tooth structure at all costs. We never recommend procedures that do not directly improve your health or stability.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Hospital-Grade Tech
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Equipped with Carl Zeiss surgical microscopes, Planmeca 3D CBCT, and 3Shape digital scanners for sub-millimeter precision.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Class-B Autoclave
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Exceeds international CDC protocols. German Melag Class-B vacuum sterilization guarantees zero cross-contamination.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Anxiety-Free Ambience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Heated massage chairs, noise-canceling headsets, and warm aromatherapeutic towels make visits genuinely calming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Six-Stage Sterilization Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              Strict Hygiene Protocol
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Our 6-Stage Infection Defense Cycle
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every instrument at Lumina passes through rigorous biological verification before being vacuum-sealed for your consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Ultrasonic Bio-Decontamination', desc: 'Enzymatic bath removes micron-level bio-debris.' },
              { step: '02', title: 'Thermal Disinfection', desc: 'High-heat rinse at 93°C neutralizes resilient pathogens.' },
              { step: '03', title: 'Medical-Grade Vacuum Sealing', desc: 'Hermetically sealed into sterile peel pouches with color change indicators.' },
              { step: '04', title: 'German Class-B Autoclaving', desc: 'Fractionated pre-vacuum steam sterilization at 134°C under high bar pressure.' },
              { step: '05', title: 'Spore Biological Testing', desc: 'Weekly Bacillus stearothermophilus spore vial testing verified by independent lab.' },
              { step: '06', title: 'Point-of-Care Pouch Opening', desc: 'Pouches are only opened directly in front of the patient immediately before use.' },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-mono font-bold text-teal-700">{s.step}</span>
                <h4 className="font-heading text-sm font-bold text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Navigation CTAs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              Explore our specialized dental treatments
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse procedures, transparent pricing, and advanced clinical technology.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('treatments')}
              className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
            >
              All Treatments
            </button>
            <button
              onClick={() => onNavigate('book-appointment')}
              className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-500 transition-colors cursor-pointer"
            >
              Book Consult
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
