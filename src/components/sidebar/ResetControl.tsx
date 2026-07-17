import React, { useState } from 'react';
import { usePaletteStore } from '../../store/paletteStore';
import { useTypographyStore } from '../../store/typographyStore';
import { useSpacingStore } from '../../store/spacingStore';
import { RotateCcw, Palette, Type, Move } from 'lucide-react';

export const ResetControl: React.FC = () => {
  const [confirming, setConfirming] = useState<string | null>(null);

  const resetPalette = usePaletteStore((s) => s.reset);
  const resetTypography = useTypographyStore((s) => s.reset);
  const resetSpacing = useSpacingStore((s) => s.reset);

  const handleReset = (target: string, action: () => void) => {
    if (confirming === target) {
      action();
      setConfirming(null);
    } else {
      setConfirming(target);
      setTimeout(() => setConfirming(null), 2000);
    }
  };

  const resetAll = () => {
    if (confirming === 'all') {
      resetPalette();
      resetTypography();
      resetSpacing();
      setConfirming(null);
    } else {
      setConfirming('all');
      setTimeout(() => setConfirming(null), 2000);
    }
  };

  const items = [
    { id: 'all', label: 'Reset All', icon: RotateCcw, action: resetAll },
    { id: 'colors', label: 'Colors', icon: Palette, action: () => handleReset('colors', resetPalette) },
    { id: 'typography', label: 'Typography', icon: Type, action: () => handleReset('typography', resetTypography) },
    { id: 'spacing', label: 'Spacing', icon: Move, action: () => handleReset('spacing', resetSpacing) },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => {
        const Icon = item.icon;
        const isConfirming = confirming === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={item.action}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-[9999px] text-xs font-medium cursor-pointer transition-all border-none ${
              item.id === 'all'
                ? isConfirming
                  ? 'bg-[#17191c] text-white'
                  : 'bg-[#f2f2f3] text-[#17191c] hover:bg-[#ececec]'
                : isConfirming
                  ? 'bg-[#17191c] text-white'
                  : 'bg-transparent text-[#979799] hover:bg-[#f2f2f3] hover:text-[#17191c]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{isConfirming ? 'Confirm?' : item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
export default ResetControl;
