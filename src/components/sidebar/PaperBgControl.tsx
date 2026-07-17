import React, { useRef } from 'react';
import { usePaletteStore } from '../../store/paletteStore';
import { getContrastText } from '../../utils/contrast.ts';

export const PaperBgControl: React.FC = () => {
  const { paperBg, setPaperBg } = usePaletteStore();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const textContrast = getContrastText(paperBg);

  const presets = [
    { label: 'White', hex: '#ffffff' },
    { label: 'Snow', hex: '#fafafb' },
    { label: 'Mist', hex: '#f2f2f3' },
    { label: 'Warm', hex: '#fefcf9' },
    { label: 'Cream', hex: '#fdf8f0' },
    { label: 'Linen', hex: '#faf5ef' },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {/* Main color swatch */}
      <div className="flex items-stretch gap-0 bg-white border border-[#f2f2f3] hover:border-[#ececec] rounded-[20px] overflow-hidden transition-all">
        <div
          onClick={() => colorInputRef.current?.click()}
          style={{ backgroundColor: paperBg }}
          className="group relative w-12 cursor-pointer flex items-center justify-center transition-transform active:scale-[0.95] shrink-0"
        >
          <input
            ref={colorInputRef}
            type="color"
            value={paperBg}
            onChange={(e) => setPaperBg(e.target.value)}
            className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
          />
          <span
            style={{ color: textContrast }}
            className="text-[9px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity select-none"
          >
            PICK
          </span>
        </div>
        <div className="flex-1 flex items-center px-2.5 py-2 min-w-0">
          <input
            type="text"
            value={paperBg}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-F]{6}$/i.test(val) || val.length <= 7) {
                setPaperBg(val);
              }
            }}
            placeholder="#ffffff"
            className="flex-1 min-w-0 px-1.5 py-1 text-xs font-mono font-medium text-[#17191c] bg-transparent border-none focus:outline-none text-center"
          />
        </div>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            onClick={() => setPaperBg(preset.hex)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-[9999px] text-[10px] font-medium cursor-pointer transition-all border ${
              paperBg === preset.hex
                ? 'bg-[#17191c] border-[#17191c] text-white'
                : 'bg-white border-[#f2f2f3] text-[#777b86] hover:border-[#ececec] hover:text-[#17191c]'
            }`}
          >
            <span
              style={{ backgroundColor: preset.hex }}
              className="w-2.5 h-2.5 rounded-full border border-[#ececec] shrink-0"
            ></span>
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PaperBgControl;
