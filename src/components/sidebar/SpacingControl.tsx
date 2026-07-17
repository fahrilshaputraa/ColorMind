import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

export const SpacingControl: React.FC = () => {
  const { baseUnit, setBaseUnit } = useSpacingStore();

  const previewSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-[#17191c]">
          Base Spacing Unit
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[4, 8, 12].map((unit) => {
            const isActive = baseUnit === unit;
            return (
              <button
                key={unit}
                onClick={() => setBaseUnit(unit)}
                type="button"
                className={`py-2 rounded-[9999px] text-xs font-medium border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#17191c] border-[#17191c] text-white'
                    : 'bg-white border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb]'
                }`}
              >
                {unit}px
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase font-medium text-[#979799] tracking-wider">
          Multipliers
        </span>
        <div className="flex flex-col gap-1.5">
          {previewSteps.map((step) => {
            const calculated = step * baseUnit;
            return (
              <div key={step} className="flex items-center justify-between text-xs py-1">
                <span className="font-medium text-[#979799]">
                  {step}x
                </span>

                <div className="flex-1 max-w-[80px] h-2 bg-[#f2f2f3] rounded-sm mx-3 overflow-hidden">
                  <span
                    style={{ width: `${Math.min(100, (calculated / 128) * 100)}%` }}
                    className="h-full block bg-[#17191c]/15 border-r border-[#17191c]/30"
                  ></span>
                </div>

                <span className="font-mono font-medium text-[#17191c] text-[11px]">
                  {calculated}px
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SpacingControl;
