export type FontCategory = 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';

export interface FontFamily {
  name: string;
  category: FontCategory;
  weights: number[];
  subsets: string[];
}

export interface GoogleFontItem {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  version: string;
  lastModified: string;
  popularity: number;
}
