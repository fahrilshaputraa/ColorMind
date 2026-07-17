import React from 'react';
import { useTypographyStore } from '../../store/typographyStore';
import { TYPE_SCALE_RATIOS, generateTypeScale } from '../../utils/typography.ts';
import { Ruler } from 'lucide-react';

export const TypographyScale: React.FC = () => {
  const { typeScaleRatio, setTypeScaleRatio, baseFontSize, setBaseFontSize } = useTypographyStore();

  const scale = generateTypeScale(baseFontSize, typeScaleRatio);

  const scaleItems = [
    { label: '4XL Heading Extra', key: '4xl', size: scale['4xl'] },
    { label: '3XL Heading Large', key: '3xl', size: scale['3xl'] },
    { label: '2XL Heading Medium', key: '2xl', size: scale['2xl'] },
    { label: 'XL Heading Small', key: 'xl', size: scale['xl'] },
    { label: 'LG Subtitle / Large text', key: 'lg', size: scale['lg'] },
    { label: 'Base Body text', key: 'base', size: scale.base },
    { label: 'SM Captions / Small text', key: 'sm', size: scale.sm },
    { label: 'XS Tags / Tiny labels', key: 'xs', size: scale.xs },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800/60 shadow-2xs text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
        <Ruler className="w-4 h-4 text-violet-500" />
        <span>Type Scale Config</span>
      </div>

      {/* Base Font Size Selector */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-semibold text-neutral-600 dark:text-neutral-350">
          <span>Base Font Size</span>
          <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-bold">
            {baseFontSize}px
          </span>
        </div>
        <input
          type="range"
          min="12"
          max="24"
          step="1"
          value={baseFontSize}
          onChange={(e) => setBaseFontSize(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
        />
      </div>

      {/* Scale Ratio Selector */}
      <div className="flex flex-col gap-1.5 mt-1">
        <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-350">
          Scale Multiplier Ratio
        </label>
        <select
          value={typeScaleRatio}
          onChange={(e) => setTypeScaleRatio(parseFloat(e.target.value))}
          className="w-full px-3 py-2 text-xs font-semibold text-neutral-850 dark:text-neutral-250 bg-white dark:bg-neutral-800/60 border border-neutral-255 dark:border-neutral-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
        >
          {TYPE_SCALE_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>
              {ratio.name} ({ratio.value.toFixed(3)})
            </option>
          ))}
        </select>
      </div>

      {/* Visual Hierarchy Preview List */}
      <div className="flex flex-col gap-3 mt-4 border-t pt-4 border-neutral-100 dark:border-neutral-800/60">
        <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
          Calculated Scale Preview
        </span>
        <div className="flex flex-col gap-3.5 mt-1">
          {scaleItems.map((item) => (
            <div key={item.key} className="flex flex-col gap-1 border-b border-dashed pb-2 border-neutral-100 dark:border-neutral-850 last:border-0 last:pb-0">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold">
                <span>{item.label}</span>
                <span className="font-mono text-violet-600 dark:text-violet-400">{item.size}px</span>
              </div>
              <p
                style={{ fontSize: `${item.size}px`, lineHeight: '1.25' }}
                className="font-semibold text-neutral-800 dark:text-neutral-150 truncate leading-none mt-0.5"
              >
                Grumpy wizards make toxic brew.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TypographyScale;
