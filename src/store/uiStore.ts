import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SidebarTab = 'colors' | 'typography' | 'spacing' | 'tailwind';
export type ViewportSize = 'desktop' | 'tablet' | 'mobile';
export type TemplateCategory = 'website' | 'poster' | 'card';

interface UIState {
  sidebarOpen: boolean;
  sidebarTab: SidebarTab;
  theme: 'light' | 'dark';
  previewViewport: ViewportSize;
  activeTemplate: TemplateCategory;
  zoomLevel: number;

  // Actions
  toggleSidebar: () => void;
  setSidebarTab: (tab: SidebarTab) => void;
  toggleTheme: () => void;
  setPreviewViewport: (viewport: ViewportSize) => void;
  setActiveTemplate: (template: TemplateCategory) => void;
  setZoomLevel: (level: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarTab: 'colors',
      theme: 'light',
      previewViewport: 'desktop',
      activeTemplate: 'website',
      zoomLevel: 100,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarTab: (tab) => set({ sidebarTab: tab }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setPreviewViewport: (viewport) => set({ previewViewport: viewport }),
      setActiveTemplate: (template) => set({ activeTemplate: template }),
      setZoomLevel: (level) => set({ zoomLevel: Math.max(50, Math.min(150, level)) }),
    }),
    {
      name: 'colorpallet-ui',
    }
  )
);
