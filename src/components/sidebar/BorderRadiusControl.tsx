import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

export const BorderRadiusControl: React.FC = () => {
  const { borderRadius, customRadius, setCustomRadius } = useSpacingStore();

  const radiusItems = [
    { name: 'none', label: 'None', val: borderRadius.none },
    { name: 'sm', label: 'Small', val: borderRadius.sm },
    { name: 'md', label: 'Medium', val: borderRadius.md },
    { name: 'lg', label: 'Large', val: borderRadius.lg },
    { name: 'xl', label: 'XLarge', val: borderRadius.xl },
    { name: '2xl', label: '2XLarge', val: borderRadius['2xl'] },
    { name: 'custom', label: 'Custom', val: customRadius },
    { name: 'full', label: 'Full pill', val: 9999 },
  ];

  return (
    <div className="flex flex-col gap-3 text-left">
      <div className="flex justify-between items-center text-xs font-medium text-[#17191c]">
        <span>Custom Radius</span>
        <span className="font-mono bg-[#f2f2f3] px-1.5 py-0.5 rounded-[16px] text-[11px]">
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
        className="w-full h-1.5 bg-[#f2f2f3] rounded-[9999px] appearance-none cursor-pointer accent-[#17191c]"
      />

      <div className="grid grid-cols-2 gap-2 mt-1">
        {radiusItems.map((item) => (
          <div key={item.name} className="flex items-center gap-2 p-2 rounded-[16px] bg-white border border-[#f2f2f3]">
            <div
              style={{
                borderRadius: item.val === 9999 ? '9999px' : `${item.val}px`,
              }}
              className="w-7 h-7 bg-[#f2f2f3] border border-[#ececec] flex-shrink-0"
            ></div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[11px] font-medium text-[#17191c]">
                {item.label}
              </span>
              <span className="text-[9px] font-mono text-[#979799]">
                {item.val === 9999 ? 'full' : `${item.val}px`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BorderRadiusControl;
