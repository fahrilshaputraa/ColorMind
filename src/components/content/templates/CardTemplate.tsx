import React from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { useUIStore } from '../../../store/uiStore';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { ShoppingCart, Star, Award, TrendingUp, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateTypeScale } from '../../../utils/typography.ts';

export const CardTemplate: React.FC = () => {
  const tokens = useDesignSystem();
  const { theme } = useUIStore();

  const c1 = tokens.colors[0]?.hex || '#3b82f6';
  const c2 = tokens.colors[1]?.hex || '#10b981';
  const c3 = tokens.colors[2]?.hex || '#f59e0b';

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

  // Dynamic layout bindings
  const pCard = `${tokens.baseUnit * 2.5}px`;
  const gapStats = `${tokens.baseUnit * 1.5}px`;

  // Dynamic border radius
  const rCard = `${tokens.borderRadius.xl}px`;
  const rButton = `${tokens.borderRadius.md}px`;
  const rBadge = `${tokens.borderRadius.full}px`;

  // Dynamic shadows
  const sCard = tokens.boxShadow.md;

  return (
    <div
      style={bodyStyle}
      className={`w-full min-h-full flex flex-col p-8 select-none ${
        isDarkPreview ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-800'
      }`}
    >
      {/* Visual Helper Banner */}
      <div className="flex items-center justify-between border-b pb-4 mb-8 border-neutral-200 dark:border-neutral-850">
        <span className="text-xs font-semibold text-neutral-400">Interactive Cards Gallery</span>
        <ContrastBadge textHex={c1} bgHex={isDarkPreview ? '#171717' : '#ffffff'} size="sm" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Card 1: Product Card */}
        <div style={{ borderRadius: rCard, boxShadow: sCard }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          {/* Card Hero Color Area */}
          <div
            style={{ backgroundColor: c1 }}
            className="h-36 w-full flex items-center justify-center p-4 relative cursor-pointer"
            onClick={() => handleCopyClass(`bg-[${c1}]`)}
          >
            <ShoppingCart className="w-12 h-12 text-white/90" />
            <span className="absolute bottom-2.5 right-2.5 bg-neutral-950/70 backdrop-blur-xs text-white text-[9px] font-bold py-1 px-2 rounded-md font-mono select-none">
              {c1}
            </span>
          </div>

          <div style={{ padding: pCard }} className="flex flex-col gap-3.5 text-left">
            <div className="flex items-center justify-between">
              <span style={{ color: c2, backgroundColor: c2 + '12', borderRadius: rBadge, fontSize: `${scale.xs}px` }} className="font-bold px-2 py-0.5 border">
                New Arrival
              </span>
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span style={{ fontSize: `${scale.xs}px` }} className="font-bold">4.9</span>
              </div>
            </div>

            <div>
              <h4 style={{ ...headingStyle, fontSize: `${scale.base}px` }} className="font-extrabold text-neutral-900 dark:text-white leading-snug">
                Sleek Backpack Pro
              </h4>
              <p style={{ fontSize: `${scale.xs}px` }} className="text-neutral-400 mt-1 leading-relaxed">
                Premium water-resistant minimalist daily carry companion.
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span style={{ ...headingStyle, fontSize: `${scale.lg}px` }} className="font-black text-neutral-900 dark:text-white">
                $129.00
              </span>
              <button
                onClick={() => handleCopyClass(`bg-[${c1}] text-white rounded`)}
                style={{ backgroundColor: c1, borderRadius: rButton, fontSize: `${scale.xs}px` }}
                type="button"
                className="px-3.5 py-2 font-bold text-white hover:brightness-105 active:scale-97 transition-all cursor-pointer shadow-sm border-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: User Profile Card */}
        <div style={{ borderRadius: rCard, boxShadow: sCard, padding: pCard }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col text-center items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="relative">
            {/* User Avatar simulation */}
            <div
              style={{ backgroundColor: c2 }}
              className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-900 shadow-md relative"
            >
              <Users className="w-8 h-8 text-white" />
            </div>
            <span
              style={{ backgroundColor: c3 }}
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center animate-bounce"
              title="Verified Expert"
            >
              <Award className="w-2.5 h-2.5 text-white" />
            </span>
          </div>

          <div className="text-center">
            <h4 style={{ ...headingStyle, fontSize: `${scale.base}px` }} className="font-extrabold text-neutral-900 dark:text-white">
              Fahril Shaputra
            </h4>
            <span style={{ fontSize: `${scale.xs}px` }} className="text-neutral-400 font-semibold tracking-wide">
              Lead UI/UX Architect
            </span>
          </div>

          <p style={{ fontSize: `${scale.xs}px` }} className="text-neutral-500 dark:text-neutral-400 leading-normal max-w-[200px]">
            Merancang sistem antarmuka berbasis harmoni dan aksesibilitas modern.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full border-t border-b py-2.5 border-neutral-100 dark:border-neutral-800 my-1">
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-400 font-bold uppercase">Projects</span>
              <span style={{ color: c1, fontSize: `${scale.base}px` }} className="font-extrabold">124</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-400 font-bold uppercase">Rating</span>
              <span style={{ color: c2, fontSize: `${scale.base}px` }} className="font-extrabold">9.9</span>
            </div>
          </div>

          <button
            onClick={() => handleCopyClass(`bg-[${c1}] text-white rounded`)}
            style={{ backgroundColor: c1, borderRadius: rButton, fontSize: `${scale.xs}px` }}
            type="button"
            className="w-full py-2 font-bold text-white hover:brightness-105 active:scale-97 transition-all cursor-pointer shadow-sm border-none"
          >
            Connect
          </button>
        </div>

        {/* Card 3: Dashboard Stats Card */}
        <div style={{ borderRadius: rCard, boxShadow: sCard, padding: pCard }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col text-left gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: `${scale.xs}px` }} className="font-bold text-neutral-400 uppercase tracking-wide">
              Annual Revenue
            </span>
            <span
              style={{ color: c2, backgroundColor: c2 + '12', borderRadius: rButton }}
              className="p-1.5 flex items-center justify-center border"
            >
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <div style={{ gap: gapStats }} className="flex flex-col">
            <h3 style={{ ...headingStyle, fontSize: `${scale['2xl']}px` }} className="font-black text-neutral-900 dark:text-white tracking-tight">
              $892,429
            </h3>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
              +14.8% <span className="text-neutral-400 font-semibold font-sans">vs last year</span>
            </span>
          </div>

          {/* Sparkline mini-graph preview */}
          <div className="flex items-end justify-between h-12 w-full pt-2 gap-1 border-b pb-2 border-neutral-100 dark:border-neutral-800/60">
            <span style={{ backgroundColor: c1 + '35' }} className="h-6 w-full rounded-sm block"></span>
            <span style={{ backgroundColor: c1 + '60' }} className="h-8 w-full rounded-sm block"></span>
            <span style={{ backgroundColor: c1 }} className="h-12 w-full rounded-sm block"></span>
            <span style={{ backgroundColor: c2 + '40' }} className="h-9 w-full rounded-sm block"></span>
            <span style={{ backgroundColor: c2 }} className="h-10 w-full rounded-sm block"></span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-semibold">
            <span>Primary scale: {c1}</span>
            <span>Secondary: {c2}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default CardTemplate;
