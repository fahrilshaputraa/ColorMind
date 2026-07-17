# Product Requirements Document (PRD)
# ColorPallet — Interactive Design System Generator

## 1. Overview

**ColorPallet** adalah web application **100% frontend** yang memungkinkan user untuk membuat, mengkustomisasi, dan mengekspor color palette, typography system, dan design tokens secara interaktif. **Tidak perlu login, tidak perlu signup, tidak ada backend** — user langsung bisa mulai mengedit saat membuka website. Website ini ditujukan untuk designer, developer, dan siapa saja yang kesulitan menentukan warna, font, ukuran, dan styling untuk project mereka.

## 2. Problem Statement

- Banyak developer/designer pemula bingung memilih kombinasi warna yang harmonis
- Sulit memvisualisasikan color palette dalam konteks nyata (website, poster, card, dll)
- Tidak ada tool yang menggabungkan color palette + typography + spacing + border-radius dalam satu tempat
- Proses copy-paste design tokens (Tailwind classes, CSS variables) manual dan error-prone
- Memilih font dari Google Fonts membutuhkan banyak tab dan trial-error

## 3. Target Users

| Persona | Kebutuhan |
|---------|-----------|
| Frontend Developer | Copy Tailwind classes, CSS variables, design tokens siap pakai |
| UI/UX Designer | Visualisasi palette di berbagai konteks, eksplorasi font |
| Indie Maker | Quick design system untuk MVP tanpa hire designer |
| Content Creator | Palette untuk poster, thumbnail, social media |
| Pemula | Template & preset palette untuk mulai cepat |

## 4. Core Features

### 4.1 Sidebar — Design Control Panel

Sidebar di sisi kiri yang berisi semua kontrol untuk mengatur design system:

#### 4.1.1 Color Palette Generator
- **Generate palette** berdasarkan base color dengan algoritma harmoni (complementary, analogous, triadic, split-complementary, monochromatic, tetradic)
- **Manual color picker** untuk setiap swatch (HEX, RGB, HSL input)
- **Shade generator** — otomatis generate 50-950 shade scale dari satu warna (seperti Tailwind color scale)
- **Lock individual colors** agar tidak berubah saat re-generate
- **Preset palettes** — koleksi palette populer (Material, Tailwind default, Nord, Dracula, dll)
- **Export format**: Tailwind config, CSS variables, SCSS variables, JSON

#### 4.1.2 Typography Control
- **Google Fonts browser** — list 200+ font dari Google Fonts dengan preview
- **Search & filter** font by category (serif, sans-serif, monospace, display, handwriting)
- **Font pairing suggestions** — rekomendasi heading + body font combination
- **Font size scale** — generate type scale berdasarkan ratio (1.125, 1.200, 1.250, 1.333, 1.5, major third, perfect fourth, dll)
- **Line height & letter spacing** control per level
- **Live preview** dengan custom text input

#### 4.1.3 Spacing & Layout
- **Spacing scale** generator (base unit + multiplier)
- **Border radius** control (none, sm, md, lg, xl, 2xl, full + custom)
- **Box shadow** generator (sm, md, lg, xl + custom)
- **Opacity** scale

#### 4.1.4 Tailwind Config Preview
- **Real-time Tailwind config** output yang bisa di-copy
- **Interactive Tailwind classes** — klik class untuk copy ke clipboard
- **Custom theme extension** preview

### 4.2 Content Area — Preview & Templates

Area konten di sisi kanan yang menampilkan preview palette dalam berbagai konteks:

#### 4.2.1 Template Categories
| Template | Deskripsi |
|----------|-----------|
| **Website** | Landing page, dashboard, blog, portfolio, e-commerce |
| **Poster** | Event poster, announcement, quote poster |
| **Card** | Profile card, product card, pricing card, stats card |
| **Social Media** | Instagram post, Twitter header, YouTube thumbnail |
| **Mobile App** | Login screen, feed, profile, settings |
| **Email** | Newsletter, transactional email, promotional |
| **Presentation** | Slide template, title slide, content slide |

