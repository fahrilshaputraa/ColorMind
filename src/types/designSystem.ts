import type { Color } from './palette';
import type { FontFamily } from './font';

export interface DesignSystemTokens {
  colors: Color[];
  shadeScale: Record<number, Record<string, string>>;
  headingFont: FontFamily | null;
  bodyFont: FontFamily | null;
  monoFont: FontFamily | null;
  typeScaleRatio: number;
  baseFontSize: number;
  baseUnit: number;
  borderRadius: Record<string, number>;
  customRadius: number;
  paperBg: string;
  boxShadow: Record<string, string>;
  setBorderRadius: (key: string, value: number) => void;
}
