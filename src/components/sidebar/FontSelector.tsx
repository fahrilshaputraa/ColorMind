import React, { useState, useMemo } from 'react';
import { useFonts } from '../../hooks/useFonts.ts';
import { useTypographyStore } from '../../store/typographyStore';
import type { FontCategory, FontFamily } from '../../types/font.ts';
import { Search, Heading, FileText, Code, Check } from 'lucide-react';

export const FontSelector: React.FC = () => {
  const { data: fonts, isLoading } = useFonts();
  const { headingFont, bodyFont, monoFont, setHeadingFont, setBodyFont, setMonoFont } = useTypographyStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | 'all'>('all');
  const [targetSlot, setTargetSlot] = useState<'heading' | 'body' | 'mono'>('heading');

  const categories: { id: FontCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'sans-serif', label: 'Sans' },
    { id: 'serif', label: 'Serif' },
    { id: 'monospace', label: 'Mono' },
    { id: 'display', label: 'Display' },
    { id: 'handwriting', label: 'Script' },
  ];

  const filteredFonts = useMemo(() => {
    if (!fonts) return [];
    return fonts.filter((font) => {
      const matchesSearch = font.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [fonts, search, selectedCategory]);

  const handleSelectFont = (font: FontFamily) => {
    if (targetSlot === 'heading') setHeadingFont(font);
    else if (targetSlot === 'body') setBodyFont(font);
    else if (targetSlot === 'mono') setMonoFont(font);
  };

  const getActiveFontInSlot = (slot: 'heading' | 'body' | 'mono') => {
    if (slot === 'heading') return headingFont?.name;
    if (slot === 'body') return bodyFont?.name;
    if (slot === 'mono') return monoFont?.name;
    return '';
  };

  const slotConfig = [
    { id: 'heading' as const, label: 'H', icon: Heading, font: headingFont },
    { id: 'body' as const, label: 'B', icon: FileText, font: bodyFont },
    { id: 'mono' as const, label: 'M', icon: Code, font: monoFont },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Slot selector + active font indicators */}
      <div className="flex items-center gap-1.5">
        {slotConfig.map((slot) => {
          const Icon = slot.icon;
          const isActive = targetSlot === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setTargetSlot(slot.id)}
              type="button"
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-[16px] border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#17191c] border-[#17191c] text-white'
                  : 'bg-white border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[9px] font-medium">{slot.font?.name || 'None'}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a3a6af]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search fonts..."
          className="w-full pl-8 pr-3 py-2 text-xs font-medium text-[#17191c] bg-white border border-[#f2f2f3] rounded-[9999px] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] placeholder-[#a3a6af]"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              className={`px-2.5 py-1 rounded-[9999px] text-[9px] font-medium border whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#17191c] border-[#17191c] text-white'
                  : 'bg-white border-[#f2f2f3] text-[#979799] hover:bg-[#fafafb]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Font list */}
      <div className="max-h-[240px] overflow-y-auto border border-[#f2f2f3] rounded-[20px] bg-white divide-y divide-[#f2f2f3] custom-scrollbar">
        {isLoading && (
          <div className="p-8 text-center text-xs text-[#979799]">Loading fonts...</div>
        )}
        {!isLoading && filteredFonts.length === 0 && (
          <div className="p-8 text-center text-xs text-[#979799]">No fonts found</div>
        )}
        {!isLoading &&
          filteredFonts.map((font) => {
            const isAppliedToTarget = getActiveFontInSlot(targetSlot) === font.name;
            const isAppliedElsewhere =
              headingFont?.name === font.name ||
              bodyFont?.name === font.name ||
              monoFont?.name === font.name;

            return (
              <button
                key={font.name}
                onClick={() => handleSelectFont(font)}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left cursor-pointer transition-all hover:bg-[#fafafb] ${
                  isAppliedToTarget ? 'bg-[#fafafb]' : ''
                }`}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-medium text-[#17191c] truncate">{font.name}</span>
                  <span className="text-[8px] uppercase tracking-wider font-medium text-[#979799]">
                    {font.category}
                  </span>
                </div>

                {isAppliedToTarget ? (
                  <span className="w-4 h-4 rounded-[9999px] bg-[#17191c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                ) : isAppliedElsewhere ? (
                  <span className="text-[8px] px-1.5 py-0.5 rounded-[9999px] bg-[#f2f2f3] text-[#979799] font-medium shrink-0">
                    {headingFont?.name === font.name ? 'H' : bodyFont?.name === font.name ? 'B' : 'M'}
                  </span>
                ) : null}
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default FontSelector;
