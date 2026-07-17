import React from 'react';
import { usePaletteStore } from '../../store/paletteStore';
import { toast } from 'react-hot-toast';

export const ShadeGenerator: React.FC = () => {
  const { colors, shadeScale } = usePaletteStore();

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast.success(`Copied Hex: ${hex}`, {
        style: {
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
        },
      });
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  return (
    <div className="flex flex-col gap-3">
      {colors.map((color, colorIdx) => {
        const shades = shadeScale[colorIdx] || {};
        return (
          <div key={colorIdx} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-[#979799] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color.hex }}></span>
                Color {colorIdx + 1}
              </span>
              <span className="text-[9px] font-mono text-[#979799]">
                {color.hex}
              </span>
            </div>

            <div className="flex items-center gap-0.5 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-[#f2f2f3]">
              {shadeKeys.map((key) => {
                const hexVal = shades[key] || color.hex;
                return (
                  <button
                    key={key}
                    onClick={() => handleCopy(hexVal)}
                    type="button"
                    style={{ backgroundColor: hexVal }}
                    className="w-full h-6 min-w-[16px] rounded-sm transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group relative"
                    title={`color${colorIdx + 1}-${key}: ${hexVal}`}
                  >
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-[#17191c] text-white text-[8px] font-medium py-0.5 px-1 rounded-[9999px] whitespace-nowrap z-50 pointer-events-none select-none font-mono">
                      {key}: {hexVal}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ShadeGenerator;
