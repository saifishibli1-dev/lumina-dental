import React, { useState } from 'react';
import { PageId } from '../types';
import { TREATMENTS, CLINIC_INFO } from '../data/clinicData';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Share2,
  FileText,
  User,
  Phone,
  Mail,
  Building2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

interface BookAppointmentPageProps {
  onNavigate: (page: PageId) => void;
  preselectedTreatment?: string;
  preselectedDoctor?: string;
}

export default function BookAppointmentPage({
  onNavigate,
  preselectedTreatment = '',
  preselectedDoctor = '',
}: BookAppointmentPageProps) {
  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(
    preselectedTreatment || TREATMENTS[0].title
  );
  const [doctor, setDoctor] = useState(
    preselectedDoctor || 'Senior Specialist Consultation'
  );
  const [branch, setBranch] = useState<'Beverly Hills' | 'Santa Monica'>(
    'Beverly Hills'
  );
  const [date, setDate] = useState(minDateStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 12:00 PM (Morning)');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    fullName: string;
    phone: string;
    email: string;
    treatment: string;
    doctor: string;
    branch: string;
    date: string;
    timeSlot: string;
  } | null>(null);

  const timeSlots = [
    '09:30 AM – 10:30 AM (Early Morning)',
    '11:00 AM – 12:00 PM (Morning)',
    '01:30 PM – 02:30 PM (Early Afternoon)',
    '03:00 PM – 04:00 PM (Afternoon)',
    '05:00 PM – 06:00 PM (Evening)',
    '06:30 PM – 07:30 PM (Late Evening)',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal name.';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!date) {
      errs.date = 'Please pick a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief medical scheduler confirmation
    setTimeout(() => {
      const generatedId = `LUM-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setConfirmedBooking({
        id: generatedId,
        fullName,
        phone,
        email,
        treatment,
        doctor,
        branch,
        date,
        timeSlot,
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lumina Dental Studio//EN
BEGIN:VEVENT
UID:${confirmedBooking.id}@luminadental.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T053000Z
SUMMARY:Dental Consult: ${confirmedBooking.treatment} - Lumina Dental Studio
DESCRIPTION:Appointment ID: ${confirmedBooking.id}\\nDoctor: ${confirmedBooking.doctor}\\nLocation: Lumina Dental Studio ${confirmedBooking.branch}
LOCATION:${confirmedBooking.branch === 'Beverly Hills' ? CLINIC_INFO.headquarters : CLINIC_INFO.branch}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Lumina-Appointment-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    if (!confirmedBooking) return;
    const text = `Hello Lumina Dental Studio, I have booked appointment ref #${confirmedBooking.id} for ${confirmedBooking.treatment} on ${confirmedBooking.date} (${confirmedBooking.timeSlot}) at ${confirmedBooking.branch}. Name: ${confirmedBooking.fullName}.`;
    window.open(
      `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* SUCCESS CONFIRMATION STATE */}
      {confirmedBooking ? (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl space-y-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-teal-800 tracking-wider uppercase">
                Appointment Requested Successfully
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                You're Scheduled, {confirmedBooking.fullName.split(' ')[0]}!
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                We have reserved your consultation slot. A confirmation message and reminder have been sent to your contact number.
              </p>
            </div>

            {/* Booking Reference Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs text-slate-500">Booking Reference</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  {confirmedBooking.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Procedure</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.treatment}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Consultation Type</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.doctor}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Preferred Slot</span>
                  <span className="font-bold text-slate-900">
                    {confirmedBooking.date} · {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Studio Location</span>
                  <span className="font-bold text-teal-800">{confirmedBooking.branch} Studio</span>
                </div>
              </div>
            </div>

            {/* Guidance list */}
            <div className="space-y-2 text-xs text-slate-600 bg-teal-50/50 p-4 rounded-xl border border-teal-100">
              <span className="font-bold text-teal-900 block">What to expect on your visit:</span>
              <ul className="space-y-1 list-disc list-inside">
                <li>Please arrive 10 minutes early to complete your medical history check.</li>
                <li>Valet parking is complimentary at the studio entrance.</li>
                <li>Feel free to bring any existing dental OPG or CBCT scans if available.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onNavigate('home');
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                Return to Lumina Home
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* APPOINTMENT FORM */
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
                Concierge Scheduling
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Schedule Your Private Consultation
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Reserve your dedicated consultation slot with our fellowship-trained specialists. No long waiting queues; your operatory is pre-sanitized and prepared specifically for your visit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                  01. Patient Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Eleanor Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg border transition-all ${
                          errors.fullName
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-slate-300 focus:ring-2 focus:ring-teal-600'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+1 (310) 555-0192"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg border transition-all ${
                          errors.phone
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-slate-300 focus:ring-2 focus:ring-teal-600'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For Calendar & Digital Summary)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg border transition-all ${
                        errors.email
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-slate-300 focus:ring-2 focus:ring-teal-600'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Clinical Selection */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                  02. Clinical Service & Doctor Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Treatment Needed *
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 transition-all"
                    >
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title} ({t.category})
                        </option>
                      ))}
                      <option value="General Consultation & Checkup">
                        General Consultation & Checkup
                      </option>
                      <option value="Urgent Relief / Toothache">
                        Urgent Relief / Toothache
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Consultation Type
                    </label>
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 transition-all"
                    >
                      <option value="Senior Specialist Consultation">
                        Senior Specialist Consultation
                      </option>
                      <option value="Second Opinion / Case Review">
                        Second Opinion / Case Review
                      </option>
                      <option value="Preventative Oral Health Assessment">
                        Preventative Oral Health Assessment
                      </option>
                      <option value="Emergency Tooth Pain Evaluation">
                        Emergency Tooth Pain Evaluation
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select California Studio *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBranch('Beverly Hills')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        branch === 'Beverly Hills'
                          ? 'border-teal-600 bg-teal-50/40 text-slate-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">
                          Beverly Hills (Flagship)
                        </span>
                        <Building2 className="w-4 h-4 text-teal-700" />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        435 N Bedford Dr · Suite 210
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBranch('Santa Monica')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        branch === 'Santa Monica'
                          ? 'border-teal-600 bg-teal-50/40 text-slate-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">
                          Santa Monica Studio
                        </span>
                        <Building2 className="w-4 h-4 text-teal-700" />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        1250 4th Street · Suite 320
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                  03. Date & Preferred Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={minDateStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 transition-all"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical notes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Special Notes or Medical Preferences (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. History of dental anxiety, previous root canal, diabetic, wheelchair access needed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-600 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Confirming Appointment Slot...</span>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4" />
                      <span>Confirm & Reserve Appointment</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    No advance payment required. Free cancellation or rescheduling up to 4 hours prior.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
