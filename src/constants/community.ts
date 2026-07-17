export interface CommunityPreset {
  id: string;
  name: string;
  colors: string[];
  headingFont: string;
  bodyFont: string;
  baseUnit: number;
  radius: number;
  tags: string[];
}

export const COMMUNITY_PRESETS: CommunityPreset[] = [
  {
    id: 'nordic-sky',
    name: 'Nordic Sky Workspace',
    colors: ['#2e3440', '#3b4252', '#88c0d0', '#8fbcbb', '#eceff4'],
    headingFont: 'Outfit',
    bodyFont: 'Inter',
    baseUnit: 8,
    radius: 12,
    tags: ['Minimalist', 'Cool tones', 'Modern'],
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Neon Nights',
    colors: ['#0d0e15', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'],
    headingFont: 'Orbitron',
    bodyFont: 'Space Grotesk',
    baseUnit: 6,
    radius: 4,
    tags: ['Cyberpunk', 'High contrast', 'Neon'],
  },
  {
    id: 'retro-cream',
    name: 'Retro Editorial Cream',
    colors: ['#fdf6e2', '#7c2d12', '#b45309', '#d97706', '#1c1917'],
    headingFont: 'Playfair Display',
    bodyFont: 'Lora',
    baseUnit: 8,
    radius: 0,
    tags: ['Retro', 'Warm tones', 'Elegant'],
  },
  {
    id: 'modern-saas',
    name: 'Modern SaaS Dashboard',
    colors: ['#4f46e5', '#06b6d4', '#10b981', '#111827', '#f9fafb'],
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    baseUnit: 8,
    radius: 12,
    tags: ['SaaS', 'Corporate', 'Professional'],
  },
  {
    id: 'dracula-dark',
    name: 'Dracula Pro Dark Mode',
    colors: ['#282a36', '#ff79c6', '#bd93f9', '#50fa7b', '#f8f8f2'],
    headingFont: 'Fira Code',
    bodyFont: 'JetBrains Mono',
    baseUnit: 8,
    radius: 8,
    tags: ['Dark Mode', 'Developer', 'Cyberpunk'],
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Beach Portfolio',
    colors: ['#fff7ed', '#ea580c', '#f97316', '#fbbf24', '#431407'],
    headingFont: 'Cabinet Grotesk',
    bodyFont: 'Satoshi',
    baseUnit: 8,
    radius: 16,
    tags: ['Warm tones', 'Creative', 'Modern'],
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh E-commerce',
    colors: ['#f0fdf4', '#059669', '#10b981', '#34d399', '#064e3b'],
    headingFont: 'Clash Display',
    bodyFont: 'Satoshi',
    baseUnit: 8,
    radius: 20,
    tags: ['SaaS', 'Fresh', 'Clean'],
  },
  {
    id: 'crimson-bold',
    name: 'Crimson Bold Studio',
    colors: ['#1c1917', '#dc2626', '#ef4444', '#f87171', '#fafaf9'],
    headingFont: 'Syne',
    bodyFont: 'Work Sans',
    baseUnit: 8,
    radius: 8,
    tags: ['High contrast', 'Creative', 'Bold'],
  },
  {
    id: 'ease-health',
    name: 'Ease Health — Botanical Greenhouse',
    colors: ['#0f3e17', '#e1f4df', '#b6ced5', '#b1dbb8', '#cfe7d3'],
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    baseUnit: 8,
    radius: 14,
    tags: ['Healthcare', 'Botanical', 'Serif', 'Light'],
  },
];
