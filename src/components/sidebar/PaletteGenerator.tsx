import React, { useState } from 'react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import type { HarmonyMode } from '../../types/palette.ts';
import { PALETTE_PRESETS } from '../../constants/presets.ts';
import { LayoutGrid, Sparkles, Wand2 } from 'lucide-react';
import { generatePaletteFromPrompt } from '../../utils/ai.ts';
import { generateShadeScale } from '../../utils/shade.ts';
import { toast } from 'react-hot-toast';

export const PaletteGenerator: React.FC = () => {
  const { harmonyMode, setHarmonyMode, loadPreset, preset } = usePaletteStore();
  const [activeTab, setActiveTab] = useState<'harmony' | 'ai'>('harmony');
  const [aiPrompt, setAiPrompt] = useState('');

  const harmonyModes: { id: HarmonyMode; label: string; desc: string }[] = [
    { id: 'analogous', label: 'Analogous', desc: 'Warna bersebelahan' },
    { id: 'complementary', label: 'Complementary', desc: 'Warna berseberangan' },
    { id: 'triadic', label: 'Triadic', desc: '3 sudut segitiga sama sisi' },
    { id: 'split-complementary', label: 'Split-Comp', desc: 'Base + 2 samping komplementer' },
    { id: 'tetradic', label: 'Tetradic', desc: '4 sudut persegi panjang' },
    { id: 'monochromatic', label: 'Monochromatic', desc: 'Satu warna beda gelap terang' },
  ];

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      toast.error('Masukkan kata kunci deskripsi terlebih dahulu.');
      return;
    }

    try {
      const generatedHexes = generatePaletteFromPrompt(aiPrompt);
      
      const newColors = generatedHexes.map((hex) => ({
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
        preset: `AI: ${aiPrompt}`,
      });

      toast.success('Generated palette matching your description!', {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
    } catch (err) {
      toast.error('Gagal memproses prompt warna.');
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Sub tabs selector */}
      <div className="flex bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-250 dark:border-neutral-750 font-sans">
        <button
          onClick={() => setActiveTab('harmony')}
          type="button"
          className={`flex-1 py-1.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
            activeTab === 'harmony'
              ? 'bg-white dark:bg-neutral-700 text-violet-650 dark:text-violet-300 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-450'
          }`}
        >
          Harmony Algorithm
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          type="button"
          className={`flex-1 py-1.5 rounded-md text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
            activeTab === 'ai'
              ? 'bg-white dark:bg-neutral-700 text-violet-650 dark:text-violet-300 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-450'
          }`}
        >
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Smart AI Prompt</span>
        </button>
      </div>

      {activeTab === 'harmony' ? (
        <>
          {/* Harmony Mode Choices */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {harmonyModes.map((mode) => {
              const isActive = harmonyMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setHarmonyMode(mode.id)}
                  type="button"
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-50/50 dark:bg-violet-950/30 border-violet-500 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500/50 shadow-xs'
                      : 'bg-white dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="text-xs font-bold">{mode.label}</div>
                  <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-medium leading-normal mt-0.5">
                    {mode.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Library presets */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Classic Presets</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {PALETTE_PRESETS.map((p) => {
                const isActive = preset === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => loadPreset(p.name, p.colors)}
                    type="button"
                    className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-600'
                        : 'bg-white dark:bg-neutral-850/50 border-neutral-200 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 ml-1">
                      {p.name}
                    </span>
                    
                    <div className="flex rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
                      {p.colors.map((color, i) => (
                        <span
                          key={i}
                          style={{ backgroundColor: color }}
                          className="w-3.5 h-5 block"
                        ></span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleGenerateAI} className="flex flex-col gap-3 mt-1 font-sans">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-650 dark:text-neutral-300">
              Palet deskripsi (AI Model)
            </label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Contoh: fintech clean blue, sunset orange beach, dark forest green, neon cyberpunk night..."
              rows={3}
              className="w-full p-3 text-xs font-semibold rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-750 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-neutral-800 dark:text-white leading-normal resize-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-650 to-indigo-650 hover:brightness-105 active:scale-97 text-white text-xs font-bold transition-all shadow-md cursor-pointer border-none"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Generate by AI Prompt</span>
          </button>
          
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-normal font-semibold mt-1">
            *Kata kunci mendeteksi mood seperti neon, pastel, nature, corporate, warm, dan vintage secara cerdas pada client-side.
          </div>
        </form>
      )}
    </div>
  );
};
export default PaletteGenerator;
