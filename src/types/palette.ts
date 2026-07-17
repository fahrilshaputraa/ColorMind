export type HarmonyMode =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export interface Color {
  hex: string;
  locked: boolean;
}

export type ShadeScale = Record<string, string>; // e.g. { "50": "#f8fafc", "100": "#f1f5f9", ... }
