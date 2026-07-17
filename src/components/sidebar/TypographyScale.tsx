import React from 'react';
import { useTypographyStore } from '../../store/typographyStore';
import { TYPE_SCALE_RATIOS, generateTypeScale } from '../../utils/typography.ts';

export const TypographyScale: React.FC = () => {
  const { typeScaleRatio, setTypeScaleRatio, baseFontSize, setBaseFontSize } = useTypographyStore();

  const scale = generateTypeScale(baseFontSize, typeScaleRatio);

  const scaleItems = [
    { label: '4XL', key: '4xl', size: scale['4xl'] },
    { label: '3XL', key: '3xl', size: scale['3xl'] },
    { label: '2XL', key: '2xl', size: scale['2xl'] },
    { label: 'XL', key: 'xl', size: scale['xl'] },
    { label: 'LG', key: 'lg', size: scale['lg'] },
    { label: 'Base', key: 'base', size: scale.base },
    { label: 'SM', key: 'sm', size: scale.sm },
    { label: 'XS', key: 'xs', size: scale.xs },
  ];

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Controls row */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-medium text-[#979799]">
            <span>Base size</span>
            <span className="font-mono text-[#17191c]">{baseFontSize}px</span>
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

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-[#979799]">Ratio</span>
          <select
            value={typeScaleRatio}
            onChange={(e) => setTypeScaleRatio(parseFloat(e.target.value))}
            className="px-2 py-1 text-[10px] font-medium text-[#17191c] bg-white border border-[#f2f2f3] rounded-[9999px] focus:outline-none focus:ring-1 focus:ring-[#17191c] cursor-pointer"
          >
            {TYPE_SCALE_RATIOS.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>
                {ratio.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scale preview — compact table */}
      <div className="bg-white border border-[#f2f2f3] rounded-[20px] divide-y divide-[#f2f2f3] overflow-hidden">
        {scaleItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] font-medium text-[#979799] w-6 shrink-0">{item.label}</span>
              <p
                style={{ fontSize: `${Math.min(item.size, 22)}px`, lineHeight: '1.2' }}
                className="font-medium text-[#17191c] truncate"
              >
                Aa
              </p>
            </div>
            <span className="font-mono text-[10px] text-[#979799] shrink-0">{item.size}px</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TypographyScale;
