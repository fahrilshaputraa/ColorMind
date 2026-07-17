import React, { useRef } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { getContrastText } from '../../utils/contrast';
import { CopyButton } from './CopyButton';

interface ColorSwatchProps {
  hex: string;
  locked: boolean;
  index: number;
  onToggleLock: () => void;
  onChangeHex: (hex: string) => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  hex,
  locked,
  index,
  onToggleLock,
  onChangeHex,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const textContrastColor = getContrastText(hex);

  const handleColorBlockClick = () => {
    colorInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Visual Color Block */}
      <div
        onClick={handleColorBlockClick}
        style={{ backgroundColor: hex }}
        className="group relative h-28 w-full rounded-lg cursor-pointer flex flex-col justify-between p-3 transition-transform duration-300 active:scale-98 shadow-inner"
      >
        {/* Hidden HTML Color Input */}
        <input
          ref={colorInputRef}
          type="color"
          value={hex}
          onChange={(e) => onChangeHex(e.target.value)}
          className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
        />

        {/* Lock/Unlock Badge */}
        <div className="flex justify-between items-center w-full">
          <span
            style={{ color: textContrastColor, backgroundColor: hex + '33' }}
            className="text-[10px] px-2 py-0.5 rounded-full font-bold backdrop-blur-xs select-none"
          >
            Color {index + 1}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock();
            }}
            type="button"
            style={{ color: textContrastColor }}
            className="p-1 rounded-md hover:bg-white/20 active:bg-white/35 transition-colors cursor-pointer"
            title={locked ? 'Unlock color' : 'Lock color'}
          >
            {locked ? (
              <Lock className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Unlock className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Dynamic Hover Indicator */}
        <span
          style={{ color: textContrastColor }}
          className="text-xs font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity select-none"
        >
          Click to pick color
        </span>
      </div>

      {/* Inputs and Actions */}
      <div className="flex items-center gap-1.5 mt-1">
        <input
          type="text"
          value={hex}
          onChange={(e) => {
            const val = e.target.value;
            // Allow typing, but only update store if it's a valid hex
            if (/^#[0-9A-F]{6}$/i.test(val) || val.length <= 7) {
              onChangeHex(val);
            }
          }}
          placeholder="#000000"
          className="flex-1 w-20 px-2 py-1 text-xs font-mono font-medium text-neutral-800 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-center"
        />
        <CopyButton value={hex} showIconOnly={true} className="p-1.5" />
      </div>
    </div>
  );
};
export default ColorSwatch;
