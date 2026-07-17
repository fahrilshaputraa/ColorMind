import type { HarmonyMode } from '../types/palette';

// Convert Hex to HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Strip # if present
  let cleanHex = hex.replace(/^#/, '');
  
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to Hex
export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tempT = t;
      if (tempT < 0) tempT += 1;
      if (tempT > 1) tempT -= 1;
      if (tempT < 1 / 6) return p + (q - p) * 6 * tempT;
      if (tempT < 1 / 2) return q;
      if (tempT < 2 / 3) return p + (q - p) * (2 / 3 - tempT) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Adjust Hue to wrap around [0, 360]
const adjustHue = (hue: number, offset: number): number => {
  let h = (hue + offset) % 360;
  if (h < 0) h += 360;
  return h;
};

// Clamp Saturation and Lightness to [0, 100]
const clampValue = (val: number): number => {
  return Math.max(0, Math.min(100, val));
};

export function generateHarmony(baseHex: string, mode: HarmonyMode): string[] {
  const { h, s, l } = hexToHsl(baseHex);
  const colors: string[] = [];

  switch (mode) {
    case 'complementary':
      colors.push(
        hslToHex(h, s, l), // Base
        hslToHex(h, clampValue(s * 0.9), clampValue(l * 1.2)), // Base light
        hslToHex(h, clampValue(s * 0.8), clampValue(l * 0.7)), // Base dark
        hslToHex(adjustHue(h, 180), s, l), // Complement
        hslToHex(adjustHue(h, 180), clampValue(s * 0.9), clampValue(l * 1.2)) // Complement light
      );
      break;

    case 'analogous':
      colors.push(
        hslToHex(adjustHue(h, -30), s, l),
        hslToHex(adjustHue(h, -15), s, l),
        hslToHex(h, s, l), // Base
        hslToHex(adjustHue(h, 15), s, l),
        hslToHex(adjustHue(h, 30), s, l)
      );
      break;

    case 'triadic':
      colors.push(
        hslToHex(h, s, l), // Base
        hslToHex(adjustHue(h, 120), s, l),
        hslToHex(adjustHue(h, 240), s, l),
        hslToHex(h, clampValue(s * 0.9), clampValue(l * 1.2)), // Base light
        hslToHex(adjustHue(h, 120), clampValue(s * 0.9), clampValue(l * 0.8)) // Darker variant
      );
      break;

    case 'split-complementary':
      colors.push(
        hslToHex(h, s, l), // Base
        hslToHex(adjustHue(h, -30), s, l),
        hslToHex(adjustHue(h, 30), s, l),
        hslToHex(adjustHue(h, 150), s, l),
        hslToHex(adjustHue(h, 210), s, l)
      );
      break;

    case 'tetradic':
      colors.push(
        hslToHex(h, s, l), // Base
        hslToHex(adjustHue(h, 90), s, l),
        hslToHex(adjustHue(h, 180), s, l),
        hslToHex(adjustHue(h, 270), s, l),
        hslToHex(h, clampValue(s * 0.8), clampValue(l * 0.8)) // Muted variant
      );
      break;

    case 'monochromatic':
      colors.push(
        hslToHex(h, s, clampValue(l * 0.4)),
        hslToHex(h, s, clampValue(l * 0.7)),
        hslToHex(h, s, l), // Base
        hslToHex(h, clampValue(s * 0.9), clampValue(l * 1.2)),
        hslToHex(h, clampValue(s * 0.8), clampValue(l * 1.4))
      );
      break;

    default:
      // Fallback
      colors.push(
        baseHex,
        baseHex,
        baseHex,
        baseHex,
        baseHex
      );
  }

  return colors;
}
