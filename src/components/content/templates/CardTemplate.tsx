import React from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { ShoppingCart, Star, Award, TrendingUp, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateTypeScale } from '../../../utils/typography.ts';

export const CardTemplate: React.FC = () => {
  const tokens = useDesignSystem();

  const c1 = tokens.colors[0]?.hex || '#17191c';

  const scale = generateTypeScale(tokens.baseFontSize, tokens.typeScaleRatio);

  const headingFontFamily = tokens.headingFont ? `"${tokens.headingFont.name}", "Source Serif 4", Georgia, ui-serif, serif` : '"Source Serif 4", Georgia, ui-serif, serif';
  const bodyFontFamily = tokens.bodyFont ? `"${tokens.bodyFont.name}", Inter, ui-sans-serif, system-ui, sans-serif` : 'Inter, ui-sans-serif, system-ui, sans-serif';

  const headingStyle = {
    fontFamily: headingFontFamily,
    fontWeight: 400,
    color: c1,
  };

  const bodyStyle = {
    fontFamily: bodyFontFamily,
    fontSize: `${scale.base}px`,
  };

  const handleCopyClass = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied class: ${className}`);
  };

  const paperBg = '#ffffff';
  const charcoalText = '#17191c';
  const slateGrayText = '#777b86';

  return (
    <div
      style={{ ...bodyStyle, backgroundColor: paperBg, color: charcoalText }}
      className="w-full min-h-full flex flex-col p-8 select-none"
    >
      <div className="flex items-center justify-between pb-4 mb-8" style={{ borderBottom: '1px solid #f2f2f3' }}>
        <span className="text-xs font-medium" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Steep — Cards Gallery</span>
        <ContrastBadge textHex={c1} bgHex={paperBg} size="sm" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">

        {/* Card 1: Neutral Card */}
        <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '42px' }} className="flex flex-col gap-5">
          <div
            style={{ backgroundColor: c1, borderRadius: '24px', cursor: 'pointer' }}
            className="h-36 w-full flex items-center justify-center"
            onClick={() => handleCopyClass(`bg-[${c1}]`)}
          >
            <ShoppingCart className="w-12 h-12 text-white/90" />
            <span className="absolute bottom-2.5 right-2.5 bg-[#17191c]/80 text-white text-[9px] font-medium py-1 px-2 rounded-[9999px] font-mono select-none">
              {c1}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span style={{ backgroundColor: '#ffffff', color: c1, borderRadius: '9999px', padding: '9px 14px', fontSize: '14px', fontWeight: 400, fontFamily: bodyFontFamily }} className="inline-block">
                New Arrival
              </span>
              <div className="flex items-center gap-0.5 text-[#777b86]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-medium text-xs" style={{ color: charcoalText }}>4.9</span>
              </div>
            </div>

            <h4 style={{ ...headingStyle, fontSize: '22px', lineHeight: 1.5 }} className="leading-snug">
              Premium Carry Backpack
            </h4>
            <p style={{ fontSize: '15px', lineHeight: 1.5, color: slateGrayText, fontFamily: bodyFontFamily }} className="mt-1">
              Water-resistant carry with ink-black accents and paper-white canvas interior.
            </p>

            <div className="flex items-center justify-between mt-2">
              <span style={{ ...headingStyle, fontSize: '26px', lineHeight: 1.18, letterSpacing: '-0.23px' }}>
                $129.00
              </span>
              <button
                onClick={() => handleCopyClass(`bg-[${c1}] text-white rounded-[9999px]`)}
                style={{ backgroundColor: c1, color: '#ffffff', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400, fontFamily: bodyFontFamily }}
                type="button"
                className="cursor-pointer border-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Fog White Card */}
        <div style={{ backgroundColor: '#fafafb', borderRadius: '24px', padding: '28px' }} className="flex flex-col items-center text-center gap-5">
          <div className="relative">
            <div style={{ backgroundColor: '#f2f2f3' }} className="w-20 h-20 rounded-[24px] flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <span style={{ backgroundColor: c1 }} className="absolute -bottom-1 -right-1 w-5 h-5 rounded-[9999px] flex items-center justify-center" title="Verified">
              <Award className="w-2.5 h-2.5 text-white" />
            </span>
          </div>

          <div className="text-center">
            <h4 style={{ ...headingStyle, fontSize: '22px', lineHeight: 1.5 }} className="leading-snug">
              Fahril Shaputra
            </h4>
            <span style={{ fontSize: '12px', color: '#979799', fontFamily: bodyFontFamily, fontWeight: 400 }} className="tracking-wide">
              Lead UI/UX Architect
            </span>
          </div>

          <p style={{ fontSize: '15px', lineHeight: 1.5, color: slateGrayText, fontFamily: bodyFontFamily }} className="leading-normal max-w-[200px]">
            Merancang sistem antarmuka berbasis harmoni dan aksesibilitas modern.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full py-2.5 my-1" style={{ borderTop: '1px solid #f2f2f3', borderBottom: '1px solid #f2f2f3' }}>
            <div className="flex flex-col">
              <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Projects</span>
              <span style={{ color: c1, fontSize: '14px', fontFamily: headingFontFamily, fontWeight: 400 }}>124</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Rating</span>
              <span style={{ color: c1, fontSize: '14px', fontFamily: headingFontFamily, fontWeight: 400 }}>9.9</span>
            </div>
          </div>

          <button
            onClick={() => handleCopyClass(`bg-[${c1}] text-white rounded-[9999px]`)}
            style={{ backgroundColor: c1, color: '#ffffff', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400, fontFamily: bodyFontFamily }}
            type="button"
            className="w-full cursor-pointer border-none"
          >
            Connect
          </button>
        </div>

        {/* Card 3: Accent Peach Card */}
        <div style={{ backgroundColor: '#fbe1d1', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5d2a1a', fontFamily: bodyFontFamily }}>
              Annual Revenue
            </span>
            <span style={{ color: '#5d2a1a', backgroundColor: '#5d2a1a15', borderRadius: '9999px' }} className="p-1.5 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '26px', lineHeight: 1.18, letterSpacing: '-0.23px', color: '#5d2a1a' }} className="tracking-tight">
            $892,429
          </h3>

          <span className="text-[10px] font-medium flex items-center gap-1" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>
            +14.8% <span className="font-normal" style={{ color: '#5d2a1a' }}>vs last year</span>
          </span>

          <div className="flex items-end justify-between h-12 w-full pt-2 gap-1 pb-2" style={{ borderBottom: '1px solid #5d2a1a20' }}>
            <span style={{ backgroundColor: '#5d2a1a35' }} className="h-6 w-full rounded-[9999px] block"></span>
            <span style={{ backgroundColor: '#5d2a1a60' }} className="h-8 w-full rounded-[9999px] block"></span>
            <span style={{ backgroundColor: '#5d2a1a' }} className="h-12 w-full rounded-[9999px] block"></span>
            <span style={{ backgroundColor: '#fbe1d1' }} className="h-9 w-full rounded-[9999px] block"></span>
            <span style={{ backgroundColor: '#5d2a1a80' }} className="h-10 w-full rounded-[9999px] block"></span>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>
            <span>Primary: {c1}</span>
            <span>Accent: #fbe1d1</span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default CardTemplate;
