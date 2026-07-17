# ColorPallet

Interactive Design System Generator — buat color palette, pilih typography, atur spacing & radius, dan copy Tailwind classes langsung dari preview.

## Features

- **Color Palette Generator** — generate palette berdasarkan color harmony (complementary, analogous, triadic, dll) + shade scale 50-950
- **Google Fonts 200+** — browse, search, dan preview 200+ Google Fonts langsung di app
- **Typography Scale** — generate type scale berdasarkan ratio populer
- **Interactive Tailwind Copy** — klik warna/font/spacing/radius → langsung copy Tailwind class
- **Template Preview** — preview palette di konteks Website, Poster, Card, Social Media, Mobile App, Email, Presentation
- **Export** — Tailwind config, CSS variables, SCSS, JSON, image
- **Accessibility** — WCAG contrast checker + color blind simulation
- **Dark/Light Mode** — toggle theme pada app dan preview

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Server State | TanStack Query |
| Client State | Zustand |
| Routing | React Router |
| Animation | Framer Motion |
| Font API | Google Fonts API |
| Export | html-to-image |

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Google Fonts API Key (untuk font list)

### Installation

```bash
git clone <repo-url>
cd color-pallet
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_GOOGLE_FONTS_API_KEY=your_api_key_here
```

Dapatkan API key dari [Google Cloud Console](https://console.cloud.google.com/) → Enable "Web Fonts Developer API".

### Development

```bash
npm run dev
```

Buka `http://localhost:5173`

### Build

```bash
npm run build
```

```bash
npm run preview
```

## Project Structure

```
color-pallet/
├── public/
├── src/
│   ├── api/                    # API layer (Google Fonts, etc.)
│   │   ├── fonts.ts            # Google Fonts API calls
│   │   └── presets.ts          # Palette presets data
│   ├── components/
│   │   ├── sidebar/            # Sidebar controls
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── PaletteGenerator.tsx
│   │   │   ├── ShadeGenerator.tsx
│   │   │   ├── FontSelector.tsx
│   │   │   ├── TypographyScale.tsx
│   │   │   ├── SpacingControl.tsx
│   │   │   ├── BorderRadiusControl.tsx
│   │   │   ├── ShadowControl.tsx
│   │   │   └── TailwindPreview.tsx
│   │   ├── content/            # Preview templates
│   │   │   ├── TemplateSelector.tsx
│   │   │   ├── templates/
│   │   │   │   ├── WebsiteTemplate.tsx
│   │   │   │   ├── PosterTemplate.tsx
│   │   │   │   ├── CardTemplate.tsx
│   │   │   │   ├── SocialMediaTemplate.tsx
│   │   │   │   ├── MobileAppTemplate.tsx
│   │   │   │   ├── EmailTemplate.tsx
│   │   │   │   └── PresentationTemplate.tsx
│   │   │   └── PreviewControls.tsx
│   │   ├── shared/             # Shared components
│   │   │   ├── CopyButton.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── FontPreview.tsx
│   │   │   ├── ContrastBadge.tsx
│   │   │   └── ExportModal.tsx
│   │   └── layout/
│   │       ├── AppLayout.tsx
│   │       ├── Sidebar.tsx
│   │       └── ContentArea.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── useFonts.ts         # TanStack Query hook for fonts
│   │   ├── usePalette.ts       # Palette state hook
│   │   ├── useDesignSystem.ts  # Combined design system hook
│   │   ├── useCopyToClipboard.ts
│   │   └── useExport.ts
│   ├── store/                  # Zustand stores
│   │   ├── paletteStore.ts
│   │   ├── typographyStore.ts
│   │   ├── spacingStore.ts
│   │   └── uiStore.ts
│   ├── utils/                  # Utility functions
│   │   ├── color.ts            # Color conversion & harmony algorithms
│   │   ├── shade.ts            # Shade generation
│   │   ├── typography.ts       # Type scale calculation
│   │   ├── tailwind.ts         # Tailwind class mapping
│   │   ├── export.ts           # Export format generators
│   │   ├── contrast.ts         # WCAG contrast calculation
│   │   └── colorBlind.ts       # Color blind simulation
│   ├── types/                  # TypeScript types
│   │   ├── palette.ts
│   │   ├── font.ts
│   │   ├── designSystem.ts
│   │   └── template.ts
│   ├── constants/              # Constants
│   │   ├── presets.ts          # Preset palettes
│   │   ├── fontList.ts         # Curated 200+ font list
│   │   └── typeScales.ts       # Type scale ratios
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── PRD.md
├── ARCHITECTURE.md
├── API.md
└── README.md
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Documentation

- [PRD.md](./PRD.md) — Product Requirements Document
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Technical Architecture
- [API.md](./API.md) — API Documentation (Google Fonts, etc.)

## License

MIT
