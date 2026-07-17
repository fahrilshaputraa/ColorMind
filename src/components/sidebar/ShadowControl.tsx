import React from 'react';
import { useSpacingStore } from '../../store/spacingStore';

export const ShadowControl: React.FC = () => {
  const { boxShadow } = useSpacingStore();

  const shadowItems = [
    { name: 'none', label: 'None', val: boxShadow.none },
    { name: 'sm', label: 'SM', val: boxShadow.sm },
    { name: 'md', label: 'MD', val: boxShadow.md },
    { name: 'lg', label: 'LG', val: boxShadow.lg },
    { name: 'xl', label: 'XL', val: boxShadow.xl },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 text-left">
      {shadowItems.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-1.5 p-2 bg-white border border-[#f2f2f3] rounded-[16px]"
        >
          <div
            style={{ boxShadow: item.val }}
            className="w-8 h-8 bg-white border border-[#f2f2f3] rounded-[12px]"
          />
          <span className="text-[9px] font-medium text-[#17191c]">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
export default ShadowControl;
