import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

export const BorderRadiusControl: React.FC = () => {
  const { borderRadius, customRadius, setCustomRadius, setBorderRadius } = useSpacingStore();

  const radiusItems = [
    { name: 'none', label: 'None', val: borderRadius.none },
    { name: 'sm', label: 'SM', val: borderRadius.sm },
    { name: 'md', label: 'MD', val: borderRadius.md },
    { name: 'lg', label: 'LG', val: borderRadius.lg },
    { name: 'xl', label: 'XL', val: borderRadius.xl },
    { name: '2xl', label: '2XL', val: borderRadius['2xl'] },
    { name: 'custom', label: 'Custom', val: customRadius },
    { name: 'full', label: 'Pill', val: 9999 },
  ];

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Custom slider */}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="32"
          step="1"
          value={customRadius}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            setCustomRadius(val);
          }}
          className="flex-1 h-1.5 bg-[#f2f2f3] rounded-[9999px] appearance-none cursor-pointer accent-[#17191c]"
        />
        <button
          onClick={() => setCustomRadius(customRadius)}
          type="button"
          className="font-mono text-xs font-medium text-[#17191c] bg-[#f2f2f3] hover:bg-[#ececec] px-2 py-0.5 rounded-[9999px] min-w-[40px] text-center cursor-pointer border-none transition-colors"
        >
          {customRadius}px
        </button>
      </div>

      {/* Radius reference grid — clickable to set custom and update the preset key */}
      <div className="grid grid-cols-4 gap-1.5">
        {radiusItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name !== 'full' && item.name !== 'custom') {
                setBorderRadius(item.name, item.val);
              }
            }}
            type="button"
            className={`flex flex-col items-center gap-1 p-2 rounded-[16px] border transition-all cursor-pointer ${
              item.name === 'full'
                ? 'bg-white border-[#f2f2f3] cursor-default'
                : item.name === 'custom'
                  ? 'bg-white border-[#f2f2f3] cursor-default'
                  : borderRadius[item.name] === item.val && item.name !== 'none'
                    ? 'bg-[#17191c] border-[#17191c] text-white'
                    : 'bg-white border-[#f2f2f3] hover:bg-[#fafafb] hover:border-[#ececec]'
            }`}
          >
            <div
              style={{
                borderRadius: item.name === 'full' ? '9999px' : `${item.val}px`,
                width: '24px',
                height: '24px',
              }}
              className={`border ${
                item.name === 'full'
                  ? 'border-[#ececec]'
                  : item.name === 'custom'
                    ? 'border-[#ececec]'
                    : borderRadius[item.name] === item.val && item.name !== 'none'
                      ? 'border-white/30'
                      : 'border-[#ececec]'
              } ${
                item.name === 'full'
                  ? 'bg-[#f2f2f3]'
                  : item.name === 'custom'
                    ? 'bg-[#f2f2f3]'
                    : borderRadius[item.name] === item.val && item.name !== 'none'
                      ? 'bg-white/20'
                      : 'bg-[#f2f2f3]'
              }`}
            />
            <span className={`text-[9px] font-medium ${
              item.name === 'full' || item.name === 'custom'
                ? 'text-[#17191c]'
                : borderRadius[item.name] === item.val && item.name !== 'none'
                  ? 'text-white'
                  : 'text-[#17191c]'
            }`}>{item.label}</span>
            <span className={`text-[8px] font-mono ${
              item.name === 'full' || item.name === 'custom'
                ? 'text-[#979799]'
                : borderRadius[item.name] === item.val && item.name !== 'none'
                  ? 'text-white/60'
                  : 'text-[#979799]'
            }`}>
              {item.name === 'full' ? 'full' : item.name === 'custom' ? `${customRadius}` : `${item.val}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default BorderRadiusControl;
