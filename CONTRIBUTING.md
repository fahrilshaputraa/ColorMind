# Contributing to ColorPallet

Terima kasih sudah tertarik untuk berkontribusi!

## Quick Start

```bash
git clone <repo-url>
cd color-pallet
npm install
npm run dev
```

## Development Workflow

1. Buat branch baru dari `main`: `git checkout -b feature/nama-feature`
2. Kerjakan perubahan
3. Pastikan lint dan typecheck pass: `npm run lint && npm run typecheck`
4. Commit dengan conventional commit format
5. Push dan buat Pull Request

## Commit Convention

```
feat: add shade generator
fix: fix color harmony algorithm for triadic mode
docs: update API documentation
refactor: extract color utils to separate module
style: format sidebar components
chore: update dependencies
```

## Project Architecture

- **100% Frontend** — tidak ada backend, semua data di Local Storage
- **Zustand** untuk state management + auto-persist ke Local Storage
- **TanStack Query** hanya untuk caching Google Fonts API response
- **Tailwind CSS** untuk styling
- Baca [ARCHITECTURE.md](./ARCHITECTURE.md) untuk detail

## Code Style

- TypeScript strict mode
- No `any` types
- Functional components dengan hooks
- Zustand stores di `src/store/`
- Utils pure functions di `src/utils/`
- API layer di `src/api/`
- Shared components di `src/components/shared/`

## Adding New Templates

1. Buat file di `src/components/content/templates/NamaTemplate.tsx`
2. Implementasikan `TemplateComponent` interface:

```typescript
interface TemplateProps {
  palette: PaletteState
  typography: TypographyState
  spacing: SpacingState
  customText: string
  theme: 'light' | 'dark'
}

export function NamaTemplate({ palette, typography, spacing, customText, theme }: TemplateProps) {
  // Render template menggunakan design tokens dari props
}
```

3. Daftarkan di `TemplateSelector.tsx`
4. Tambahkan ke `TemplateCategory` type di `src/types/template.ts`

## Adding New Export Formats

1. Buat generator function di `src/utils/export.ts`
2. Tambahkan format ke `ExportModal.tsx`
3. Update `ExportFormat` type

## Adding New Color Harmony Modes

1. Implementasikan algorithm di `src/utils/color.ts`
2. Tambahkan ke `HarmonyMode` type di `src/types/palette.ts`
3. Update `PaletteGenerator.tsx` UI

## Testing

```bash
npm run test
```

## Build

```bash
npm run build
```

## Questions?

Buka issue di GitHub repository.
