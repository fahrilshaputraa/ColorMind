# API Documentation
# ColorPallet

## Overview

ColorPallet adalah **100% frontend application**. Satu-satunya external API yang digunakan adalah **Google Fonts API** (read-only). Tidak ada backend API.

## Google Fonts API

### Endpoint: Font List

```
GET https://www.googleapis.com/webfonts/v1/webfonts
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | API Key dari Google Cloud Console |
| `sort` | string | No | Sort order: `popularity`, `alpha`, `style`, `trending` |

#### Response Schema

```typescript
interface GoogleFontsResponse {
  kind: string
  items: GoogleFontItem[]
}

interface GoogleFontItem {
  family: string
  variants: string[]         // ["400", "400italic", "700", "700italic"]
  subsets: string[]          // ["latin", "latin-ext", "vietnamese"]
  category: string           // "sans-serif" | "serif" | "monospace" | "display" | "handwriting"
  version: string
  lastModified: string       // ISO date
  popularity: number         // Sort by this for top 200+
  defSubset: string          // Default subset
  subsetToStyleMap: Record<string, string[]>
}

type FontCategory = 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting'
```

#### Example Request

```bash
curl "https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY&sort=popularity"
```

#### Example Response (truncated)

```json
{
  "kind": "webfonts#webfontList",
  "items": [
    {
      "family": "Roboto",
      "variants": ["100", "300", "regular", "500", "700", "900"],
      "subsets": ["latin", "latin-ext", "vietnamese"],
      "category": "sans-serif",
      "version": "v30",
      "lastModified": "2022-09-22",
      "popularity": 1
    },
    {
      "family": "Open Sans",
      "variants": ["300", "regular", "500", "600", "700", "800"],
      "subsets": ["latin", "latin-ext"],
      "category": "sans-serif",
      "version": "v34",
      "lastModified": "2022-09-22",
      "popularity": 2
    }
  ]
}
```

### Font CSS Loading

Untuk load font di browser, gunakan Google Fonts CSS API:

```
https://fonts.googleapis.com/css2?family=FONT_NAME:wght@WEIGHTS&display=swap
```

#### Example

```html
<!-- Single font with specific weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Multiple fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
```

### Dynamic Font Loading (JavaScript)

```typescript
function loadFont(family: string, weights: number[]): Promise<void> {
  const weightsParam = weights.join(';')
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weightsParam}&display=swap`

  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load font: ${family}`))
    document.head.appendChild(link)
  })
}
```

## Fallback Strategy

### Bundled Font List

Jika Google Fonts API tidak tersedia (network error, no API key, dll), app menggunakan **bundled static JSON** sebagai fallback:

```typescript
// src/constants/fontList.ts
const BUNDLED_FONT_LIST: FontFamily[] = [
  { name: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700], subsets: ['latin'] },
  { name: 'Roboto', category: 'sans-serif', weights: [400, 500, 700], subsets: ['latin'] },
  { name: 'Open Sans', category: 'sans-serif', weights: [400, 600, 700], subsets: ['latin'] },
  // ... 200+ fonts
]
```

### API Call Flow

```
App Init
    │
    ├── Has API key?
    │   ├── Yes → Fetch from Google Fonts API
    │   │         ├── Success → Cache response, use it
    │   │         └── Error → Use BUNDLED_FONT_LIST
    │   └── No → Use BUNDLED_FONT_LIST directly
    │
    └── TanStack Query caches result with staleTime: Infinity
```

## Local Storage API

Semua data user disimpan di Local Storage browser. Tidak ada remote storage.

### Storage Keys

| Key | Type | Description |
|-----|------|-------------|
| `colorpallet-palette` | JSON | Current palette state (colors, harmony, shades) |
| `colorpallet-typography` | JSON | Current typography state (fonts, scale, sizes) |
| `colorpallet-spacing` | JSON | Current spacing state (units, radius, shadows) |
| `colorpallet-ui` | JSON | UI preferences (theme, sidebar state, viewport) |
| `colorpallet-saved-palettes` | JSON[] | Array of saved palette snapshots |

### Storage Schema

```typescript
interface LocalStoragePalette {
  id: string                          // UUID
  name: string                        // User-given name
  colors: string[]                    // HEX colors
  shadeScale: Record<string, string[]>
  harmonyMode: HarmonyMode
  headingFont: string | null
  bodyFont: string | null
  typeScaleRatio: number
  baseUnit: number
  borderRadius: Record<string, number>
  createdAt: number                   // Timestamp
  updatedAt: number                   // Timestamp
}
```

### Auto-Save Behavior

```typescript
// Zustand persist middleware handles auto-save
const usePaletteStore = create<PaletteState>()(
  persist(
    (set) => ({ /* state + actions */ }),
    {
      name: 'colorpallet-palette',
      partialize: (state) => ({
        // Only persist relevant fields, exclude transient state
        colors: state.colors,
        lockedIndices: [...state.lockedIndices],
        harmonyMode: state.harmonyMode,
        baseColor: state.baseColor,
        shadeScale: state.shadeScale,
        preset: state.preset,
      }),
    }
  )
)
```

## Share URL Encoding

Palette dapat di-share via URL tanpa backend:

### Encoding Strategy

```typescript
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

interface ShareData {
  c: string[]           // colors (HEX)
  h: HarmonyMode        // harmony mode
  hf: string | null     // heading font
  bf: string | null     // body font
  r: number             // type scale ratio
  u: number             // base unit
}

function encodeShareUrl(data: ShareData): string {
  const json = JSON.stringify(data)
  const compressed = compressToEncodedURIComponent(json)
  return `${window.location.origin}?p=${compressed}`
}

function decodeShareUrl(searchParams: URLSearchParams): ShareData | null {
  const compressed = searchParams.get('p')
  if (!compressed) return null
  const json = decompressFromEncodedURIComponent(compressed)
  return JSON.parse(json)
}
```

### URL Format

```
https://colorpallet.app?p=compressed_data_here
```

### On Page Load

```typescript
// Check URL params first, then Local Storage, then defaults
function initializeState() {
  const urlData = decodeShareUrl(new URLSearchParams(window.location.search))
  if (urlData) {
    // Hydrate stores from URL params
    paletteStore.getState().loadFromShare(urlData)
    return
  }

  // Zustand persist middleware auto-hydrates from Local Storage
  // If no Local Storage data, stores use default values
}
```
