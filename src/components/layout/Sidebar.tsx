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
  const { sidebarTab, setSidebarTab, theme } = useUIStore();

  const tabs: { id: SidebarTab; label: string; icon: React.FC<any> }[] = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Move },
    { id: 'tailwind', label: 'Tailwind', icon: Code },
  ];

  return (
    <aside className={`w-80 flex flex-col border-r h-[calc(100vh-73px)] shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
      {/* Sidebar navigation tabs */}
      <div className={`flex border-b transition-colors duration-300 ${theme === 'dark' ? 'border-neutral-850' : 'border-neutral-100'}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = sidebarTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSidebarTab(tab.id)}
              type="button"
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 custom-scrollbar">
        {sidebarTab === 'colors' && (
          <>
            <section className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Palette Colors</h3>
              <ColorPicker />
            </section>
            
            <section className="flex flex-col gap-4 border-t pt-4 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Harmony Controls</h3>
              <PaletteGenerator />
            </section>
            
            <section className="flex flex-col gap-4 border-t pt-4 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Tailwind Shades Scale</h3>
              <ShadeGenerator />
            </section>
          </>
        )}

        {sidebarTab === 'typography' && (
          <>
            <section className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Google Fonts Browser</h3>
              <FontSelector />
            </section>
            
            <section className="flex flex-col gap-4 border-t pt-4 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Typography Scale</h3>
              <TypographyScale />
            </section>
          </>
        )}

        {sidebarTab === 'spacing' && (
          <>
            <section className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Spacing Unit</h3>
              <SpacingControl />
            </section>
            
            <section className="flex flex-col gap-4 border-t pt-4 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Border Radius</h3>
              <BorderRadiusControl />
            </section>
            
            <section className="flex flex-col gap-4 border-t pt-4 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Box Shadow</h3>
              <ShadowControl />
            </section>
          </>
        )}

        {sidebarTab === 'tailwind' && (
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Tailwind Export Code</h3>
            <TailwindPreview />
          </section>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
