import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FontFamily } from '../types/font.ts';

interface TypographyState {
  headingFont: FontFamily | null;
  bodyFont: FontFamily | null;
  monoFont: FontFamily | null;
  typeScaleRatio: number;
  baseFontSize: number;
  customText: string;

  // Actions
  setHeadingFont: (font: FontFamily | null) => void;
  setBodyFont: (font: FontFamily | null) => void;
  setMonoFont: (font: FontFamily | null) => void;
  setTypeScaleRatio: (ratio: number) => void;
  setBaseFontSize: (size: number) => void;
  setCustomText: (text: string) => void;
  reset: () => void;
}

const defaultHeadingFont: FontFamily = {
  name: 'Inter',
  category: 'sans-serif',
  weights: [400, 700],
  subsets: ['latin'],
};

const defaultBodyFont: FontFamily = {
  name: 'Roboto',
  category: 'sans-serif',
  weights: [400, 700],
  subsets: ['latin'],
};

const defaultMonoFont: FontFamily = {
  name: 'Fira Code',
  category: 'monospace',
  weights: [400, 700],
  subsets: ['latin'],
};

export const useTypographyStore = create<TypographyState>()(
  persist(
    (set) => ({
      headingFont: defaultHeadingFont,
      bodyFont: defaultBodyFont,
      monoFont: defaultMonoFont,
      typeScaleRatio: 1.250, // Major Third
      baseFontSize: 16,
      customText: 'Interactive Design System Generator — buat color palette, pilih typography, atur spacing & radius, dan copy Tailwind classes langsung dari preview.',

      setHeadingFont: (font) => set({ headingFont: font }),
      setBodyFont: (font) => set({ bodyFont: font }),
      setMonoFont: (font) => set({ monoFont: font }),
      setTypeScaleRatio: (ratio) => set({ typeScaleRatio: ratio }),
      setBaseFontSize: (size) => set({ baseFontSize: size }),
      setCustomText: (text) => set({ customText: text }),

      reset: () => {
        set({
          headingFont: defaultHeadingFont,
          bodyFont: defaultBodyFont,
          monoFont: defaultMonoFont,
          typeScaleRatio: 1.250,
          baseFontSize: 16,
          customText: 'Interactive Design System Generator — buat color palette, pilih typography, atur spacing & radius, dan copy Tailwind classes langsung dari preview.',
        });
      },
    }),
    {
      name: 'colorpallet-typography',
    }
  )
);
