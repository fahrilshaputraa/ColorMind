import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpacingState {
  baseUnit: number; // 4 or 8 (in px)
  borderRadius: Record<string, number>; // in px
  customRadius: number;
  boxShadow: Record<string, string>;
  customShadow: string;

  // Actions
  setBaseUnit: (unit: number) => void;
  setBorderRadius: (key: string, value: number) => void;
  setCustomRadius: (value: number) => void;
  setBoxShadow: (key: string, value: string) => void;
  setCustomShadow: (value: string) => void;
  reset: () => void;
}

const defaultRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

const defaultShadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const useSpacingStore = create<SpacingState>()(
  persist(
    (set) => ({
      baseUnit: 8,
      borderRadius: defaultRadius,
      customRadius: 8,
      boxShadow: defaultShadows,
      customShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',

      setBaseUnit: (unit) => set({ baseUnit: unit }),
      setBorderRadius: (key, value) => 
        set((state) => ({ 
          borderRadius: { ...state.borderRadius, [key]: value } 
        })),
      setCustomRadius: (value) => 
        set((state) => ({ 
          customRadius: value,
          borderRadius: { ...state.borderRadius, custom: value }
        })),
      setBoxShadow: (key, value) => 
        set((state) => ({ 
          boxShadow: { ...state.boxShadow, [key]: value } 
        })),
      setCustomShadow: (value) => 
        set((state) => ({ 
          customShadow: value,
          boxShadow: { ...state.boxShadow, custom: value }
        })),

      reset: () => {
        set({
          baseUnit: 8,
          borderRadius: defaultRadius,
          customRadius: 8,
          boxShadow: defaultShadows,
          customShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        });
      },
    }),
    {
      name: 'colorpallet-spacing',
    }
  )
);
