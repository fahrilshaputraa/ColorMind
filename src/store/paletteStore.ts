import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Color, HarmonyMode } from '../types/palette.ts';
import { generateHarmony, hslToHex } from '../utils/color.ts';
import { generateShadeScale } from '../utils/shade.ts';

interface PaletteState {
  colors: Color[];
  harmonyMode: HarmonyMode;
  baseColor: string;
  shadeScale: Record<number, Record<string, string>>;
  preset: string | null;
  paperBg: string;
  history: { colors: Color[]; baseColor: string; shadeScale: Record<number, Record<string, string>> }[];
  future: { colors: Color[]; baseColor: string; shadeScale: Record<number, Record<string, string>> }[];

  // Actions
  setBaseColor: (hex: string) => void;
  generatePalette: () => void;
  toggleLockColor: (index: number) => void;
  updateColor: (index: number, hex: string) => void;
  setHarmonyMode: (mode: HarmonyMode) => void;
  loadPreset: (presetName: string, presetColors: string[]) => void;
  setPaperBg: (hex: string) => void;
  randomizeColors: () => void;
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  reset: () => void;
}

const defaultColors: Color[] = [
  { hex: '#3b82f6', locked: false },
  { hex: '#10b981', locked: false },
  { hex: '#f59e0b', locked: false },
  { hex: '#ef4444', locked: false },
  { hex: '#6366f1', locked: false },
];

const initialShades: Record<number, Record<string, string>> = {
  0: generateShadeScale('#3b82f6'),
  1: generateShadeScale('#10b981'),
  2: generateShadeScale('#f59e0b'),
  3: generateShadeScale('#ef4444'),
  4: generateShadeScale('#6366f1'),
};

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({
      colors: defaultColors,
      harmonyMode: 'analogous',
      baseColor: '#3b82f6',
      shadeScale: initialShades,
      preset: null,
      paperBg: '#ffffff',
      history: [],
      future: [],

      saveHistory: () => {
        const { colors, baseColor, shadeScale, history } = get();
        // Limit history to 20 items
        const newHistory = [...history, { colors: JSON.parse(JSON.stringify(colors)), baseColor, shadeScale }];
        if (newHistory.length > 20) {
          newHistory.shift();
        }
        set({ history: newHistory, future: [] });
      },

      setBaseColor: (hex) => {
        get().saveHistory();
        set({ baseColor: hex });
        get().generatePalette();
      },

      generatePalette: () => {
        get().saveHistory();
        const { baseColor, harmonyMode, colors } = get();
        const generated = generateHarmony(baseColor, harmonyMode);
        
        const newColors = colors.map((col, idx) => {
          if (col.locked) return col;
          return { hex: generated[idx] || col.hex, locked: false };
        });

        // Regenerate shades
        const newShades: Record<number, Record<string, string>> = {};
        newColors.forEach((col, idx) => {
          newShades[idx] = generateShadeScale(col.hex);
        });

        set({ colors: newColors, shadeScale: newShades, preset: null });
      },

      toggleLockColor: (index) => {
        const newColors = [...get().colors];
        if (newColors[index]) {
          newColors[index] = { ...newColors[index], locked: !newColors[index].locked };
          set({ colors: newColors });
        }
      },

      updateColor: (index, hex) => {
        get().saveHistory();
        const newColors = [...get().colors];
        if (newColors[index]) {
          newColors[index] = { ...newColors[index], hex };
          
          const newShades = { ...get().shadeScale };
          newShades[index] = generateShadeScale(hex);

          // If updating index 0, set as baseColor
          if (index === 0) {
            set({ colors: newColors, shadeScale: newShades, baseColor: hex, preset: null });
          } else {
            set({ colors: newColors, shadeScale: newShades, preset: null });
          }
        }
      },

      setHarmonyMode: (mode) => {
        get().saveHistory();
        set({ harmonyMode: mode });
        get().generatePalette();
      },

      loadPreset: (presetName, presetColors) => {
        get().saveHistory();
        const newColors = presetColors.map((hex, idx) => {
          const locked = get().colors[idx]?.locked || false;
          return { hex, locked };
        });

        const newShades: Record<number, Record<string, string>> = {};
        newColors.forEach((col, idx) => {
          newShades[idx] = generateShadeScale(col.hex);
        });

        set({
          colors: newColors,
          shadeScale: newShades,
          baseColor: presetColors[0],
          preset: presetName,
        });
      },

      setPaperBg: (hex) => set({ paperBg: hex }),

      randomizeColors: () => {
        get().saveHistory();
        const { colors } = get();

        // Pick a random hue family (0-359)
        const baseHue = Math.floor(Math.random() * 360);

        // Derived hues: nearby analogous + one contrasting accent
        const hue1 = (baseHue + 20) % 360;
        const hue2 = (baseHue - 15 + 360) % 360;
        const hue3 = (baseHue + 40) % 360;
        const accentHue = (baseHue + 170 + Math.floor(Math.random() * 20)) % 360;

        // Dark anchor (like #0f3e17): deep, saturated
        const darkHue = baseHue;
        const darkSat = 45 + Math.floor(Math.random() * 30); // 45-74
        const darkLig = 12 + Math.floor(Math.random() * 10); // 12-21

        // Light tints (like #e1f4df): high lightness, low-mid saturation
        const lightTints = [hue1, hue2, hue3, accentHue].map((h) => {
          const s = 20 + Math.floor(Math.random() * 35); // 20-54
          const l = 75 + Math.floor(Math.random() * 16); // 75-90
          return hslToHex(h, s, l);
        });

        const palette = [hslToHex(darkHue, darkSat, darkLig), ...lightTints];

        const newColors = colors.map((col, idx) => {
          if (col.locked) return col;
          return { hex: palette[idx] || col.hex, locked: false };
        });

        const newShades: Record<number, Record<string, string>> = {};
        newColors.forEach((col, idx) => {
          newShades[idx] = generateShadeScale(col.hex);
        });

        set({ baseColor: palette[0], colors: newColors, shadeScale: newShades, preset: null });
      },

      undo: () => {
        const { history, future, colors, baseColor, shadeScale } = get();
        if (history.length === 0) return;

        const previous = history[history.length - 1];
        const remainingHistory = history.slice(0, history.length - 1);

        set({
          colors: previous.colors,
          baseColor: previous.baseColor,
          shadeScale: previous.shadeScale,
          history: remainingHistory,
          future: [{ colors: JSON.parse(JSON.stringify(colors)), baseColor, shadeScale }, ...future],
        });
      },

      redo: () => {
        const { history, future, colors, baseColor, shadeScale } = get();
        if (future.length === 0) return;

        const next = future[0];
        const remainingFuture = future.slice(1);

        set({
          colors: next.colors,
          baseColor: next.baseColor,
          shadeScale: next.shadeScale,
          history: [...history, { colors: JSON.parse(JSON.stringify(colors)), baseColor, shadeScale }],
          future: remainingFuture,
        });
      },

      reset: () => {
        set({
          colors: defaultColors,
          harmonyMode: 'analogous',
          baseColor: '#3b82f6',
          shadeScale: initialShades,
          preset: null,
          paperBg: '#ffffff',
          history: [],
          future: [],
        });
      },
    }),
    {
      name: 'colorpallet-palette',
      partialize: (state) => ({
        colors: state.colors,
        harmonyMode: state.harmonyMode,
        baseColor: state.baseColor,
        shadeScale: state.shadeScale,
        preset: state.preset,
        paperBg: state.paperBg,
      }),
    }
  )
);
