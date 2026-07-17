import type { FontFamily } from '../types/font.ts';

export const BUNDLED_FONT_LIST: FontFamily[] = [
  // Sans-Serif
  { name: 'Inter', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'Roboto', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900], subsets: ['latin'] },
  { name: 'Open Sans', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'Montserrat', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Poppins', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Lato', category: 'sans-serif', weights: [100, 300, 400, 700, 900], subsets: ['latin'] },
  { name: 'Outfit', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Plus Jakarta Sans', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'DM Sans', category: 'sans-serif', weights: [300, 400, 500, 700, 800], subsets: ['latin'] },
  { name: 'Nunito', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Ubuntu', category: 'sans-serif', weights: [300, 400, 500, 700], subsets: ['latin'] },
  { name: 'Raleway', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Cabin', category: 'sans-serif', weights: [400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Quicksand', category: 'sans-serif', weights: [300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Rubik', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Heebo', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900], subsets: ['latin'] },
  { name: 'Karla', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'Work Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },

  // Serif
  { name: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900], subsets: ['latin'] },
  { name: 'Lora', category: 'serif', weights: [400, 500, 600, 700], subsets: ['latin'] },
  { name: 'PT Serif', category: 'serif', weights: [400, 700], subsets: ['latin'] },
  { name: 'Cinzel', category: 'serif', weights: [400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Cormorant Garamond', category: 'serif', weights: [300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Arvo', category: 'serif', weights: [400, 700], subsets: ['latin'] },
  { name: 'EB Garamond', category: 'serif', weights: [400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'Libre Baskerville', category: 'serif', weights: [400, 700], subsets: ['latin'] },
  { name: 'Noto Serif', category: 'serif', weights: [300, 400, 700], subsets: ['latin'] },
  { name: 'Crimson Text', category: 'serif', weights: [400, 600, 700], subsets: ['latin'] },
  { name: 'Cardo', category: 'serif', weights: [400, 700], subsets: ['latin'] },

  // Monospace
  { name: 'Fira Code', category: 'monospace', weights: [300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'JetBrains Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700, 800], subsets: ['latin'] },
  { name: 'Source Code Pro', category: 'monospace', weights: [200, 300, 400, 500, 600, 700, 900], subsets: ['latin'] },
  { name: 'Roboto Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Inconsolata', category: 'monospace', weights: [200, 300, 400, 500, 600, 700, 800, 900], subsets: ['latin'] },
  { name: 'Space Mono', category: 'monospace', weights: [400, 700], subsets: ['latin'] },
  { name: 'Ubuntu Mono', category: 'monospace', weights: [400, 700], subsets: ['latin'] },
  { name: 'Courier Prime', category: 'monospace', weights: [400, 700], subsets: ['latin'] },
  { name: 'Share Tech Mono', category: 'monospace', weights: [400], subsets: ['latin'] },

  // Display
  { name: 'Oswald', category: 'display', weights: [200, 300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Bebas Neue', category: 'display', weights: [400], subsets: ['latin'] },
  { name: 'Abril Fatface', category: 'display', weights: [400], subsets: ['latin'] },
  { name: 'Space Grotesk', category: 'display', weights: [300, 400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Cinzel Decorative', category: 'display', weights: [400, 700], subsets: ['latin'] },
  { name: 'Rubik Mono One', category: 'display', weights: [400], subsets: ['latin'] },
  { name: 'Playfair Display SC', category: 'display', weights: [400, 700, 900], subsets: ['latin'] },
  { name: 'Lobster', category: 'display', weights: [400], subsets: ['latin'] },
  { name: 'Syncopate', category: 'display', weights: [400, 700], subsets: ['latin'] },
  { name: 'Anton', category: 'display', weights: [400], subsets: ['latin'] },

  // Handwriting
  { name: 'Dancing Script', category: 'handwriting', weights: [400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Pacifico', category: 'handwriting', weights: [400], subsets: ['latin'] },
  { name: 'Caveat', category: 'handwriting', weights: [400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Shadows Into Light', category: 'handwriting', weights: [400], subsets: ['latin'] },
  { name: 'Sacramento', category: 'handwriting', weights: [400], subsets: ['latin'] },
  { name: 'Great Vibes', category: 'handwriting', weights: [400], subsets: ['latin'] },
  { name: 'Satisfy', category: 'handwriting', weights: [400], subsets: ['latin'] },
  { name: 'Amatic SC', category: 'handwriting', weights: [400, 700], subsets: ['latin'] },
  { name: 'Kalam', category: 'handwriting', weights: [300, 400, 700], subsets: ['latin'] },
  { name: 'Cookie', category: 'handwriting', weights: [400], subsets: ['latin'] }
];
