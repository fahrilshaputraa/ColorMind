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
      <div className="flex flex-col gap-1.5 bg-neutral-100 dark:bg-neutral-800/40 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700/60 shadow-inner">
        <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider ml-1">
          Apply Font To:
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <button
            onClick={() => setTargetSlot('heading')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              targetSlot === 'heading'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800'
            }`}
          >
            <Heading className="w-3.5 h-3.5" />
            <span>Heading</span>
          </button>
          
          <button
            onClick={() => setTargetSlot('body')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              targetSlot === 'body'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Body</span>
          </button>
          
          <button
            onClick={() => setTargetSlot('mono')}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              targetSlot === 'mono'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mono</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search google fonts..."
          className="w-full pl-9 pr-4 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs"
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
              className={`px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-violet-100 dark:bg-violet-900/50 border-violet-300 dark:border-violet-850 text-violet-750 dark:text-violet-300'
                  : 'bg-white dark:bg-neutral-850/50 border-neutral-200 dark:border-neutral-800/60 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Selected fonts indicator info */}
      <div className="flex flex-col gap-1 text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold px-1 mt-1">
        <div className="flex justify-between">
          <span>Heading: <strong className="text-neutral-600 dark:text-neutral-350">{headingFont?.name}</strong></span>
          <span>Body: <strong className="text-neutral-600 dark:text-neutral-350">{bodyFont?.name}</strong></span>
        </div>
      </div>

      {/* Font list pane */}
      <div className="max-h-[300px] overflow-y-auto border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-850/20 divide-y divide-neutral-150 dark:divide-neutral-800/50 custom-scrollbar">
        {isLoading && (
          <div className="p-10 text-center text-xs text-neutral-400">Loading Google Fonts...</div>
        )}
        {!isLoading && filteredFonts.length === 0 && (
          <div className="p-10 text-center text-xs text-neutral-400">No fonts found</div>
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
                className={`w-full flex items-center justify-between px-3.5 py-3.5 text-left cursor-pointer transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 ${
                  isAppliedToTarget ? 'bg-violet-50/20 dark:bg-violet-950/10' : ''
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-neutral-850 dark:text-neutral-150">
                    {font.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 dark:text-neutral-500">
                    {font.category} • {font.weights.length} weights
                  </span>
                </div>

                {isAppliedToTarget ? (
                  <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center border border-violet-250 dark:border-violet-800">
                    <Check className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  </span>
                ) : isAppliedElsewhere ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold border border-neutral-200 dark:border-neutral-700/50">
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
