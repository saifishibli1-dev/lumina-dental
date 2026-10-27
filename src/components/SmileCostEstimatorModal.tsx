import { useState } from 'react';
import { TREATMENTS } from '../data/clinicData';
import { PageId } from '../types';
import { X, Check, Calculator, Calendar } from 'lucide-react';

interface SmileCostEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatmentForBooking: (treatmentTitle: string) => void;
  onNavigate: (page: PageId) => void;
}

export default function SmileCostEstimatorModal({
  isOpen,
  onClose,
  onSelectTreatmentForBooking,
}: SmileCostEstimatorModalProps) {
  const [selectedId, setSelectedId] = useState(TREATMENTS[0].id);
  const [teethCount, setTeethCount] = useState(1);

  if (!isOpen) return null;

  const currentTreatment = TREATMENTS.find((t) => t.id === selectedId) || TREATMENTS[0];

  const handleBookNow = () => {
    onSelectTreatmentForBooking(currentTreatment.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Transparent Fee & Timeline Guide
              </h3>
              <p className="text-xs text-slate-500">
                Accurate starting estimates · No hidden clinic fees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Select treatment */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Select Dental Procedure
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            >
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Conditional multiplier for unit-based treatments */}
          {(currentTreatment.id === 'cosmetic-dentistry' ||
            currentTreatment.id === 'dental-implants' ||
            currentTreatment.id === 'crowns-and-bridges') && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Number of Teeth / Units:</span>
                <span className="text-sm font-bold text-teal-800 tabular-nums">{teethCount} unit(s)</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={teethCount}
                onChange={(e) => setTeethCount(parseInt(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 unit (single tooth)</span>
                <span>4 units (smile line)</span>
                <span>8 units (full aesthetic arch)</span>
              </div>
            </div>
          )}

          {/* Fee & Specs Breakdown Card */}
          <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-5 space-y-4">
            <div className="flex items-baseline justify-between border-b border-teal-100/80 pb-3">
              <span className="text-sm font-medium text-slate-700">Estimated Investment</span>
              <div className="text-right">
                <span className="text-2xl font-bold font-heading text-teal-900 tabular-nums">
                  {currentTreatment.priceStarting}
                </span>
                <span className="text-xs text-slate-500 block">
                  Inclusive of digital scans & local anesthesia
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Expected Duration</span>
                <span className="font-semibold text-slate-800">{currentTreatment.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Clinical Visits</span>
                <span className="font-semibold text-slate-800">{currentTreatment.sessions}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                What’s Included:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentTreatment.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close Guide
          </button>
          <button
            type="button"
            onClick={handleBookNow}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Consult for {currentTreatment.title}
          </button>
        </div>
      </div>
    </div>
  );
}