#### 4.2.2 Interactive Preview
- **Live update** — setiap perubahan di sidebar langsung ter-refleksi di preview
- **Toggle dark/light mode** pada preview
- **Responsive preview** — toggle desktop/tablet/mobile viewport
- **Zoom in/out** pada preview
- **Custom text** — user bisa mengganti text di preview

### 4.3 Copy & Export System

#### 4.3.1 Tailwind Interactive Copy
- Klik warna → copy Tailwind class (e.g., `bg-blue-500`, `text-blue-500`, `border-blue-500`)
- Klik font size → copy class (e.g., `text-lg`, `text-2xl`)
- Klik border radius → copy class (e.g., `rounded-lg`, `rounded-xl`)
- Klik spacing → copy class (e.g., `p-4`, `m-2`, `gap-4`)
- Klik shadow → copy class (e.g., `shadow-md`, `shadow-lg`)
- **Copy all** — export seluruh design system sebagai Tailwind config object

#### 4.3.2 Export Formats
- **Tailwind Config** (`tailwind.config.js`)
- **CSS Variables** (`:root { ... }`)
- **SCSS Variables** (`$color-primary: ...`)
- **JSON** design tokens
- **Figma Tokens** (compatible dengan Figma Tokens plugin)
- **Screenshot** — export preview sebagai PNG/SVG

### 4.4 Google Fonts Integration

#### 4.4.1 Font Library
- **200+ Google Fonts** tersedia untuk dipilih
- Font di-load secara dinamis via Google Fonts API
- **Preview text** real-time dengan font yang dipilih
- **Font metadata** — category, weight availability, popularity ranking

#### 4.4.2 Font Loading
- Gunakan Google Fonts CSS API (`https://fonts.googleapis.com/css2?family=...`)
- Lazy loading — font hanya di-load saat dipilih
- **Font display: swap** untuk menghindari FOIT (Flash of Invisible Text)
- Cache font list menggunakan TanStack Query

### 4.5 Additional Features

#### 4.5.1 Accessibility
- **Contrast checker** — WCAG AA/AAA compliance untuk setiap color pair
- **Color blind simulation** — preview palette dalam protanopia, deuteranopia, tritanopia
- **Accessibility score** per palette

#### 4.5.2 History & Sharing
- **Undo/Redo** — history perubahan palette
- **Save palette** — semua data tersimpan di **Local Storage** browser (tidak ada backend/cloud)
- **Share URL** — generate shareable link dengan palette encoded di URL hash/query params (client-side only, tidak perlu server)
- **Export as image** — screenshot palette sebagai PNG
- **Auto-restore** — saat user kembali ke website, palette terakhir otomatis di-restore dari Local Storage

## 5. User Flow

```
1. User membuka website → LANGSUNG tampil (no login, no onboarding, no splash screen)
2. Sidebar menampilkan default palette + controls
3. Content area menampilkan preview dengan default template (Website)
4. User memilih base color → palette auto-generate
5. User memilih template category (Website/Poster/Card/dll)
6. User mengubah font dari Google Fonts list
7. User mengatur spacing, border-radius, shadow
8. Preview real-time update
9. User klik color swatch → copy Tailwind class
10. User export full design system
11. Semua perubahan auto-save ke Local Storage
12. User bisa share URL (palette encoded di URL params)
```

## 6. Technical Requirements

### 6.1 Frontend Stack (100% Frontend — No Backend)
| Technology | Purpose |
|-----------|---------|
| React 18+ | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool |
| TanStack Query | Client-side data caching (Google Fonts API response, font list) |
| Tailwind CSS | Styling + design token output |
| Zustand | Client state management (palette state, UI state) + Local Storage persist |
| React Router | Routing (optional — single page app) |
| Framer Motion | Animasi & transitions |
| react-hot-toast | Notifications (copy success, dll) |
| html-to-image | Export preview sebagai image |

> **No backend required.** Semua data disimpan di browser (Local Storage). Satu-satunya external API call adalah Google Fonts API (read-only, untuk fetch font list).

