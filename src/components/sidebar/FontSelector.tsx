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
    { id: 'sans-serif', label: 'Sans-Serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'monospace', label: 'Monospace' },
    { id: 'display', label: 'Display' },
    { id: 'handwriting', label: 'Handwriting' },
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
    if (targetSlot === 'heading') {
      setHeadingFont(font);
    } else if (targetSlot === 'body') {
      setBodyFont(font);
    } else if (targetSlot === 'mono') {
      setMonoFont(font);
    }
  };

  const getActiveFontInSlot = (slot: 'heading' | 'body' | 'mono') => {
    if (slot === 'heading') return headingFont?.name;
    if (slot === 'body') return bodyFont?.name;
    if (slot === 'mono') return monoFont?.name;
    return '';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Target Font Slot Toggle */}
      <div className="flex flex-col gap-1.5 bg-[#f2f2f3] p-1.5 rounded-[16px] border border-[#f2f2f3]">
        <span className="text-[10px] uppercase font-medium text-[#979799] tracking-wider ml-1">
          Apply Font To:
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <button
            onClick={() => setTargetSlot('heading')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-[9999px] transition-all cursor-pointer ${
              targetSlot === 'heading'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            <Heading className="w-3.5 h-3.5" />
            <span>Heading</span>
          </button>

          <button
            onClick={() => setTargetSlot('body')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-[9999px] transition-all cursor-pointer ${
              targetSlot === 'body'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Body</span>
          </button>

          <button
            onClick={() => setTargetSlot('mono')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-[9999px] transition-all cursor-pointer ${
              targetSlot === 'mono'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mono</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a6af]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search google fonts..."
          className="w-full pl-9 pr-4 py-2 text-xs font-medium text-[#17191c] bg-white border border-[#f2f2f3] rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] placeholder-[#a3a6af]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              className={`px-3 py-1 rounded-[9999px] text-[10px] font-medium border whitespace-nowrap cursor-pointer transition-all ${
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

      {/* Selected fonts indicator */}
      <div className="flex flex-col gap-1 text-[10px] text-[#979799] font-normal px-1 mt-1">
        <div className="flex justify-between">
          <span>Heading: <strong className="text-[#17191c]">{headingFont?.name}</strong></span>
          <span>Body: <strong className="text-[#17191c]">{bodyFont?.name}</strong></span>
        </div>
      </div>

      {/* Font list pane */}
      <div className="max-h-[300px] overflow-y-auto border border-[#f2f2f3] rounded-[24px] bg-white divide-y divide-[#f2f2f3] custom-scrollbar">
        {isLoading && (
          <div className="p-10 text-center text-xs text-[#979799]">Loading Google Fonts...</div>
        )}
        {!isLoading && filteredFonts.length === 0 && (
          <div className="p-10 text-center text-xs text-[#979799]">No fonts found</div>
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
                className={`w-full flex items-center justify-between px-3.5 py-3.5 text-left cursor-pointer transition-all duration-200 hover:bg-[#fafafb] ${
                  isAppliedToTarget ? 'bg-[#fafafb]' : ''
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[#17191c]">
                    {font.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-medium text-[#979799]">
                    {font.category} &bull; {font.weights.length} weights
                  </span>
                </div>

                {isAppliedToTarget ? (
                  <span className="w-5 h-5 rounded-[9999px] bg-[#17191c] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                ) : isAppliedElsewhere ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-[9999px] bg-[#f2f2f3] text-[#979799] font-medium">
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
