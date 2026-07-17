import React, { useRef } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { getContrastText } from '../../utils/contrast.ts';
import { CopyButton } from './CopyButton.tsx';

interface ColorSwatchProps {
  hex: string;
  locked: boolean;
  onToggleLock: () => void;
  onChangeHex: (hex: string) => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  hex,
  locked,
  onToggleLock,
  onChangeHex,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const textContrastColor = getContrastText(hex);

  return (
    <div className="flex items-center gap-2.5 p-2.5 bg-white border border-[#f2f2f3] rounded-[20px] transition-all hover:border-[#ececec]">
      {/* Color block — compact inline */}
      <div
        onClick={() => colorInputRef.current?.click()}
        style={{ backgroundColor: hex }}
        className="group relative w-10 h-10 rounded-[12px] cursor-pointer flex items-center justify-center transition-transform active:scale-[0.95] shrink-0"
      >
        <input
          ref={colorInputRef}
          type="color"
          value={hex}
          onChange={(e) => onChangeHex(e.target.value)}
          className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          type="button"
          style={{ color: textContrastColor }}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title={locked ? 'Unlock color' : 'Lock color'}
        >
          {locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Hex input + copy */}
      <div className="flex-1 flex items-center gap-1.5 min-w-0">
        <input
          type="text"
          value={hex}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(val) || val.length <= 7) {
              onChangeHex(val);
            }
          }}
          placeholder="#000000"
          className="flex-1 min-w-0 px-2 py-1.5 text-xs font-mono font-medium text-[#17191c] bg-[#fafafb] border border-[#f2f2f3] rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] text-center"
        />
        <CopyButton value={hex} showIconOnly={true} className="p-1.5 text-[#777b86] hover:bg-[#fafafb] rounded-[16px] border border-[#f2f2f3]" />
      </div>

      {/* Lock indicator when locked */}
      {locked && (
        <Lock className="w-3 h-3 text-[#979799] shrink-0" />
      )}
    </div>
  );
};
export default ColorSwatch;
