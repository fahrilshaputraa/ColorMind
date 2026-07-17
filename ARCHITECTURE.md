# Architecture Document
# ColorPallet

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (Client-Only)                   │
│                  No Backend Required                      │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Sidebar     │  │  Content     │  │   Export       │  │
│  │   (Controls)  │  │  (Preview)   │  │   (Modal)     │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                  │                   │          │
│  ┌──────┴──────────────────┴───────────────────┴───────┐ │
│  │          Zustand Stores (with Local Storage persist) │ │
│  │  paletteStore | typographyStore | spacingStore       │ │
│  │  uiStore (sidebar open, theme, viewport)             │ │
│  └──────────────────────┬──────────────────────────────┘ │
│                         │                                 │
│  ┌──────────────────────┴──────────────────────────────┐ │
│  │              TanStack Query Layer (Cache Only)        │ │
│  │  useFonts() | useFontDetails()                       │ │
│  │  (No mutations — all saves go to Local Storage)      │ │
│  └──────────┬───────────────────────────┬──────────────┘ │
│             │                           │                 │
│  ┌──────────┴──────────┐  ┌────────────┴──────────────┐ │
│  │   Query Cache        │  │   API Layer                │ │
│  │   (In-Memory)        │  │   fonts.ts (Google Fonts)  │ │
│  └──────────────────────┘  └────────────┬──────────────┘ │
│                                         │                 │
│  ┌──────────────────────────────────────┴──────────────┐ │
│  │              Local Storage (Persistent)               │ │
│  │  - Current palette, typography, spacing state        │ │
│  │  - Saved palettes history                            │ │
│  │  - UI preferences (theme, sidebar state)             │ │
│  │  - Auto-save on every change                         │ │
│  └──────────────────────────────────────────────────────┘ │
│                                         │                 │
└─────────────────────────────────────────┼─────────────────┘
                                          │
                                    ┌─────┴──────┐
                                    │  Google     │
                                    │  Fonts API  │
                                    │  (Read-only)│
                                    └─────────────┘
```

## 2. State Management Architecture

### 2.1 Zustand Stores (Client State)

State yang bersifat client-only dan tidak membutuhkan server sync dikelola oleh Zustand. Semua store menggunakan **persist middleware** untuk auto-save ke Local Storage.

#### `paletteStore`
```typescript
interface PaletteState {
  colors: Color[]                    // Array of 5 colors
  lockedIndices: Set<number>         // Locked color positions
  harmonyMode: HarmonyMode           // complementary | analogous | triadic | etc
  baseColor: string                  // HEX base color
  shadeScale: Record<string, string[]> // 50-950 shades per color
  preset: string | null              // Active preset name
  history: PaletteState[]            // Undo stack
  future: PaletteState[]             // Redo stack

  // Actions
  setBaseColor: (hex: string) => void
  generatePalette: () => void
  lockColor: (index: number) => void
  unlockColor: (index: number) => void
  updateColor: (index: number, hex: string) => void
  setHarmonyMode: (mode: HarmonyMode) => void
  generateShades: (color: string) => string[]
  loadPreset: (presetName: string) => void
  undo: () => void
  redo: () => void
}

// Zustand persist config — auto-save ke Local Storage
const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({ /* ... */ }),
    { name: 'colorpallet-palette' }
  )
)
```

#### `typographyStore`
```typescript
interface TypographyState {
  headingFont: FontFamily | null
  bodyFont: FontFamily | null
  monoFont: FontFamily | null
  typeScaleRatio: number             // 1.125 | 1.200 | 1.250 | etc
  baseFontSize: number               // 16px default
  customText: string                 // Preview text

  // Actions
  setHeadingFont: (font: FontFamily) => void
  setBodyFont: (font: FontFamily) => void
  setMonoFont: (font: FontFamily) => void
  setTypeScaleRatio: (ratio: number) => void
  setBaseFontSize: (size: number) => void
  setCustomText: (text: string) => void
}
```

#### `spacingStore`
```typescript
interface SpacingState {
  baseUnit: number                   // 4px | 8px default
  borderRadius: Record<string, number> // none | sm | md | lg | xl | 2xl | full
  customRadius: number
  boxShadow: Record<string, string>  // sm | md | lg | xl
  customShadow: string

