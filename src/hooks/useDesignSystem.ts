import { usePaletteStore } from '../store/paletteStore.ts';
import { useTypographyStore } from '../store/typographyStore.ts';
import { useSpacingStore } from '../store/spacingStore.ts';
import type { DesignSystemTokens } from '../types/designSystem.ts';

export function useDesignSystem(): DesignSystemTokens {
  const { colors, shadeScale } = usePaletteStore();
  const { headingFont, bodyFont, monoFont, typeScaleRatio, baseFontSize } = useTypographyStore();
  const { baseUnit, borderRadius, boxShadow } = useSpacingStore();

  return {
    colors,
    shadeScale,
    headingFont,
    bodyFont,
    monoFont,
    typeScaleRatio,
    baseFontSize,
    baseUnit,
    borderRadius,
    boxShadow,
  };
}
