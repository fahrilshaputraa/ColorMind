import type { GoogleFontItem, FontFamily } from '../types/font';
import { BUNDLED_FONT_LIST } from '../constants/fontList';

const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;

export async function fetchGoogleFonts(): Promise<FontFamily[]> {
  if (!API_KEY) {
    // No API key, fallback directly to bundled font list
    return BUNDLED_FONT_LIST;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Google Fonts');
    }

    const data = (await response.json()) as { items: GoogleFontItem[] };
    
    // Transform top 200 Google Fonts to internal structure
    return data.items.slice(0, 200).map((item) => {
      // Convert variants like ['100', '300', 'regular', 'italic', '700'] to numeric weights
      const weights = item.variants
        .map((v) => {
          if (v === 'regular' || v === 'italic') return 400;
          const parsed = parseInt(v, 10);
          return isNaN(parsed) ? null : parsed;
        })
        .filter((w): w is number => w !== null);

      const uniqueWeights = Array.from(new Set(weights)).sort((a, b) => a - b);

      return {
        name: item.family,
        category: (item.category as any) || 'sans-serif',
        weights: uniqueWeights.length > 0 ? uniqueWeights : [400],
        subsets: item.subsets,
      };
    });
  } catch (error) {
    console.warn('Google Fonts API failed, falling back to static fonts list:', error);
    return BUNDLED_FONT_LIST;
  }
}
