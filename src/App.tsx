import { useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { useTypographyStore } from './store/typographyStore.ts';
import { usePaletteStore } from './store/paletteStore.ts';
import { useSpacingStore } from './store/spacingStore.ts';
import { BUNDLED_FONT_LIST } from './constants/fontList.ts';
import { generateShadeScale } from './utils/shade.ts';

function App() {
  const { headingFont, bodyFont, monoFont } = useTypographyStore();

  // Load design tokens from URL params on initialization
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. Parse & Load Colors
    const colorsParam = params.get('colors');
    if (colorsParam) {
      const hexList = colorsParam.split(',');
      if (hexList.length === 5) {
        const newColors = hexList.map((hex) => ({
          hex: hex.startsWith('#') ? hex : `#${hex}`,
          locked: false,
        }));
        
        // Generate shadeScale for each loaded color
        const newShades: Record<number, Record<string, string>> = {};
        newColors.forEach((col, idx) => {
          newShades[idx] = generateShadeScale(col.hex);
        });
        
        usePaletteStore.setState({
          colors: newColors,
          shadeScale: newShades,
          baseColor: newColors[0].hex,
        });
      }
    }
    
    // 2. Parse & Load Fonts
    const hfontParam = params.get('hfont');
    if (hfontParam) {
      const match = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === hfontParam.toLowerCase());
      const fontObj = match || { name: hfontParam, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };
      useTypographyStore.setState({ headingFont: fontObj });
    }
    
    const bfontParam = params.get('bfont');
    if (bfontParam) {
      const match = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === bfontParam.toLowerCase());
      const fontObj = match || { name: bfontParam, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };
      useTypographyStore.setState({ bodyFont: fontObj });
    }

    const mfontParam = params.get('mfont');
    if (mfontParam) {
      const match = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === mfontParam.toLowerCase());
      const fontObj = match || { name: mfontParam, category: 'monospace', weights: [400], subsets: ['latin'] };
      useTypographyStore.setState({ monoFont: fontObj });
    }

    // 3. Parse & Load Spacing
    const baseUnitParam = params.get('baseunit');
    if (baseUnitParam) {
      const val = parseInt(baseUnitParam, 10);
      if (!isNaN(val)) useSpacingStore.setState({ baseUnit: val });
    }

    const radiusParam = params.get('radius');
    if (radiusParam) {
      const val = parseInt(radiusParam, 10);
      if (!isNaN(val)) {
        useSpacingStore.setState({
          customRadius: val,
          borderRadius: {
            none: 0,
            sm: 2,
            md: 4,
            lg: 8,
            xl: 12,
            '2xl': 16,
            full: 9999,
            custom: val,
          }
        });
      }
    }
  }, []);

  // Dynamic Google Font Loader
  useEffect(() => {
    const families: string[] = [];
    if (headingFont) families.push(headingFont.name);
    if (bodyFont) families.push(bodyFont.name);
    if (monoFont) families.push(monoFont.name);

    if (families.length === 0) return;

    // Build the query parameter string for Google Fonts v2 API
    const fontString = families
      .map((name) => `family=${name.replace(/ /g, '+')}:wght@300;400;500;700;900`)
      .join('&');

    const linkId = 'google-fonts-preview-styles';
    let linkElement = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = linkId;
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }

    linkElement.href = `https://fonts.googleapis.com/css2?${fontString}&display=swap`;
  }, [headingFont, bodyFont, monoFont]);

  return <AppLayout />;
}

export default App;
