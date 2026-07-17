import { useQuery } from '@tanstack/react-query';
import { fetchGoogleFonts } from '../api/fonts.ts';
import { BUNDLED_FONT_LIST } from '../constants/fontList.ts';
import type { FontFamily } from '../types/font.ts';

export function useFonts() {
  return useQuery<FontFamily[]>({
    queryKey: ['google-fonts'],
    queryFn: fetchGoogleFonts,
    staleTime: Infinity, // Caches forever during the session since fonts list is static
    initialData: BUNDLED_FONT_LIST, // Instantly loads standard list before API resolves
  });
}
