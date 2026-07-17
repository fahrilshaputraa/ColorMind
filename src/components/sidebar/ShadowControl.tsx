import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

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
    <div className="flex flex-col gap-2 text-left">
      {shadowItems.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between p-2.5 rounded-[16px] bg-white border border-[#f2f2f3]"
        >
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-xs font-medium text-[#17191c]">
              {item.label}
            </span>
            <span className="text-[9px] font-mono text-[#979799]">
              shadow-{item.name}
            </span>
          </div>

          <div
            style={{
              boxShadow: item.val,
            }}
            className="w-9 h-9 bg-white border border-[#f2f2f3] rounded-[16px] flex-shrink-0"
          ></div>
        </div>
      ))}
    </div>
  );
};
export default ShadowControl;