### 6.2 TanStack Query Usage (Client-Side Caching Only)
- **Google Fonts list** — `useQuery` dengan `staleTime: Infinity` (font list jarang berubah, cache di browser)
- **Font details** — `useQuery` per font family untuk metadata
- **Palette presets** — static data bundled di app, tidak perlu fetch
- **No mutations** — tidak ada backend, semua save ke Local Storage via Zustand persist middleware
- **Deduplication** — Multiple components requesting same query → single fetch

### 6.3 Google Fonts API Integration (Satu-satunya External API)
- **Endpoint**: `https://www.googleapis.com/webfonts/v1/webfonts?key=API_KEY`
- **Sort options**: popularity, alpha, style
- **Font loading**: `https://fonts.googleapis.com/css2?family=FontName:wght@weights`
- **Target**: 200+ fonts (filter dari 1500+ available fonts berdasarkan popularity)
- **Fallback**: Jika API gagal, gunakan bundled static JSON font list (200+ fonts) yang sudah di-include di build
- **No API key alternative**: Font list bisa di-bundle sebagai static JSON agar tidak perlu API key sama sekali

### 6.4 Performance Requirements
- **First Contentful Paint** < 1.5s
- **Time to Interactive** < 3s
- **Sidebar interaction** → preview update < 100ms
- **Font preview load** < 500ms per font
- **Lighthouse score** > 90

### 6.5 Browser Support
- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## 7. Non-Functional Requirements

- **No authentication** — tidak ada login/signup, langsung pakai
- **Responsive** — sidebar collapsible di mobile, content area full-width
- **Keyboard accessible** — semua kontrol bisa diakses via keyboard
- **Dark mode** — app mendukung dark/light mode
- **Offline** — palette yang sudah di-load tetap bisa diedit offline (service worker)
- **PWA ready** — installable sebagai PWA
- **Auto-save** — semua perubahan otomatis tersimpan ke Local Storage

## 8. Milestones

### Phase 1 — MVP (Week 1-2)
- [ ] Project setup (Vite + React + TypeScript + Tailwind)
- [ ] Sidebar layout dengan color picker
- [ ] Basic palette generator (5-color harmony)
- [ ] 3 template previews (Website, Card, Poster)
- [ ] Copy Tailwind class on click
- [ ] Google Fonts integration (200+ fonts)

### Phase 2 — Core Features (Week 3-4)
- [ ] Shade generator (50-950 scale)
- [ ] Typography scale generator
- [ ] Spacing & border-radius controls
- [ ] Tailwind config export
- [ ] CSS variables export
- [ ] Dark/light mode toggle
- [ ] Contrast checker

### Phase 3 — Polish & Advanced (Week 5-6)
- [ ] All template categories
- [ ] Responsive preview toggle
- [ ] Undo/Redo history
- [ ] Save to local storage
- [ ] Share URL
- [ ] Export as image
- [ ] Color blind simulation
- [ ] PWA setup

### Phase 4 — Enhancement (Future)
- [ ] AI palette suggestion (client-side model or external API)
- [ ] Figma token export
- [ ] Community palettes gallery (static JSON, no backend)

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Daily Active Users | 500+ dalam 3 bulan |
| Palette Generated | 1000+ dalam 1 bulan |
| Export Actions | 70%+ users export at least once |
| Time on Site | Average 5+ minutes |
| Return Rate | 30%+ within 7 days |

## 10. Competitive Analysis

| Feature | ColorPallet | Coolors | Realtime Colors | Happy Hues |
|---------|-------------|---------|-----------------|------------|
| Palette Generator | ✅ | ✅ | ✅ | ❌ |
| Tailwind Classes Copy | ✅ | ❌ | ✅ | ❌ |
| Google Fonts 200+ | ✅ | ❌ | ❌ | ❌ |
| Template Preview | ✅ (7 categories) | ❌ | ✅ (website only) | ✅ (website only) |
| Typography Scale | ✅ | ❌ | ❌ | ❌ |
| Spacing/Radius Control | ✅ | ❌ | ❌ | ❌ |
| Shade Generator | ✅ | ❌ | ❌ | ❌ |
| Accessibility Checker | ✅ | ✅ | ❌ | ❌ |
| Export Multiple Formats | ✅ | ✅ | ❌ | ❌ |
| Poster/Social Templates | ✅ | ❌ | ❌ | ❌ |
