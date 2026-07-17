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
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  return (
    <div className="flex flex-col gap-4">
      {colors.map((color, colorIdx) => {
        const shades = shadeScale[colorIdx] || {};
        return (
          <div key={colorIdx} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-white dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800/60 shadow-2xs">
            {/* Swatch Label */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.hex }}></span>
                Color {colorIdx + 1}
              </span>
              <span className="text-[9px] font-semibold text-neutral-400 dark:text-neutral-500 font-mono">
                {color.hex}
              </span>
            </div>

            {/* Shades Horizontal Row */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-200">
              {shadeKeys.map((key) => {
                const hexVal = shades[key] || color.hex;
                return (
                  <button
                    key={key}
                    onClick={() => handleCopy(hexVal)}
                    type="button"
                    style={{ backgroundColor: hexVal }}
                    className="w-full h-8 min-w-[20px] rounded-sm transition-all duration-200 hover:scale-110 active:scale-95 shadow-inner cursor-pointer group relative"
                    title={`color${colorIdx + 1}-${key}: ${hexVal}`}
                  >
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-neutral-900 text-white text-[9px] font-bold py-1 px-1.5 rounded shadow-md whitespace-nowrap z-50 pointer-events-none select-none font-mono">
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
