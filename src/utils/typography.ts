export const TYPE_SCALE_RATIOS = [
  { name: 'Minor Second', value: 1.067 },
  { name: 'Major Second', value: 1.125 },
  { name: 'Minor Third', value: 1.200 },
  { name: 'Major Third (Recommended)', value: 1.250 },
  { name: 'Perfect Fourth', value: 1.333 },
  { name: 'Augmented Fourth', value: 1.414 },
  { name: 'Perfect Fifth', value: 1.500 },
  { name: 'Golden Ratio', value: 1.618 },
];

export interface TypeScale {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export function generateTypeScale(baseSize: number, ratio: number): TypeScale {
  const sm = Math.round(baseSize / ratio);
  const xs = Math.round(sm / ratio);
  
  const lg = Math.round(baseSize * ratio);
  const xl = Math.round(lg * ratio);
  const xl2 = Math.round(xl * ratio);
  const xl3 = Math.round(xl2 * ratio);
  const xl4 = Math.round(xl3 * ratio);

  return {
    xs,
    sm,
    base: baseSize,
    lg,
    xl,
    '2xl': xl2,
    '3xl': xl3,
    '4xl': xl4,
  };
}
