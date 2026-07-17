import { generateHarmony } from './color.ts';

// Deterministic string hash function
function getStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generatePaletteFromPrompt(prompt: string): string[] {
  const cleanPrompt = prompt.toLowerCase().trim();

  // 1. Neon/Cyberpunk keywords
  if (cleanPrompt.includes('neon') || cleanPrompt.includes('cyberpunk') || cleanPrompt.includes('futuristic')) {
    return ['#0d0e15', '#ec4899', '#06b6d4', '#a855f7', '#10b981'];
  }

  // 2. Pastel/Soft keywords
  if (cleanPrompt.includes('pastel') || cleanPrompt.includes('soft') || cleanPrompt.includes('cute') || cleanPrompt.includes('vintage cream')) {
    return ['#fef2f2', '#fecdd3', '#fde047', '#bfdbfe', '#e9d5ff'];
  }

  // 3. Nature/Organic keywords
  if (cleanPrompt.includes('nature') || cleanPrompt.includes('forest') || cleanPrompt.includes('earth') || cleanPrompt.includes('eco') || cleanPrompt.includes('green')) {
    return ['#f4fbf7', '#15803d', '#16a34a', '#ca8a04', '#451a03'];
  }

  // 4. Corporate/Fintech/SaaS keywords
  if (cleanPrompt.includes('corporate') || cleanPrompt.includes('fintech') || cleanPrompt.includes('saas') || cleanPrompt.includes('professional') || cleanPrompt.includes('business')) {
    return ['#0f172a', '#3b82f6', '#10b981', '#64748b', '#f8fafc'];
  }

  // 5. Sunset/Warm/Autumn keywords
  if (cleanPrompt.includes('sunset') || cleanPrompt.includes('warm') || cleanPrompt.includes('autumn') || cleanPrompt.includes('cozy') || cleanPrompt.includes('orange')) {
    return ['#fff7ed', '#ea580c', '#f97316', '#fbbf24', '#450a0a'];
  }

  // 6. Vintage/Retro keywords
  if (cleanPrompt.includes('vintage') || cleanPrompt.includes('retro') || cleanPrompt.includes('classic') || cleanPrompt.includes('coffee')) {
    return ['#fdf6e2', '#7c2d12', '#b45309', '#a1a1aa', '#18181b'];
  }

  // 7. General fallback: deterministic generator using string hashing
  const hash = getStringHash(cleanPrompt);
  const baseHue = hash % 360;
  
  // Select a harmony mode based on hash value
  const modes = ['analogous', 'triadic', 'split-complementary', 'complementary', 'monochromatic'] as const;
  const modeIdx = hash % modes.length;
  const mode = modes[modeIdx];

  // Convert base HSL to Hex string
  const baseHex = hslToHex(baseHue, 75, 50);

  // Generate HSL colors using harmony logic
  return generateHarmony(baseHex, mode);
}
