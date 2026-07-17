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
        history: [],
        future: [],
      });

      const matchHeading = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === preset.headingFont.toLowerCase());
      const headingObj = matchHeading || { name: preset.headingFont, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };

      const matchBody = BUNDLED_FONT_LIST.find((f) => f.name.toLowerCase() === preset.bodyFont.toLowerCase());
      const bodyObj = matchBody || { name: preset.bodyFont, category: 'sans-serif', weights: [400, 700], subsets: ['latin'] };

      useTypographyStore.setState({
        headingFont: headingObj,
        bodyFont: bodyObj,
      });

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
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
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
      <div className="absolute inset-0 bg-[#17191c]/65 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-[24px] border border-[#f2f2f3] flex flex-col overflow-hidden text-left z-10 animate-fade-in font-sans" style={{ boxShadow: 'oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0,0,0,0.1) 0px 8px 40px 0px' }}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#f2f2f3]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[12px] bg-[#17191c] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#17191c] leading-none">Design Preset Gallery</h2>
              <p className="text-xs text-[#979799] font-normal mt-1">Jelajahi preset buatan komunitas dengan paduan warna, font, dan spacing yang matang.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-[9999px] text-[#777b86] hover:text-[#17191c] hover:bg-[#fafafb] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 p-5 bg-[#fafafb] border-b border-[#f2f2f3] shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a6af]" />
            <input
              type="text"
              placeholder="Cari preset nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-[16px] bg-white border border-[#f2f2f3] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] text-[#17191c] placeholder-[#a3a6af]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                type="button"
                className={`px-3 py-1.5 rounded-[9999px] text-xs font-medium transition-all cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[#17191c] text-white'
                    : 'bg-white border border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Gallery Cards */}
        <div className="flex-1 overflow-y-auto p-5 grid md:grid-cols-2 gap-5 custom-scrollbar bg-[#fafafb]">
          {filteredPresets.length === 0 ? (
            <div className="col-span-2 py-16 flex flex-col items-center justify-center text-[#979799]">
              <Search className="w-10 h-10 opacity-30 mb-2" />
              <p className="text-sm font-medium">Tidak ada preset ditemukan</p>
              <p className="text-xs">Coba cari kata kunci lainnya atau pilih tag yang berbeda.</p>
            </div>
          ) : (
            filteredPresets.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="flex flex-col gap-4 p-4 rounded-[24px] bg-white border border-[#f2f2f3] hover:border-[#17191c] cursor-pointer group transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[#17191c] text-sm group-hover:text-[#17191c] transition-colors">
                    {preset.name}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {preset.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] font-normal px-1.5 py-0.5 rounded-[9999px] bg-[#f2f2f3] text-[#979799]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1.5 h-12 rounded-[16px] overflow-hidden border border-[#f2f2f3]">
                  {preset.colors.map((hex, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: hex }}
                      className="h-full relative group/hex"
                      title={hex}
                    >
                      <span className="absolute bottom-1 left-1 bg-[#17191c]/65 backdrop-blur-xs text-white text-[7px] font-mono px-1 rounded opacity-0 group-hover/hex:opacity-100 transition-opacity">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-[10px] text-[#979799] font-normal border-t pt-3 border-[#f2f2f3]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#979799] font-medium uppercase">Fonts</span>
                    <span className="truncate text-[#17191c] font-medium">H: {preset.headingFont}</span>
                    <span className="truncate text-[#777b86]">B: {preset.bodyFont}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#979799] font-medium uppercase">Spacing & Radius</span>
                    <span className="text-[#17191c] font-medium">Base: {preset.baseUnit}px</span>
                    <span className="text-[#777b86]">Radius: {preset.radius}px</span>
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
