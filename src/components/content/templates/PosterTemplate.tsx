import React from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { Calendar, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateTypeScale } from '../../../utils/typography.ts';

export const PosterTemplate: React.FC = () => {
  const tokens = useDesignSystem();

  const c1 = tokens.colors[0]?.hex || '#17191c';
  const c3 = tokens.colors[2]?.hex || '#f2f2f3';
  const scale = generateTypeScale(tokens.baseFontSize, tokens.typeScaleRatio);
  const r = tokens.borderRadius;
  const u = tokens.baseUnit;
  const cardRadius = tokens.customRadius || r['2xl'];

  const headingFontFamily = tokens.headingFont ? `"${tokens.headingFont.name}", "Source Serif 4", Georgia, ui-serif, serif` : '"Source Serif 4", Georgia, ui-serif, serif';
  const bodyFontFamily = tokens.bodyFont ? `"${tokens.bodyFont.name}", Inter, ui-sans-serif, system-ui, sans-serif` : 'Inter, ui-sans-serif, system-ui, sans-serif';

  const headingStyle = {
    fontFamily: headingFontFamily,
    fontWeight: 400,
    color: '#ffffff',
  };

  const handleCopyClass = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied class: ${className}`);
  };

  const paperBg = tokens.paperBg;

  return (
    <div
      style={{ fontFamily: bodyFontFamily, backgroundColor: paperBg }}
      className="w-full min-h-full flex flex-col items-center justify-center p-8 select-none"
    >
      <div className="w-full max-w-md flex items-center justify-between pb-3 mb-6" style={{ borderBottom: '1px solid #f2f2f3' }}>
        <span className="font-medium" style={{ color: '#979799', fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }}>Steep — Poster Preview</span>
        <ContrastBadge textHex={c1} bgHex={c3} size="sm" />
      </div>

      <div
        style={{
          background: `linear-gradient(135deg, ${c1}, #0c1a2e)`,
          borderRadius: `${cardRadius}px`,
          padding: `${u * 10.5}px`,
        }}
        className="w-full max-w-md text-white text-left relative overflow-hidden flex flex-col"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-[9999px] bg-[#fbe1d1]/10 blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-[9999px] bg-black/20 blur-xl"></div>

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1 font-medium uppercase tracking-widest rounded-[9999px]" style={{ fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }}>
            <Sparkles className="w-3 h-3 text-[#fbe1d1]" />
            <span>ANNUAL CONFERENCE 2026</span>
          </div>
          <span className="font-medium animate-pulse" style={{ color: '#fbe1d1', fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }}>LIVE</span>
        </div>

        <div className="flex flex-col gap-4 my-8 z-10">
          <h2
            style={{ ...headingStyle, fontSize: `${scale['3xl']}px`, lineHeight: 1.3, letterSpacing: '-0.66px' }}
            className="leading-tight"
          >
            STEEP & <span style={{ color: '#fbe1d1' }}>INNOVATION</span> SYMPOSIUM
          </h2>
          <p style={{ fontSize: `${scale.sm}px`, lineHeight: 1.5 }} className="text-white/80 leading-relaxed font-normal">
            Satu hari penuh eksplorasi analitik, desain editorial, dan inovasi data masa depan.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4 z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/70 shrink-0" />
              <div className="flex flex-col">
                <span className="text-white/50 font-medium uppercase" style={{ fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }}>Date</span>
                <span style={{ fontSize: `${scale.xs}px`, fontFamily: bodyFontFamily, fontWeight: 400 }}>17 November 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/70 shrink-0" />
              <div className="flex flex-col">
                <span className="text-white/50 font-medium uppercase" style={{ fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }}>Venue</span>
                <span style={{ fontSize: `${scale.xs}px`, fontFamily: bodyFontFamily, fontWeight: 400 }}>Symphony Hall, Jakarta</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 gap-3">
            <button
              onClick={() => handleCopyClass(`bg-white text-[${c1}] rounded-[9999px]`)}
              style={{ backgroundColor: '#ffffff', color: c1, borderRadius: `${r.full}px`, padding: `${u * 3}px ${u * 5}px`, fontSize: `${scale.lg}px`, fontWeight: 400, fontFamily: bodyFontFamily }}
              type="button"
              className="cursor-pointer border-none shrink-0"
            >
              Get Free Tickets
            </button>
            <div style={{ borderRadius: `${r.full}px`, fontFamily: bodyFontFamily, fontSize: `${scale.xs}px` }} className="flex items-center gap-1.5 bg-white/15 px-3 py-2 font-medium shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>rsvp.steep</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosterTemplate;
