import React, { useState, useRef, useCallback } from 'react';
import { BeforeAfterCase } from '../types';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  item: BeforeAfterCase;
}

export default function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
            {item.category} · Verified Result
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-900 mt-1">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            {item.details}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 shrink-0">
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
            <span className="font-medium text-slate-700">Timeline:</span> {item.timeline}
          </div>
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
            <span className="font-medium text-slate-700">Doctor:</span> {item.doctor}
          </div>
        </div>
      </div>

      {/* Interactive Comparison Viewport */}
      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] rounded-xl overflow-hidden select-none cursor-ew-resize bg-slate-100"
      >
        {/* "AFTER" (Base Image) */}
        <img
          src={item.afterImg}
          alt={item.afterLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* "BEFORE" (Clipped Image) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.beforeImg}
            alt={item.beforeLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.clientWidth}px`
                : '100%',
            }}
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          {/* Centered Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 bg-white rounded-full shadow-md border-2 border-teal-600 flex items-center justify-center text-teal-700">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-md pointer-events-none">
          BEFORE (Consultation)
        </div>
        <div className="absolute top-4 right-4 bg-teal-800/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-md pointer-events-none">
          AFTER (Smile Makeover)
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xs text-slate-700 text-xs px-3.5 py-1 rounded-full shadow-xs pointer-events-none hidden sm:block">
          Drag slider left or right to compare
        </div>
      </div>
    </div>
  );
}
