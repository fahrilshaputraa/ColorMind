import React, { useState, useMemo } from 'react';
import { COMMUNITY_PRESETS } from '../../constants/community.ts';
import type { CommunityPreset } from '../../constants/community.ts';
import { BUNDLED_FONT_LIST } from '../../constants/fontList.ts';
import { usePaletteStore } from '../../store/paletteStore.ts';
import { useTypographyStore } from '../../store/typographyStore.ts';
import { useSpacingStore } from '../../store/spacingStore.ts';
import { generateShadeScale } from '../../utils/shade.ts';
import { Search, X, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CommunityGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityGallery: React.FC<CommunityGalleryProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    COMMUNITY_PRESETS.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
    return ['All', ...Array.from(allTags)];
  }, []);

  const filteredPresets = useMemo(() => {
    return COMMUNITY_PRESETS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  const handleApplyPreset = (preset: CommunityPreset) => {
    try {
      // 1. Apply colors & shades
      const newColors = preset.colors.map((hex) => ({
        hex,
        locked: false,
      }));
      
      const newShades: Record<number, Record<string, string>> = {};
      newColors.forEach((col, idx) => {
        newShades[idx] = generateShadeScale(col.hex);
      });

      usePaletteStore.setState({
        colors: newColors,
        shadeScale: newShades,
        baseColor: newColors[0].hex,
        preset: preset.name,
        history: [], // reset history on load preset
        future: [],
      });

      // 2. Apply typography
      const matchHeading = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === preset.headingFont.toLowerCase());
      const headingObj = matchHeading || { name: preset.headingFont, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };
      
      const matchBody = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === preset.bodyFont.toLowerCase());
      const bodyObj = matchBody || { name: preset.bodyFont, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };

      useTypographyStore.setState({
        headingFont: headingObj,
        bodyFont: bodyObj,
      });

      // 3. Apply Spacing
      useSpacingStore.setState({
        baseUnit: preset.baseUnit,
        customRadius: preset.radius,
        borderRadius: {
          none: 0,
          sm: 2,
          md: 4,
          lg: 8,
          xl: 12,
          '2xl': 16,
          full: 9999,
          custom: preset.radius,
        },
      });

      toast.success(`Applied "${preset.name}" design system!`, {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
      onClose();
    } catch (err) {
      toast.error('Failed to load preset.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-left z-10 animate-fade-in font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white leading-none">Design Preset Gallery</h2>
              <p className="text-xs text-neutral-450 dark:text-neutral-500 font-semibold mt-1">Jelajahi preset buatan komunitas dengan paduan warna, font, dan spacing yang matang.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 p-5 bg-neutral-50 dark:bg-neutral-850/40 border-b border-neutral-150 dark:border-neutral-800/80 shrink-0">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari preset nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-750 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-neutral-800 dark:text-white"
            />
          </div>

          {/* Tags list buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTag === tag
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-350 hover:bg-neutral-100 dark:hover:bg-neutral-750'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Gallery Cards */}
        <div className="flex-1 overflow-y-auto p-5 grid md:grid-cols-2 gap-5 custom-scrollbar bg-neutral-50/50 dark:bg-neutral-900">
          {filteredPresets.length === 0 ? (
            <div className="col-span-2 py-16 flex flex-col items-center justify-center text-neutral-450 dark:text-neutral-500">
              <Search className="w-10 h-10 opacity-30 mb-2" />
              <p className="text-sm font-semibold">Tidak ada preset ditemukan</p>
              <p className="text-xs">Coba cari kata kunci lainnya atau pilih tag yang berbeda.</p>
            </div>
          ) : (
            filteredPresets.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="flex flex-col gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:shadow-lg hover:border-violet-400 dark:hover:border-violet-500 cursor-pointer group transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Preset Header details */}
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-neutral-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {preset.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1">
                    {preset.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors block grid */}
                <div className="grid grid-cols-5 gap-1.5 h-12 rounded-lg overflow-hidden border dark:border-neutral-800">
                  {preset.colors.map((hex, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: hex }}
                      className="h-full relative group/hex"
                      title={hex}
                    >
                      <span className="absolute bottom-1 left-1 bg-black/65 backdrop-blur-xs text-white text-[7px] font-mono px-1 rounded opacity-0 group-hover/hex:opacity-100 transition-opacity">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Typography & Spacing metadata specs */}
                <div className="grid grid-cols-2 gap-4 text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold border-t pt-3 border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Fonts</span>
                    <span className="truncate text-neutral-700 dark:text-neutral-300 font-bold">H: {preset.headingFont}</span>
                    <span className="truncate text-neutral-700 dark:text-neutral-300">B: {preset.bodyFont}</span>
                  </div>
                  
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Spacing & Radius</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">Base: {preset.baseUnit}px</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Radius: {preset.radius}px</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
};
export default CommunityGallery;
