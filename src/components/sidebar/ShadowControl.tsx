import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';
import { Layers } from 'lucide-react';

export const ShadowControl: React.FC = () => {
  const { boxShadow } = useSpacingStore();

  const shadowItems = [
    { name: 'none', label: 'None / Flat', val: boxShadow.none },
    { name: 'sm', label: 'Small shadow', val: boxShadow.sm },
    { name: 'md', label: 'Medium lift', val: boxShadow.md },
    { name: 'lg', label: 'Large depth', val: boxShadow.lg },
    { name: 'xl', label: 'Extra deep', val: boxShadow.xl },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800/60 shadow-2xs text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
        <Layers className="w-4 h-4 text-violet-500" />
        <span>Box Shadows depth</span>
      </div>

      <div className="flex flex-col gap-3">
        {shadowItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-150 dark:border-neutral-800/50"
          >
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {item.label}
              </span>
              <span className="text-[9px] font-semibold text-neutral-450 dark:text-neutral-500 font-mono mt-0.5">
                shadow-{item.name}
              </span>
            </div>

            {/* Preview Box showing shadow */}
            <div
              style={{
                boxShadow: item.val,
              }}
              className="w-10 h-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 rounded-lg flex-shrink-0"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShadowControl;
