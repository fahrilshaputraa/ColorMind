import React from 'react';
import { usePaletteStore } from '../../store/paletteStore';
import { toast } from 'react-hot-toast';

export const ShadeGenerator: React.FC = () => {
  const { colors, shadeScale } = usePaletteStore();

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast.success(`Copied: ${hex}`, {
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
    <div className="flex flex-col gap-2">
      {colors.map((color, colorIdx) => {
        const shades = shadeScale[colorIdx] || {};
        return (
          <div key={colorIdx} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-1">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color.hex }} />
              <span className="text-[10px] font-mono text-[#979799]">{color.hex}</span>
            </div>
            <div className="flex gap-px overflow-hidden rounded-[12px]">
              {shadeKeys.map((key) => {
                const hexVal = shades[key] || color.hex;
                return (
                  <button
                    key={key}
                    onClick={() => handleCopy(hexVal)}
                    type="button"
                    style={{ backgroundColor: hexVal }}
                    className="flex-1 h-7 cursor-pointer group relative transition-transform hover:scale-y-125"
                    title={`${key}: ${hexVal}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ color: parseInt(key) >= 500 ? '#ffffff' : '#17191c' }}
                    >
                      {key}
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
