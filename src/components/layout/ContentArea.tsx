import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import type { ViewportSize } from '../../store/uiStore';
import { Monitor, Tablet, Smartphone, Eye } from 'lucide-react';
import { TemplateSelector } from '../content/TemplateSelector.tsx';
import { WebsiteTemplate } from '../content/templates/WebsiteTemplate.tsx';
import { PosterTemplate } from '../content/templates/PosterTemplate.tsx';
import { CardTemplate } from '../content/templates/CardTemplate.tsx';

type ColorBlindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export const ContentArea: React.FC = () => {
  const { previewViewport, setPreviewViewport, activeTemplate, theme } = useUIStore();
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
    <main className={`flex-1 flex flex-col overflow-hidden h-[calc(100vh-73px)] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
      
      {/* Dynamic inline SVG filters for colorblind simulation */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      {/* Sub-header controls */}
      <div className={`flex flex-wrap items-center justify-between px-6 py-3 border-b gap-3 shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-150'}`}>
        
        {/* Template Selector */}
        <TemplateSelector />

        {/* Accessibility & Viewport Toolbar */}
        <div className="flex items-center gap-4">
          
          {/* Color Blind Simulator Dropdown */}
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/60 px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700/50">
            <Eye className="w-4 h-4 text-neutral-400" />
            <select
              value={colorBlindMode}
              onChange={(e) => setColorBlindMode(e.target.value as ColorBlindMode)}
              className="bg-transparent text-xs font-semibold text-neutral-600 dark:text-neutral-300 focus:outline-none cursor-pointer"
            >
              <option value="normal">Vision: Normal</option>
              <option value="protanopia">Simulate: Protanopia (Red-blind)</option>
              <option value="deuteranopia">Simulate: Deuteranopia (Green-blind)</option>
              <option value="tritanopia">Simulate: Tritanopia (Blue-blind)</option>
              <option value="achromatopsia">Simulate: Achromatopsia (Monochrome)</option>
            </select>
          </div>

          {/* Viewport controls */}
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/60 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700/50">
            {viewports.map((vp) => {
              const Icon = vp.icon;
              const isActive = previewViewport === vp.id;
              return (
                <button
                  key={vp.id}
                  onClick={() => setPreviewViewport(vp.id)}
                  type="button"
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-neutral-750 text-violet-600 dark:text-violet-400 shadow-xs'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                  title={vp.label}
                >
                  <Icon className="w-4.5 h-4.5" />
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Frame wrapper for viewport simulation */}
      <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start custom-scrollbar">
        <div className={`transition-all duration-300 ${getViewportWidth()} flex flex-col h-full`}>
          
          {/* Virtual Browser Top-Bar for Tablet/Mobile or premium frame feel */}
          {previewViewport !== 'desktop' && (
            <div className="bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-t-xl flex items-center gap-2 border-b border-neutral-300 dark:border-neutral-700 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="flex-1 bg-white dark:bg-neutral-900 rounded-md py-0.5 text-center text-[10px] text-neutral-400 font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-[400px] mx-auto select-none">
                https://colormind.app/preview
              </div>
            </div>
          )}

          {/* Actual Preview Frame with filter applied */}
          <div
            style={{
              filter: colorBlindMode === 'normal' ? 'none' : `url(#${colorBlindMode})`,
            }}
            className={`flex-1 rounded-b-xl overflow-hidden shadow-2xl border transition-all duration-300 min-h-[500px] ${
              previewViewport === 'desktop' ? 'rounded-t-xl' : ''
            } ${
              theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
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
