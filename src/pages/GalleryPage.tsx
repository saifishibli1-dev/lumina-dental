import { useState } from 'react';
import { PageId } from '../types';
import { GALLERY_ITEMS, BEFORE_AFTER_CASES } from '../data/clinicData';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Sparkles, X, ZoomIn, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string; caption: string } | null>(null);

  const categories = ['All', 'Smile Results', 'Suites', 'Consultation'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
            Visual Portfolio & Clinic Environment
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Our Studio, Technology & Clinical Transformations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a virtual tour of our Beverly Hills & Santa Monica clinics. Every space has been engineered for uncompromising sterilization, acoustic tranquility, and clinical accuracy.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Before & After Feature Spot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Smile Makeover Analysis</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1">
            Compare Pre-Treatment & Aesthetic Completion
          </h2>
        </div>

        <div className="space-y-8">
          {BEFORE_AFTER_CASES.map((item) => (
            <BeforeAfterSlider key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Visual Photography Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            Studio Spaces & Clinical Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click any photograph to view in high resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setLightboxImg({
                  src: item.image,
                  title: item.title,
                  caption: item.caption,
                })
              }
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-200"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-1">
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 bg-slate-950">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-slate-900 border-t border-slate-800 text-white space-y-1">
              <h3 className="font-heading text-lg font-bold">
                {lightboxImg.title}
              </h3>
              <p className="text-xs text-slate-400">
                {lightboxImg.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold text-slate-900">
              Wish to visit our studio in person?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              We offer complimentary initial facility walk-throughs and smile planning consultations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-teal-700 transition-colors cursor-pointer shrink-0 inline-flex items-center gap-2"
          >
            <span>Book Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
