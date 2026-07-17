import { hexToHsl, hslToHex } from './color';

export function generateShadeScale(hexColor: string): Record<string, string> {
  const { h, s, l } = hexToHsl(hexColor);
  const shades: Record<string, string> = {};

  const shadeConfigs: Record<string, { l: number; sFactor: number }> = {
    '50': { l: 97, sFactor: 0.3 },
    '100': { l: 94, sFactor: 0.45 },
    '200': { l: 86, sFactor: 0.65 },
    '300': { l: 76, sFactor: 0.85 },
    '400': { l: 62, sFactor: 0.95 },
    '500': { l: l, sFactor: 1.0 }, // Base color
    '600': { l: 42, sFactor: 1.05 },
    '700': { l: 30, sFactor: 1.1 },
    '800': { l: 20, sFactor: 1.15 },
    '900': { l: 12, sFactor: 1.2 },
    '950': { l: 7, sFactor: 1.25 },
  };

  Object.entries(shadeConfigs).forEach(([shade, config]) => {
    if (shade === '500') {
      shades[shade] = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
    } else {
      // Calculate adjusted saturation
      const adjustedS = Math.max(0, Math.min(100, Math.round(s * config.sFactor)));
      
      // Calculate adjusted lightness.
      // If base L is very dark/light, let's keep a standard curve but blend with base L
      let finalL = config.l;
      if (shade === '50' || shade === '100' || shade === '200' || shade === '300' || shade === '400') {
        // Light shades: blend between config.l and base L
        // Make sure it doesn't get darker than base L
        if (config.l <= l) {
          finalL = l + (100 - l) * ((config.l - l) / (100 - l));
        }
      } else {
        // Dark shades: blend between base L and config.l
        // Make sure it doesn't get lighter than base L
        if (config.l >= l) {
          finalL = l * (config.l / l);
        }
      }
      
      finalL = Math.max(2, Math.min(99, finalL));
      shades[shade] = hslToHex(h, adjustedS, finalL);
    }
  });

  return shades;
}
