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
      <div className="px-4 pt-4 pb-3">
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

      {/* Tab Panels — clean, no redundant section headers */}
      <div className="flex-1 overflow-y-auto px-4 pb-5 flex flex-col gap-4 custom-scrollbar">
        {sidebarTab === 'colors' && (
          <>
            <ColorPicker />
            <div className="border-t border-[#f2f2f3]" />
            <PaletteGenerator />
            <div className="border-t border-[#f2f2f3]" />
            <ShadeGenerator />
          </>
        )}

        {sidebarTab === 'typography' && (
          <>
            <FontSelector />
            <div className="border-t border-[#f2f2f3]" />
            <TypographyScale />
          </>
        )}

        {sidebarTab === 'spacing' && (
          <>
            <SpacingControl />
            <BorderRadiusControl />
            <ShadowControl />
          </>
        )}

        {sidebarTab === 'tailwind' && (
          <TailwindPreview />
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
