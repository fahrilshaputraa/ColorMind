import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

export const SpacingControl: React.FC = () => {
  const { baseUnit, setBaseUnit } = useSpacingStore();

  const previewSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Base unit selector — pill group */}
      <div className="flex items-center gap-2">
        {[4, 8, 12].map((unit) => {
          const isActive = baseUnit === unit;
          return (
            <button
              key={unit}
              onClick={() => setBaseUnit(unit)}
              type="button"
              className={`flex-1 py-2 rounded-[9999px] text-xs font-medium border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#17191c] border-[#17191c] text-white'
                  : 'bg-white border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] hover:border-[#ececec]'
              }`}
            >
              {unit}px
            </button>
          );
        })}
      </div>

      {/* Multiplier scale — visual bar chart */}
      <div className="bg-white border border-[#f2f2f3] rounded-[20px] p-3 flex flex-col gap-1">
        {previewSteps.map((step) => {
          const calculated = step * baseUnit;
          const pct = Math.min(100, (calculated / 128) * 100);
          return (
            <div key={step} className="flex items-center gap-2 text-[11px]">
              <span className="w-6 text-right font-mono text-[#979799]">{step}x</span>
              <div className="flex-1 h-1.5 bg-[#f2f2f3] rounded-[9999px] overflow-hidden">
                <div
                  className="h-full bg-[#17191c] rounded-[9999px] transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono font-medium text-[#17191c]">{calculated}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SpacingControl;
