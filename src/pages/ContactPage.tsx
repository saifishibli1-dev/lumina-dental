import React, { useState } from 'react';
import { PageId } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Train,
  Car,
  CheckCircle2,
  Send,
  Calendar,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [selectedStudio, setSelectedStudio] = useState<'bh' | 'sm'>('bh');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Lumina Dental Studio, I would like to inquire about dental services.'
  )}`;

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
            Southern California Locations & Inquiries
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Connect with Lumina Dental Studio
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Conveniently located in Beverly Hills and Santa Monica. Reach our patient concierge for consultation bookings, treatment inquiries, or emergency relief.
          </p>
        </div>
      </section>

      {/* Main Grid: Studio Locations & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Studios and Direct Contacts */}
          <div className="lg:col-span-7 space-y-8">
            {/* Studio selector buttons */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-md">
              <button
                type="button"
                onClick={() => setSelectedStudio('bh')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedStudio === 'bh'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Beverly Hills (Flagship)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudio('sm')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedStudio === 'sm'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Santa Monica Studio
              </button>
            </div>

            {/* Selected Studio Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
                    {selectedStudio === 'bh' ? 'Flagship Surgery Suite' : 'Coastal Aesthetics Studio'}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    {selectedStudio === 'bh'
                      ? 'Lumina Studio Beverly Hills'
                      : 'Lumina Studio Santa Monica'}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open Today</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Physical Address:</span>
                    <span>
                      {selectedStudio === 'bh'
                        ? CLINIC_INFO.headquarters
                        : CLINIC_INFO.branch}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Telephone:</span>
                    <a
                      href={`tel:${CLINIC_INFO.phonePrimary.replace(/[^0-9+]/g, '')}`}
                      className="hover:text-teal-700 transition-colors tabular-nums"
                    >
                      {CLINIC_INFO.phonePrimary}
                    </a>
                    <span className="text-slate-400 mx-2">/</span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneDirect.replace(/[^0-9+]/g, '')}`}
                      className="hover:text-teal-700 transition-colors tabular-nums font-mono text-xs"
                    >
                      {CLINIC_INFO.phoneDirect} (Direct)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Concierge Email:</span>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="hover:text-teal-700 transition-colors"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Consultation Hours:</span>
                    <p className="text-xs text-slate-500">Monday – Friday: {CLINIC_INFO.hours.weekdays}</p>
                    <p className="text-xs text-slate-500">Saturday: {CLINIC_INFO.hours.saturday}</p>
                    <p className="text-xs text-slate-500">Sunday: {CLINIC_INFO.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Southern California Arrival & Parking
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Train className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>
                      {selectedStudio === 'bh'
                        ? 'Beverly Hills: Situated on the world-renowned Bedford Drive medical corridor, moments from Wilshire Blvd & Rodeo Drive.'
                        : 'Santa Monica: Steps from Ocean Avenue and 3 blocks from the Downtown Santa Monica Metro E Line Station.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>
                      {selectedStudio === 'bh'
                        ? 'Underground valet and validation available directly in the 435 N Bedford building garage.'
                        : 'Convenient validated garage parking at 4th Street structure and street-level access.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors border border-emerald-200"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('book-appointment')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Online</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
                  Direct Inquiries
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                  Send Us a Message
                </h3>
                <p className="text-xs text-slate-500">
                  Our patient coordinator will respond within 2 hours during clinic hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-slate-900">
                    Message Received
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you, {formData.name}. Our clinic concierge has received your note and will contact you at {formData.phone} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="text-xs font-semibold text-teal-700 hover:underline pt-2 block mx-auto cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (310) 555-0192"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Topic of Inquiry
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    >
                      <option value="General Inquiry">General Dental Inquiry</option>
                      <option value="Fee Estimation">Treatment Cost & Fee Question</option>
                      <option value="Second Opinion">Second Opinion on Existing Scan</option>
                      <option value="Urgent Relief">Urgent Tooth Pain / Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message or Symptoms
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe what you would like advice on..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
