import React from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { useUIStore } from '../../../store/uiStore';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { Calendar, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateTypeScale } from '../../../utils/typography.ts';

export const PosterTemplate: React.FC = () => {
  const tokens = useDesignSystem();
  const { theme } = useUIStore();

  const c1 = tokens.colors[0]?.hex || '#3b82f6';
  const c2 = tokens.colors[1]?.hex || '#10b981';
  const c3 = tokens.colors[2]?.hex || '#f59e0b';
  const c5 = tokens.colors[4]?.hex || '#6366f1';

  const scale = generateTypeScale(tokens.baseFontSize, tokens.typeScaleRatio);

  const headingStyle = {
    fontFamily: tokens.headingFont ? `"${tokens.headingFont.name}", sans-serif` : 'sans-serif',
  };

  const bodyStyle = {
    fontFamily: tokens.bodyFont ? `"${tokens.bodyFont.name}", sans-serif` : 'sans-serif',
    fontSize: `${scale.base}px`,
  };

  const handleCopyClass = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied class: ${className}`);
  };

  const isDarkPreview = theme === 'dark';

  // Dynamic layout spacings
  const pPoster = `${tokens.baseUnit * 4}px`;
  
  // Dynamic border radius
  const rPoster = `${tokens.borderRadius.xl}px`;
  const rButton = `${tokens.borderRadius.md}px`;
  const rBadge = `${tokens.borderRadius.full}px`;

  // Dynamic shadows
  const sPoster = tokens.boxShadow.xl;

  return (
    <div
      style={bodyStyle}
      className={`w-full min-h-full flex flex-col items-center justify-center p-8 select-none ${
        isDarkPreview ? 'bg-neutral-900' : 'bg-neutral-100'
      }`}
    >
      {/* Visual Helper Banner */}
      <div className="w-full max-w-md flex items-center justify-between border-b pb-3 mb-6 border-neutral-250 dark:border-neutral-850">
        <span className="text-[10px] font-semibold text-neutral-400">Design Poster Preview</span>
        <ContrastBadge textHex={c1} bgHex={c2} size="sm" />
      </div>

      {/* Main Poster Block */}
      <div
        style={{
          background: `linear-gradient(135deg, ${c1}dd, ${c5}dd)`,
          borderColor: c3,
          borderRadius: rPoster,
          boxShadow: sPoster,
          padding: pPoster,
        }}
        className="w-full max-w-md border-4 text-white text-left shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px] aspect-[3/4] transition-all duration-300"
      >
        {/* Background micro-graphics */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-black/20 blur-xl"></div>

        {/* Top Poster Meta info */}
        <div className="flex items-center justify-between z-10">
          <div
            style={{ borderRadius: rBadge }}
            className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest border border-white/10"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>ANNUAL CONFERENCE 2026</span>
          </div>
          
          <span style={{ color: c3, fontSize: `${scale.xs}px` }} className="font-black animate-pulse">
            LIVE
          </span>
        </div>

        {/* Poster Main Body / Title */}
        <div className="flex flex-col gap-4 my-8 z-10">
          <h2
            style={{ ...headingStyle, fontSize: `${scale['3xl']}px` }}
            className="font-black leading-[1.08] tracking-tight drop-shadow-md"
          >
            DESIGN & <span style={{ color: c3 }} className="drop-shadow-none">INNOVATION</span> SYMPOSIUM
          </h2>
          
          <p style={{ fontSize: `${scale.xs}px` }} className="text-white/80 max-w-[280px] leading-relaxed font-medium">
            Satu hari penuh eksplorasi teknologi, desain kreatif, dan inovasi masa depan bersama praktisi industri global.
          </p>
        </div>

        {/* Poster Bottom Meta info */}
        <div className="flex flex-col gap-4 border-t pt-4 border-white/10 z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/70" />
              <div className="flex flex-col">
                <span className="text-[9px] text-white/50 font-bold uppercase">Date</span>
                <span style={{ fontSize: `${scale.xs}px` }} className="font-bold">17 November 2026</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/70" />
              <div className="flex flex-col">
                <span className="text-[9px] text-white/50 font-bold uppercase">Venue</span>
                <span style={{ fontSize: `${scale.xs}px` }} className="font-bold">Symphony Hall, Jakarta</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* CTA RSVP Button */}
            <button
              onClick={() => handleCopyClass(`bg-[${c3}] text-black font-extrabold`)}
              style={{ backgroundColor: c3, color: '#000000', borderRadius: rButton, fontSize: `${scale.xs}px` }}
              type="button"
              className="px-5 py-2.5 font-black hover:brightness-105 active:scale-97 transition-all cursor-pointer shadow-md select-none border-none"
            >
              Get Free Tickets
            </button>
            <div style={{ borderRadius: rButton }} className="flex items-center gap-1.5 bg-white/10 px-3 py-2 border border-white/5 text-[9px] font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>rsvp.symposium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosterTemplate;
