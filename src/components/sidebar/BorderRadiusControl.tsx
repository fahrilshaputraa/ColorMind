import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';
import { Square } from 'lucide-react';

export const BorderRadiusControl: React.FC = () => {
  const { borderRadius, customRadius, setCustomRadius } = useSpacingStore();

  const radiusItems = [
    { name: 'none', label: 'None', val: borderRadius.none },
    { name: 'sm', label: 'Small', val: borderRadius.sm },
    { name: 'md', label: 'Medium', val: borderRadius.md },
    { name: 'lg', label: 'Large', val: borderRadius.lg },
    { name: 'xl', label: 'XLarge', val: borderRadius.xl },
    { name: '2xl', label: '2XLarge', val: borderRadius['2xl'] },
    { name: 'custom', label: 'Custom Slider', val: customRadius },
    { name: 'full', label: 'Full pill', val: 9999 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800/60 shadow-2xs text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
        <Square className="w-4 h-4 text-violet-500" />
        <span>Border Radius Config</span>
      </div>

      {/* Custom Slider Control */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-semibold text-neutral-600 dark:text-neutral-350">
          <span>Custom Radius</span>
          <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-bold">
            {customRadius}px
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          step="1"
          value={customRadius}
          onChange={(e) => setCustomRadius(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
        />
      </div>

      {/* Radius scale preview items */}
      <div className="flex flex-col gap-2 mt-3 border-t pt-3.5 border-neutral-100 dark:border-neutral-800/60">
        <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
          Radius Reference Scale
        </span>
        <div className="grid grid-cols-2 gap-3 mt-1.5">
          {radiusItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-150 dark:border-neutral-800/50 shadow-3xs">
              {/* Box showing radius curvature */}
              <div
                style={{
                  borderRadius: item.val === 9999 ? '9999px' : `${item.val}px`,
                }}
                className="w-8 h-8 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/25 border border-violet-500/30 flex-shrink-0"
              ></div>
              <div className="flex flex-col justify-center leading-none">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  {item.label}
                </span>
                <span className="text-[9px] font-semibold font-mono text-neutral-400 dark:text-neutral-500 mt-1">
                  {item.val === 9999 ? 'full' : `${item.val}px`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BorderRadiusControl;
