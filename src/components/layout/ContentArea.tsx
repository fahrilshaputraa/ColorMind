import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePaletteStore } from '../../store/paletteStore';
import type { ViewportSize } from '../../store/uiStore';
import { Monitor, Tablet, Smartphone, Eye } from 'lucide-react';
import { TemplateSelector } from '../content/TemplateSelector.tsx';
import { WebsiteTemplate } from '../content/templates/WebsiteTemplate.tsx';
import { PosterTemplate } from '../content/templates/PosterTemplate.tsx';
import { CardTemplate } from '../content/templates/CardTemplate.tsx';

type ColorBlindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export const ContentArea: React.FC = () => {
  const { previewViewport, setPreviewViewport, activeTemplate } = useUIStore();
  const paperBg = usePaletteStore((s) => s.paperBg);
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>('normal');

  const viewports: { id: ViewportSize; icon: React.FC<any>; label: string }[] = [
    { id: 'desktop', icon: Monitor, label: 'Desktop (100%)' },
    { id: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile (375px)' },
  ];

  const getViewportWidth = () => {
    switch (previewViewport) {
      case 'tablet':
        return 'max-w-[768px] w-full';
      case 'mobile':
        return 'max-w-[375px] w-full';
      default:
        return 'w-full';
    }
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden h-[calc(100vh-69px)] bg-white">

      {/* Dynamic inline SVG filters for colorblind simulation */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      {/* Sub-header controls — Mist Gray card */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-[#f2f2f3] gap-3 shrink-0 bg-[#fafafb]">

        {/* Template Selector */}
        <TemplateSelector />

        {/* Accessibility & Viewport Toolbar */}
        <div className="flex items-center gap-4">

          {/* Color Blind Simulator Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-[9999px] border border-[#f2f2f3]">
            <Eye className="w-4 h-4 text-[#979799]" />
            <select
              value={colorBlindMode}
              onChange={(e) => setColorBlindMode(e.target.value as ColorBlindMode)}
              className="bg-transparent text-xs font-medium text-[#777b86] focus:outline-none cursor-pointer"
            >
              <option value="normal">Vision: Normal</option>
              <option value="protanopia">Simulate: Protanopia</option>
              <option value="deuteranopia">Simulate: Deuteranopia</option>
              <option value="tritanopia">Simulate: Tritanopia</option>
              <option value="achromatopsia">Simulate: Achromatopsia</option>
            </select>
          </div>

          {/* Viewport controls — pill group */}
          <div className="flex items-center gap-1 bg-[#f2f2f3] p-1 rounded-[9999px]">
            {viewports.map((vp) => {
              const Icon = vp.icon;
              const isActive = previewViewport === vp.id;
              return (
                <button
                  key={vp.id}
                  onClick={() => setPreviewViewport(vp.id)}
                  type="button"
                  className={`p-2 rounded-[9999px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#17191c] shadow-sm'
                      : 'text-[#979799] hover:text-[#17191c]'
                  }`}
                  title={vp.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Frame wrapper for viewport simulation */}
      <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start bg-[#fafafb] bg-dots">
        <div className={`transition-all duration-300 ${getViewportWidth()} flex flex-col min-h-full`}>

          {/* Virtual Browser Top-Bar for Tablet/Mobile */}
          {previewViewport !== 'desktop' && (
            <div className="bg-[#f2f2f3] px-4 py-2 rounded-t-[24px] flex items-center gap-2 border-b border-[#ececec] shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="flex-1 bg-white rounded-md py-0.5 text-center text-[10px] text-[#a3a6af] font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-[400px] mx-auto select-none">
                https://colormind.web.id/preview
              </div>
            </div>
          )}

          {/* Actual Preview Frame */}
          <div
            style={{
              filter: colorBlindMode === 'normal' ? 'none' : `url(#${colorBlindMode})`,
              backgroundColor: paperBg,
            }}
            className={`flex-1 rounded-b-[24px] overflow-hidden border border-[#f2f2f3] transition-all duration-300 min-h-[500px] ${
              previewViewport === 'desktop' ? 'rounded-t-[24px]' : ''
            }`}
          >
            {activeTemplate === 'website' && <WebsiteTemplate />}
            {activeTemplate === 'poster' && <PosterTemplate />}
            {activeTemplate === 'card' && <CardTemplate />}
          </div>

        </div>
      </div>
    </main>
  );
};
export default ContentArea;
