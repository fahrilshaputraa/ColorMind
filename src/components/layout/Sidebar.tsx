import React from 'react';
import { useUIStore } from '../../store/uiStore';
import type { SidebarTab } from '../../store/uiStore';
import { Palette, Type, Move, Code } from 'lucide-react';
import { ColorPicker } from '../sidebar/ColorPicker.tsx';
import { PaletteGenerator } from '../sidebar/PaletteGenerator.tsx';
import { ShadeGenerator } from '../sidebar/ShadeGenerator.tsx';
import { FontSelector } from '../sidebar/FontSelector.tsx';
import { TypographyScale } from '../sidebar/TypographyScale.tsx';
import { SpacingControl } from '../sidebar/SpacingControl.tsx';
import { BorderRadiusControl } from '../sidebar/BorderRadiusControl.tsx';
import { ShadowControl } from '../sidebar/ShadowControl.tsx';
import { TailwindPreview } from '../sidebar/TailwindPreview.tsx';
import { ResetControl } from '../sidebar/ResetControl.tsx';
import { PaperBgControl } from '../sidebar/PaperBgControl.tsx';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[10px] uppercase font-medium text-[#979799] tracking-wider px-1">{children}</span>
);

export const Sidebar: React.FC = () => {
  const { sidebarTab, setSidebarTab } = useUIStore();

  const tabs: { id: SidebarTab; label: string; icon: React.FC<any> }[] = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Type', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Move },
    { id: 'tailwind', label: 'Export', icon: Code },
  ];

  return (
    <aside className="w-80 flex flex-col border-r border-[#f2f2f3] h-[calc(100vh-69px)] shrink-0 bg-[#fafafb]">
      {/* Pill-style tab navigation */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-1 bg-[#f2f2f3] p-1 rounded-[9999px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = sidebarTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id)}
                type="button"
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-[9999px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#17191c]'
                    : 'text-[#979799] hover:text-[#17191c]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto px-4 pb-5 flex flex-col gap-5 custom-scrollbar">
        {sidebarTab === 'colors' && (
          <>
            <section className="flex flex-col gap-3">
              <SectionLabel>Background</SectionLabel>
              <PaperBgControl />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Palette</SectionLabel>
              <ColorPicker />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Generate</SectionLabel>
              <PaletteGenerator />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Shades</SectionLabel>
              <ShadeGenerator />
            </section>
          </>
        )}

        {sidebarTab === 'typography' && (
          <>
            <section className="flex flex-col gap-3">
              <SectionLabel>Fonts</SectionLabel>
              <FontSelector />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Type Scale</SectionLabel>
              <TypographyScale />
            </section>
          </>
        )}

        {sidebarTab === 'spacing' && (
          <>
            <section className="flex flex-col gap-3">
              <SectionLabel>Base Unit</SectionLabel>
              <SpacingControl />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Border Radius</SectionLabel>
              <BorderRadiusControl />
            </section>

            <section className="flex flex-col gap-3">
              <SectionLabel>Shadows</SectionLabel>
              <ShadowControl />
            </section>
          </>
        )}

        {sidebarTab === 'tailwind' && (
          <TailwindPreview />
        )}

        {/* Reset — always visible */}
        <div className="mt-auto pt-4" style={{ borderTop: '1px solid #f2f2f3' }}>
          <SectionLabel>Reset</SectionLabel>
          <div className="mt-2">
            <ResetControl />
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
