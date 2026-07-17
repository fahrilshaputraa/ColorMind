import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';
import { MoveHorizontal } from 'lucide-react';

export const SpacingControl: React.FC = () => {
  const { baseUnit, setBaseUnit } = useSpacingStore();

  const previewSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800/60 shadow-2xs text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
        <MoveHorizontal className="w-4 h-4 text-violet-500" />
        <span>Spacing Scale Config</span>
      </div>

      {/* Base Spacing Unit Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-350">
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
                className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 border-violet-600 text-white shadow-md'
                    : 'bg-white dark:bg-neutral-800 border-neutral-250 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {unit}px
              </button>
            );
          })}
        </div>
      </div>

      {/* Multipliers Output Preview */}
      <div className="flex flex-col gap-2.5 mt-3 border-t pt-3.5 border-neutral-100 dark:border-neutral-800/60">
        <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
          Calculated Spacing Multipliers
        </span>
        <div className="flex flex-col gap-2 mt-1">
          {previewSteps.map((step) => {
            const calculated = step * baseUnit;
            return (
              <div key={step} className="flex items-center justify-between text-xs border-b border-neutral-100 dark:border-neutral-850 pb-1.5 last:border-0 last:pb-0">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400">
                  Step {step} <span className="text-[10px] font-normal text-neutral-400">({step}x)</span>
                </span>
                
                {/* Horizontal bar representation of the spacing step */}
                <div className="flex-1 max-w-[100px] h-3 bg-neutral-150 dark:bg-neutral-800 rounded-sm mx-4 overflow-hidden relative">
                  <span
                    style={{ width: `${Math.min(100, (calculated / 128) * 100)}%` }}
                    className="h-full block bg-violet-500/30 dark:bg-violet-500/25 border-r border-violet-500/50"
                  ></span>
                </div>

                <span className="font-mono font-bold text-neutral-700 dark:text-neutral-350">
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
