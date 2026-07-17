import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore.ts';
import { Sidebar } from './Sidebar.tsx';
import { ContentArea } from './ContentArea.tsx';
import { Sun, Moon, PanelLeftClose, PanelLeftOpen, Sparkles, RefreshCw, Share2, Download, Compass } from 'lucide-react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import { useTypographyStore } from '../../store/typographyStore.ts';
import { useSpacingStore } from '../../store/spacingStore.ts';
import { Toaster, toast } from 'react-hot-toast';
import { CommunityGallery } from '../sidebar/CommunityGallery.tsx';

export const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme } = useUIStore();
  const { generatePalette, undo, redo, history, future, colors } = usePaletteStore();
  const { headingFont, bodyFont } = useTypographyStore();
  const { baseUnit } = useSpacingStore();
  
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      const colorHexes = colors.map((c) => c.hex.replace('#', '')).join(',');
      url.searchParams.set('colors', colorHexes);
      
      if (headingFont) url.searchParams.set('hfont', headingFont.name);
      if (bodyFont) url.searchParams.set('bfont', bodyFont.name);
      url.searchParams.set('baseunit', baseUnit.toString());

      navigator.clipboard.writeText(url.toString());
      toast.success('Shareable design system link copied to clipboard!', {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
    } catch (err) {
      toast.error('Failed to copy share link.');
    }
  };

  const exportPaletteAsPNG = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isDark = theme === 'dark';

      // 1. Draw Background
      ctx.fillStyle = isDark ? '#0b0f19' : '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Accent Header line
      ctx.fillStyle = colors[0]?.hex || '#4f46e5';
      ctx.fillRect(0, 0, canvas.width, 10);

      // 3. Draw Brand Header
      ctx.fillStyle = isDark ? '#ffffff' : '#111827';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('ColorMind', 60, 70);

      ctx.fillStyle = isDark ? '#9ca3af' : '#4b5563';
      ctx.font = '500 16px sans-serif';
      ctx.fillText('Interactive Design System Palette', 205, 68);

      // 4. Draw Color Swatches
      const swatchWidth = 200;
      const swatchHeight = 250;
      const startX = 60;
      const startY = 130;
      const gap = 20;

      colors.forEach((col, idx) => {
        const x = startX + idx * (swatchWidth + gap);
        
        ctx.fillStyle = col.hex;
        ctx.fillRect(x, startY, swatchWidth, swatchHeight);

        // Swatch Border
        ctx.strokeStyle = isDark ? '#1f2937' : '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, swatchWidth, swatchHeight);

        // Info Tag Block at swatch bottom
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, startY + swatchHeight - 45, swatchWidth, 45);

        // Hex Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(col.hex.toUpperCase(), x + 15, startY + swatchHeight - 18);

        // Index Label
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`Color ${idx + 1}`, x + swatchWidth - 65, startY + swatchHeight - 20);
      });

      // 5. Draw Specs Block
      const metaY = 460;
      ctx.fillStyle = isDark ? '#111827' : '#ffffff';
      ctx.fillRect(60, metaY, 1080, 120);

      // Specs block border
      ctx.strokeStyle = isDark ? '#1f2937' : '#e5e7eb';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(60, metaY, 1080, 120);

      // Left Column: Fonts
      ctx.fillStyle = isDark ? '#ffffff' : '#111827';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Typography System', 90, metaY + 45);

      ctx.fillStyle = isDark ? '#9ca3af' : '#4b5563';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Heading Font: ${headingFont?.name || 'System Sans'}`, 90, metaY + 75);
      ctx.fillText(`Body Font: ${bodyFont?.name || 'System Sans'}`, 90, metaY + 95);

      // Right Column: Spacings
      ctx.fillStyle = isDark ? '#ffffff' : '#111827';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Spacing System', 600, metaY + 45);

      ctx.fillStyle = isDark ? '#9ca3af' : '#4b5563';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Base Spacing Unit: ${baseUnit}px`, 600, metaY + 75);
      ctx.fillText(`Tailwind Config: Extended spacing scale`, 600, metaY + 95);

      // Share footer
      ctx.fillStyle = isDark ? '#4b5563' : '#9ca3af';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('colormind.app/share', 1020, 100);

      // Trigger actual download link
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'colormind-design-system.png';
      link.href = dataUrl;
      link.click();
      
      toast.success('Successfully exported design system as PNG!', {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
    } catch (err) {
      toast.error('Failed to generate image exporter.');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Header bar */}
      <header className={`sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-950/80 border-neutral-800' : 'bg-white/80 border-neutral-200'} backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            type="button"
            className={`p-2 rounded-lg border transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 ${theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-600'}`}
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 flex items-center justify-center shadow-md animate-pulse">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent m-0 select-none">
              ColorMind
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 font-bold border border-violet-200 dark:border-violet-800/40 select-none">
              v1.0
            </span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-3">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 border-r pr-3 border-neutral-200 dark:border-neutral-800">
            <button
              onClick={undo}
              disabled={history.length === 0}
              type="button"
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer select-none disabled:opacity-35 disabled:cursor-not-allowed ${theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'}`}
              title="Undo change"
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={future.length === 0}
              type="button"
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer select-none disabled:opacity-35 disabled:cursor-not-allowed ${theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'}`}
              title="Redo change"
            >
              Redo
            </button>
          </div>

          {/* Share Design system link */}
          <button
            onClick={handleShareLink}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 shadow-xs'
            }`}
            title="Copy share link to clipboard"
          >
            <Share2 className="w-4 h-4 text-violet-500" />
            <span>Share Link</span>
          </button>

          {/* Explore Presets */}
          <button
            onClick={() => setGalleryOpen(true)}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 shadow-xs'
            }`}
            title="Browse community templates"
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Explore Presets</span>
          </button>

          {/* Export PNG */}
          <button
            onClick={exportPaletteAsPNG}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 shadow-xs'
            }`}
            title="Download design system as PNG Card"
          >
            <Download className="w-4 h-4 text-fuchsia-500" />
            <span>Export PNG</span>
          </button>

          {/* Random generator shortcut */}
          <button
            onClick={generatePalette}
            type="button"
            className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md hover:shadow-lg active:scale-97 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Random</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className={`p-2 rounded-lg border transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 ${theme === 'dark' ? 'border-neutral-800 text-amber-400' : 'border-neutral-200 text-neutral-600'}`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Workspace container */}
      <div className="flex-1 flex overflow-hidden">
        {sidebarOpen && <Sidebar />}
        <ContentArea />
      </div>
      
      {/* Community Presets Modal */}
      <CommunityGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </div>
  );
};
export default AppLayout;