  // Actions
  setBaseUnit: (unit: number) => void
  setBorderRadius: (key: string, value: number) => void
  setCustomRadius: (value: number) => void
  setBoxShadow: (key: string, value: string) => void
  setCustomShadow: (value: string) => void
}
```

#### `uiStore`
```typescript
interface UIState {
  sidebarOpen: boolean
  sidebarTab: SidebarTab             // colors | typography | spacing | tailwind
  theme: 'light' | 'dark'
  previewViewport: 'desktop' | 'tablet' | 'mobile'
  activeTemplate: TemplateCategory
  zoomLevel: number

  // Actions
  toggleSidebar: () => void
  setSidebarTab: (tab: SidebarTab) => void
  toggleTheme: () => void
  setPreviewViewport: (viewport: string) => void
  setActiveTemplate: (template: TemplateCategory) => void
  setZoomLevel: (level: number) => void
}
```

### 2.2 TanStack Query (Client-Side Caching Only)

TanStack Query digunakan **hanya untuk caching Google Fonts API response**. Tidak ada mutations, tidak ada backend calls. Semua data palette disimpan via Zustand persist ke Local Storage.

#### Query Keys Convention
```typescript
const queryKeys = {
  fonts: {
    all: ['fonts'] as const,
    list: (filters?: FontFilters) => ['fonts', 'list', filters] as const,
    detail: (family: string) => ['fonts', 'detail', family] as const,
  },
}
```

#### Query Configuration
```typescript
const fontListQuery = useQuery({
  queryKey: queryKeys.fonts.list({ sort: 'popularity' }),
  queryFn: () => fetchFonts({ sort: 'popularity' }),
  staleTime: Infinity,               // Font list rarely changes
  gcTime: 1000 * 60 * 60 * 24,      // Keep in cache for 24h
})

const fontDetailQuery = useQuery({
  queryKey: queryKeys.fonts.detail(family),
  queryFn: () => fetchFontDetail(family),
  staleTime: Infinity,
  enabled: !!family,                 // Only fetch when family is selected
})
```

> **Note**: Tidak ada `useMutation` karena tidak ada backend. Palette save/share dilakukan via Zustand + Local Storage + URL encoding.

## 3. Color Algorithm Architecture

### 3.1 Color Harmony Generation

```
Base Color (HSL)
    │
    ├── Complementary    → H+180
    ├── Analogous        → H-30, H-15, H+15, H+30
    ├── Triadic          → H+120, H+240
    ├── Split-Complementary → H+150, H+210
    ├── Tetradic         → H+90, H+180, H+270
    └── Monochromatic    → S variations, L variations
```

### 3.2 Shade Scale Generation (Tailwind 50-950)

```
Input: Base Color (HEX)
    │
    ├── Convert to HSL
    │
    ├── Generate 11 shades:
    │   50:  L=97, S=adjusted
    │   100: L=94, S=adjusted
    │   200: L=86, S=adjusted
    │   300: L=76, S=adjusted
    │   400: L=62, S=adjusted
    │   500: L=base, S=base          ← Original color
    │   600: L=40, S=adjusted
    │   700: L=30, S=adjusted
    │   800: L=22, S=adjusted
    │   900: L=14, S=adjusted
    │   950: L=8,  S=adjusted
    │
    └── Saturation curve: increase toward 500, decrease after 500
