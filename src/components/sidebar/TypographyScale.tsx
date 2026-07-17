import React from 'react';
import { useTypographyStore } from '../../store/typographyStore';
import { TYPE_SCALE_RATIOS, generateTypeScale } from '../../utils/typography.ts';

export const TypographyScale: React.FC = () => {
  const { typeScaleRatio, setTypeScaleRatio, baseFontSize, setBaseFontSize } = useTypographyStore();

  const scale = generateTypeScale(baseFontSize, typeScaleRatio);

  const scaleItems = [
    { label: '4XL Heading Extra', key: '4xl', size: scale['4xl'] },
    { label: '3XL Heading Large', key: '3xl', size: scale['3xl'] },
    { label: '2XL Heading Medium', key: '2xl', size: scale['2xl'] },
    { label: 'XL Heading Small', key: 'xl', size: scale['xl'] },
    { label: 'LG Subtitle', key: 'lg', size: scale['lg'] },
    { label: 'Base Body', key: 'base', size: scale.base },
    { label: 'SM Caption', key: 'sm', size: scale.sm },
    { label: 'XS Tag', key: 'xs', size: scale.xs },
  ];

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-medium text-[#17191c]">
          <span>Base Font Size</span>
          <span className="font-mono bg-[#f2f2f3] px-1.5 py-0.5 rounded-[16px] text-[11px]">
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
          className="w-full h-1.5 bg-[#f2f2f3] rounded-[9999px] appearance-none cursor-pointer accent-[#17191c]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#17191c]">
          Scale Ratio
        </label>
        <select
          value={typeScaleRatio}
          onChange={(e) => setTypeScaleRatio(parseFloat(e.target.value))}
          className="w-full px-3 py-2 text-xs font-medium text-[#17191c] bg-white border border-[#f2f2f3] rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] cursor-pointer"
        >
          {TYPE_SCALE_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>
              {ratio.name} ({ratio.value.toFixed(3)})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2.5 border-t pt-4 border-[#f2f2f3]">
        <span className="text-[10px] uppercase font-medium text-[#979799] tracking-wider">
          Scale Preview
        </span>
        <div className="flex flex-col gap-2">
          {scaleItems.map((item) => (
            <div key={item.key} className="flex flex-col gap-0.5 border-b border-dashed pb-1.5 border-[#f2f2f3] last:border-0 last:pb-0">
              <div className="flex items-center justify-between text-[10px] text-[#979799] font-medium">
                <span>{item.label}</span>
                <span className="font-mono text-[#17191c]">{item.size}px</span>
              </div>
              <p
                style={{ fontSize: `${Math.min(item.size, 28)}px`, lineHeight: '1.25' }}
                className="font-medium text-[#17191c] truncate leading-none"
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
