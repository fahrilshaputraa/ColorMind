import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore.ts';
import { Sidebar } from './Sidebar.tsx';
import { ContentArea } from './ContentArea.tsx';
import { PanelLeftClose, PanelLeftOpen, RefreshCw, Share2, Download, Compass, Undo, Redo } from 'lucide-react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import { useTypographyStore } from '../../store/typographyStore.ts';
import { useSpacingStore } from '../../store/spacingStore.ts';
import { Toaster, toast } from 'react-hot-toast';
import { CommunityGallery } from '../sidebar/CommunityGallery.tsx';

export const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { randomizeColors, undo, redo, history, future, colors } = usePaletteStore();
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
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
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

      // 1. Draw Background
      ctx.fillStyle = '#fafafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Accent Header line
      ctx.fillStyle = colors[0]?.hex || '#17191c';
      ctx.fillRect(0, 0, canvas.width, 10);

      // 3. Draw Brand Header
      ctx.fillStyle = '#17191c';
      ctx.font = '400 28px Georgia, ui-serif, serif';
      ctx.fillText('ColorMind', 60, 70);

      ctx.fillStyle = '#777b86';
      ctx.font = '400 16px Inter, ui-sans-serif, sans-serif';
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

        ctx.strokeStyle = '#f2f2f3';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, swatchWidth, swatchHeight);

        ctx.fillStyle = '#17191c';
        ctx.fillRect(x, startY + swatchHeight - 45, swatchWidth, 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = '400 16px ui-monospace, monospace';
        ctx.fillText(col.hex.toUpperCase(), x + 15, startY + swatchHeight - 18);

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '400 12px Inter, ui-sans-serif, sans-serif';
        ctx.fillText(`Color ${idx + 1}`, x + swatchWidth - 65, startY + swatchHeight - 20);
      });

      // 5. Draw Specs Block
      const metaY = 460;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(60, metaY, 1080, 120);

      ctx.strokeStyle = '#f2f2f3';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(60, metaY, 1080, 120);

      ctx.fillStyle = '#17191c';
      ctx.font = '400 16px Inter, ui-sans-serif, sans-serif';
      ctx.fillText('Typography System', 90, metaY + 45);

      ctx.fillStyle = '#777b86';
      ctx.font = '14px Inter, ui-sans-serif, sans-serif';
      ctx.fillText(`Heading Font: ${headingFont?.name || 'System Sans'}`, 90, metaY + 75);
      ctx.fillText(`Body Font: ${bodyFont?.name || 'System Sans'}`, 90, metaY + 95);

      ctx.fillStyle = '#17191c';
      ctx.font = '400 16px Inter, ui-sans-serif, sans-serif';
      ctx.fillText('Spacing System', 600, metaY + 45);

      ctx.fillStyle = '#777b86';
      ctx.font = '14px Inter, ui-sans-serif, sans-serif';
      ctx.fillText(`Base Spacing Unit: ${baseUnit}px`, 600, metaY + 75);
      ctx.fillText(`Tailwind Config: Extended spacing scale`, 600, metaY + 95);

      ctx.fillStyle = '#777b86';
      ctx.font = '400 12px ui-monospace, monospace';
      ctx.fillText('colormind.app/share', 1020, 100);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'colormind-design-system.png';
      link.href = dataUrl;
      link.click();

      toast.success('Successfully exported design system as PNG!', {
        style: {
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
        },
      });
    } catch (err) {
      toast.error('Failed to generate image exporter.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#17191c]">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Transparent nav bar — Steep style: no background, no border, no shadow */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 bg-transparent">
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSidebar}
            type="button"
            className="p-2 rounded-full border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer"
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2 select-none">
            <h1 style={{ fontFamily: '"Source Serif 4", Georgia, ui-serif, serif', fontWeight: 400 }} className="text-xl tracking-tight m-0 select-none text-[#17191c]">
              ColorMind
            </h1>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-1.5">
          {/* Undo */}
          <button
            onClick={undo}
            disabled={history.length === 0}
            type="button"
            className="group relative p-2 rounded-[9999px] border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Undo className="w-4 h-4 transition-transform duration-250 group-hover:-translate-x-0.5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#17191c] text-white text-[9px] font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Undo
            </span>
          </button>

          {/* Redo */}
          <button
            onClick={redo}
            disabled={future.length === 0}
            type="button"
            className="group relative p-2 rounded-[9999px] border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Redo className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#17191c] text-white text-[9px] font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Redo
            </span>
          </button>

          <span className="h-4 w-px bg-[#f2f2f3] mx-1"></span>

          {/* Share Design system link */}
          <button
            onClick={handleShareLink}
            type="button"
            className="group relative p-2 rounded-[9999px] border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#17191c] transition-transform duration-250 group-hover:scale-105" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#17191c] text-white text-[9px] font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Share Design Link
            </span>
          </button>

          {/* Explore Presets */}
          <button
            onClick={() => setGalleryOpen(true)}
            type="button"
            className="group relative p-2 rounded-[9999px] border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#17191c] transition-transform duration-250 group-hover:scale-105" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#17191c] text-white text-[9px] font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Explore Presets
            </span>
          </button>

          {/* Export PNG */}
          <button
            onClick={exportPaletteAsPNG}
            type="button"
            className="group relative p-2 rounded-[9999px] border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#17191c] transition-transform duration-250 group-hover:scale-105" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#17191c] text-white text-[9px] font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Export PNG
            </span>
          </button>

          {/* Random generator — filled pill button */}
          <button
            onClick={randomizeColors}
            type="button"
            className="flex items-center gap-2 px-5 py-2 rounded-[9999px] bg-[#17191c] text-white text-xs font-medium transition-all cursor-pointer border-none font-sans"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Color</span>
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