```

### 3.3 Contrast Calculation

```
Relative Luminance:
  L = 0.2126 * R' + 0.7152 * G' + 0.0722 * B'
  (where R', G', B' are linearized sRGB values)

Contrast Ratio:
  CR = (L1 + 0.05) / (L2 + 0.05)
  (L1 = lighter, L2 = darker)

WCAG Levels:
  AA Normal:   CR >= 4.5:1
  AA Large:    CR >= 3:1
  AAA Normal:  CR >= 7:1
  AAA Large:   CR >= 4.5:1
```

## 4. Google Fonts Integration Architecture

### 4.1 Font Loading Pipeline

```
1. App Init
   └── TanStack Query fetches font list from Google Fonts API
       └── Response cached with staleTime: Infinity
           └── Filter to top 200+ by popularity
               └── Store in query cache

2. User Selects Font
   └── Dynamic <link> injection
       └── https://fonts.googleapis.com/css2?family=FontName:wght@400;700&display=swap
           └── Font loads asynchronously
               └── Preview updates when font is ready

3. Font Preview (Browse Mode)
   └── Batch load visible fonts only (intersection observer)
       └── Load 20 fonts at a time (virtual scrolling)
           └── Unload fonts that scroll out of view
```

### 4.2 Font Data Flow

```typescript
// API Response → TanStack Query Cache → Component

interface GoogleFontResponse {
  items: GoogleFontItem[]
}

interface GoogleFontItem {
  family: string
  variants: string[]       // ["400", "700", "900"]
  subsets: string[]        // ["latin", "latin-ext"]
  category: string         // "sans-serif" | "serif" | "monospace" | "display" | "handwriting"
  version: string
  lastModified: string
  popularity: number       // Sort by this for top 200+
}

// Transformed to internal type
interface FontFamily {
  name: string
  category: FontCategory
  weights: number[]
  subsets: string[]
  previewUrl: string
  loadUrl: string
}
```

## 5. Component Architecture

### 5.1 Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  Header (Logo, Theme Toggle, Export Button)               │
├─────────────┬────────────────────────────────────────────┤
│             │                                             │
│  Sidebar    │  Content Area                               │
│  (280px)    │  (flex-1)                                   │
│             │                                             │
│  ┌───────┐  │  ┌─────────────────────────────────────┐   │
│  │ Tabs  │  │  │  Template Selector                   │   │
│  │ Color │  │  │  [Website] [Poster] [Card] [...]     │   │
│  │ Font  │  │  ├─────────────────────────────────────┤   │
│  │ Space │  │  │                                     │   │
│  │ Tailw │  │  │  Preview Area                       │   │
│  └───────┘  │  │  (Live rendered template with        │   │
│             │  │   current palette + typography)       │   │
│  ┌───────┐  │  │                                     │   │
│  │ Active│  │  │                                     │   │
│  │ Tab   │  │  │                                     │   │
│  │ Panel │  │  │                                     │   │
│  │       │  │  └─────────────────────────────────────┘   │
│  │       │  │                                             │
│  │       │  │  ┌─────────────────────────────────────┐   │
│  │       │  │  │  Tailwind Classes (Interactive)      │   │
│  │       │  │  │  bg-primary-500 | text-lg | rounded  │   │
│  └───────┘  │  └─────────────────────────────────────┘   │
│             │                                             │
├─────────────┴────────────────────────────────────────────┤
│  Footer (Keyboard Shortcuts, Version)                     │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Component Communication

```
Sidebar Controls
    │
    ├── onChange → Zustand Store (auto-persist to Local Storage) → Content Area re-renders
    │
    └── TanStack Query (read-only cache)
        └── useFonts() → FontSelector component

Content Area
    │
    ├── Reads from Zustand stores (palette, typography, spacing)
    ├── Passes design tokens to template components
    └── CopyButton reads current context → generates Tailwind class

Export Modal
    │
    ├── Reads all stores → generates export format
    └── html-to-image for screenshot export

Share URL
    │
    ├── Reads all stores → encode to URL search params / hash
    └── On page load → decode URL params → hydrate Zustand stores
```

## 6. Data Flow Diagrams

### 6.1 Palette Generation Flow

```
User clicks "Generate"
    │
    ▼
paletteStore.generatePalette()
    │
    ├── Get baseColor from store
    ├── Get harmonyMode from store
    ├── Get lockedIndices from store
    │
    ▼
color.generateHarmony(baseColor, harmonyMode)
    │
    ├── Convert baseColor to HSL
    ├── Calculate harmony offsets
    ├── Generate 5 colors
    ├── Preserve locked colors
    │
    ▼
Update paletteStore.colors
    │
    ▼
shade.generateShades() for each color
    │
    ▼
Update paletteStore.shadeScale
    │
    ▼
React re-renders:
    ├── Sidebar: new color swatches
    ├── Content: new preview colors
    └── Tailwind panel: new class list
```

### 6.2 Font Selection Flow

```
User searches font in FontSelector
    │
    ▼
TanStack Query cache hit?
    ├── Yes → Filter cached list → Display results
    └── No  → Fetch from API → Cache → Display
    │
    ▼
User clicks font
    │
    ▼
typographyStore.setHeadingFont(font)
    │
    ▼
Dynamic <link> injection:
    <link href="https://fonts.googleapis.com/css2?family=FontName:wght@400;700&display=swap" />
    │
    ▼
Font loads → Preview updates
```

### 6.3 Copy Tailwind Class Flow

```
User clicks color swatch in preview
    │
    ▼
CopyButton.onClick()
    │
    ├── Determine context (bg/text/border)
    ├── Map color to Tailwind class
    │   e.g., palette[2] → "bg-primary-500"
    │         shade 700  → "text-primary-700"
    │
    ▼
navigator.clipboard.writeText(className)
    │
    ▼
react-hot-toast: "Copied bg-primary-500!"
```

## 7. Performance Strategy

### 7.1 TanStack Query Optimization
- **Font list**: `staleTime: Infinity` — fetch once, cache forever
- **Font details**: `staleTime: Infinity` + `enabled: !!family` — only fetch when needed
- **Presets**: `staleTime: 1000 * 60 * 60` — 1 hour cache
- **Deduplication**: Multiple components requesting same query → single fetch

### 7.2 Font Loading Optimization
- **Virtual scrolling** for font list (only render visible fonts)
- **Intersection Observer** — load font CSS only when font card is visible
- **Batch loading** — group nearby fonts into single request
- **Font display: swap** — prevent invisible text during load

### 7.3 Render Optimization
- **React.memo** for template components (only re-render when design tokens change)
- **useMemo** for shade generation calculations
- **Debounced updates** — color picker changes debounced 16ms (1 frame)
- **CSS transitions** instead of JS animations for color changes

### 7.4 Bundle Optimization
- **Code splitting** — template components lazy loaded
- **Tree shaking** — only import used Framer Motion features
- **Font list** — curated 200+ list bundled as static JSON fallback (no API needed for initial load)

## 8. Error Handling

### 8.1 API Errors
```typescript
const fontListQuery = useQuery({
  queryKey: queryKeys.fonts.list(),
  queryFn: fetchFonts,
  retry: 3,
  staleTime: Infinity,
  // Fallback to bundled font list on error
  select: (data) => data ?? BUNDLED_FONT_LIST,
})
```

### 8.2 Font Loading Errors
- Timeout after 5s → show system font fallback
- Network error → show cached font or system font
- Invalid font name → skip and show error toast

### 8.3 Clipboard Errors
- Fallback to `document.execCommand('copy')` if `navigator.clipboard` unavailable
- Show error toast on copy failure

## 9. Security Considerations

- **No authentication** — tidak ada login/signup, langsung pakai
- Google Fonts API key bersifat public (browser-only API, restrict via HTTP referrer di Google Cloud Console)
- Atau gunakan bundled static JSON font list agar tidak perlu API key sama sekali
- Tidak ada sensitive data — semua data palette bersifat public dan tersimpan di Local Storage user
- CSP headers allow only Google Fonts domains
- Share URL encoding menggunakan base64/lz-string compress — tidak ada server-side storage
