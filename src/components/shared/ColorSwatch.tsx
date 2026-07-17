import React, { useRef } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { getContrastText } from '../../utils/contrast.ts';
import { CopyButton } from './CopyButton.tsx';

interface ColorSwatchProps {
  index?: number;
  hex: string;
  locked: boolean;
  onToggleLock: () => void;
  onChangeHex: (hex: string) => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  index: _index,
  hex,
  locked,
  onToggleLock,
  onChangeHex,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const textContrastColor = getContrastText(hex);

  return (
    <div className={`flex items-stretch gap-0 bg-white border rounded-[20px] overflow-hidden transition-all ${
      locked ? 'border-[#17191c]/20 opacity-80' : 'border-[#f2f2f3] hover:border-[#ececec]'
    }`}>
      {/* Color swatch — clickable to open picker */}
      <div
        onClick={() => colorInputRef.current?.click()}
        style={{ backgroundColor: hex }}
        className="group relative w-12 cursor-pointer flex items-center justify-center transition-transform active:scale-[0.95] shrink-0"
      >
        <input
          ref={colorInputRef}
          type="color"
          value={hex}
          onChange={(e) => onChangeHex(e.target.value)}
          className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
        />
        <span
          style={{ color: textContrastColor }}
          className="text-[9px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity select-none"
        >
          PICK
        </span>
      </div>

      {/* Right side: hex input + actions */}
      <div className="flex-1 flex items-center gap-1.5 px-2.5 py-2 min-w-0">
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
          className="flex-1 min-w-0 px-1.5 py-1 text-xs font-mono font-medium text-[#17191c] bg-transparent border-none focus:outline-none text-center"
        />

        <button
          onClick={onToggleLock}
          type="button"
          className={`p-1 rounded-[9999px] transition-all cursor-pointer shrink-0 ${
            locked
              ? 'bg-[#17191c] text-white'
              : 'text-[#979799] hover:text-[#17191c] hover:bg-[#f2f2f3]'
          }`}
          title={locked ? 'Unlock color' : 'Lock color'}
        >
          {locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
        </button>

        <CopyButton value={hex} showIconOnly={true} className="p-1 text-[#979799] hover:text-[#17191c] hover:bg-[#f2f2f3] rounded-[9999px] border-none" />
      </div>
    </div>
  );
};
export default ColorSwatch;
