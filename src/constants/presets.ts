export interface PalettePreset {
  name: string;
  colors: string[]; // 5 hex colors
}

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    name: 'Tailwind Default',
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'],
  },
  {
    name: 'Nord Ice',
    colors: ['#5e81ac', '#81a1c1', '#88c0d0', '#8fbcbb', '#bf616a'],
  },
  {
    name: 'Dracula Theme',
    colors: ['#bd93f9', '#8be9fd', '#50fa7b', '#ff79c6', '#ffb86c'],
  },
  {
    name: 'Material Ocean',
    colors: ['#009688', '#00bcd4', '#3f51b5', '#e91e63', '#9c27b0'],
  },
  {
    name: 'Sunset Glow',
    colors: ['#ff5e62', '#ff9966', '#ffe066', '#ff80bf', '#9900ff'],
  },
  {
    name: 'Retro Classic',
    colors: ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'],
  },
  {
    name: 'Forest Breeze',
    colors: ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#264653'],
  },
];
