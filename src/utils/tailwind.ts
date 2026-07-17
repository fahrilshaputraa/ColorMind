import type { Color } from '../types/palette.ts';
import type { FontFamily } from '../types/font.ts';

interface ExportConfigData {
  colors: Color[];
  shadeScale: Record<number, Record<string, string>>;
  headingFont: FontFamily | null;
  bodyFont: FontFamily | null;
  monoFont: FontFamily | null;
  borderRadius: Record<string, number>;
  baseUnit: number;
}

export function generateTailwindJSConfig(data: ExportConfigData): string {
  const colorNames = ['primary', 'secondary', 'accent', 'neutral-dark', 'neutral-light'];
  
  const colorsConfig = colorNames.reduce((acc, name, idx) => {
    const shades = data.shadeScale[idx] || {};
    const shadeObjectString = Object.entries(shades)
      .map(([shade, hex]) => `          ${shade}: '${hex}',`)
      .join('\n');
      
    acc += `        ${name}: {\n${shadeObjectString}\n        },`;
    return acc;
  }, '');

  const spacingConfig = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64]
    .map((step) => `        ${step}: '${step * data.baseUnit}px',`)
    .join('\n');

  const radiusConfig = Object.entries(data.borderRadius)
    .filter(([key]) => key !== 'full' && key !== 'none')
    .map(([key, val]) => `        ${key}: '${val}px',`)
    .join('\n');

  return `module.exports = {
  theme: {
    extend: {
      colors: {
${colorsConfig}
      },
      fontFamily: {
        heading: ['${data.headingFont?.name || 'sans-serif'}', 'sans-serif'],
        body: ['${data.bodyFont?.name || 'sans-serif'}', 'sans-serif'],
        mono: ['${data.monoFont?.name || 'monospace'}', 'monospace'],
      },
      spacing: {
${spacingConfig}
      },
      borderRadius: {
${radiusConfig}
      }
    }
  }
};`;
}

export function generateTailwindCSSConfig(data: ExportConfigData): string {
  const colorNames = ['primary', 'secondary', 'accent', 'neutral-dark', 'neutral-light'];
  
  const colorsCSS = colorNames.reduce((acc, name, idx) => {
    const shades = data.shadeScale[idx] || {};
    const shadeCSS = Object.entries(shades)
      .map(([shade, hex]) => `  --color-${name}-${shade}: ${hex};`)
      .join('\n');
    acc += `${shadeCSS}\n`;
    return acc;
  }, '');

  const spacingCSS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64]
    .map((step) => `  --spacing-${step}: ${step * data.baseUnit}px;`)
    .join('\n');

  const radiusCSS = Object.entries(data.borderRadius)
    .filter(([key]) => key !== 'full' && key !== 'none')
    .map(([key, val]) => `  --radius-${key}: ${val}px;`)
    .join('\n');

  return `@theme {
  /* Colors */
${colorsCSS}
  /* Typography Fonts */
  --font-heading: "${data.headingFont?.name || 'sans-serif'}", sans-serif;
  --font-body: "${data.bodyFont?.name || 'sans-serif'}", sans-serif;
  --font-mono: "${data.monoFont?.name || 'monospace'}", monospace;

  /* Spacing Scale */
${spacingCSS}
  /* Border Radius */
${radiusCSS}
}`;
}

export function generateFigmaTokensConfig(data: ExportConfigData): string {
  const colorNames = ['primary', 'secondary', 'accent', 'neutral-dark', 'neutral-light'];
  
  const colorsToken = colorNames.reduce((acc, name, idx) => {
    const shades = data.shadeScale[idx] || {};
    const shadesJSON = Object.entries(shades)
      .map(([shade, hex]) => `      "${shade}": { "value": "${hex}", "$type": "color" }`)
      .join(',\n');
    
    acc[name] = JSON.parse(`{\n${shadesJSON}\n    }`);
    return acc;
  }, {} as Record<string, any>);

  const spacingToken = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64].reduce((acc, step) => {
    acc[step.toString()] = { value: `${step * data.baseUnit}px`, $type: 'dimension' };
    return acc;
  }, {} as Record<string, any>);

  const radiusToken = Object.entries(data.borderRadius).reduce((acc, [key, val]) => {
    acc[key] = { value: `${val}px`, $type: 'dimension' };
    return acc;
  }, {} as Record<string, any>);

  const tokens = {
    color: colorsToken,
    font: {
      heading: { value: data.headingFont?.name || 'sans-serif', $type: 'fontFamily' },
      body: { value: data.bodyFont?.name || 'sans-serif', $type: 'fontFamily' },
      mono: { value: data.monoFont?.name || 'monospace', $type: 'fontFamily' },
    },
    spacing: spacingToken,
    borderRadius: radiusToken,
  };

  return JSON.stringify(tokens, null, 2);
}
