import React, { useState } from 'react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import type { HarmonyMode } from '../../types/palette.ts';
import { PALETTE_PRESETS } from '../../constants/presets.ts';
import { LayoutGrid, Sparkles, Wand2, Compass } from 'lucide-react';
import { generatePaletteFromPrompt } from '../../utils/ai.ts';
import { hexToHsl } from '../../utils/color.ts';
import { toast } from 'react-hot-toast';

type Section = 'harmony' | 'wheel' | 'presets' | 'ai';

export const PaletteGenerator: React.FC = () => {
  const { colors, harmonyMode, setHarmonyMode, loadPreset, preset } = usePaletteStore();
  const [activeSection, setActiveSection] = useState<Section>('harmony');
  const [aiPrompt, setAiPrompt] = useState('');

  const harmonyModes: { id: HarmonyMode; label: string; desc: string }[] = [
    { id: 'analogous', label: 'Analogous', desc: 'Warna bersebelahan' },
    { id: 'complementary', label: 'Complementary', desc: 'Warna berseberangan' },
    { id: 'triadic', label: 'Triadic', desc: '3 sudut segitiga' },
    { id: 'split-complementary', label: 'Split-Comp', desc: 'Base + 2 komplementer' },
    { id: 'tetradic', label: 'Tetradic', desc: '4 sudut persegi' },
    { id: 'monochromatic', label: 'Monochromatic', desc: 'Variasi gelap terang' },
  ];

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      toast.error('Masukkan deskripsi kata kunci terlebih dahulu.');
      return;
    }

    try {
      const generatedHexes = generatePaletteFromPrompt(aiPrompt);
      loadPreset(`AI: ${aiPrompt}`, generatedHexes);
      toast.success('Generated palette from AI Prompt!');
    } catch (err) {
      toast.error('Gagal memproses prompt warna.');
    }
  };

  const wheelHues = colors.map((col) => {
    const hsl = hexToHsl(col.hex);
    return { hue: hsl.h, hex: col.hex };
  });

  const cx = 80;
  const cy = 80;
  const r = 55;

  const sections: { id: Section; label: string; icon: React.FC<any> }[] = [
    { id: 'harmony', label: 'Harmony', icon: Compass },
    { id: 'wheel', label: 'Wheel', icon: Sparkles },
    { id: 'presets', label: 'Presets', icon: LayoutGrid },
    { id: 'ai', label: 'AI', icon: Wand2 },
  ];

  return (
    <div className="flex flex-col gap-3 text-left font-sans">
      {/* Section switcher — pill tabs */}
      <div className="flex items-center gap-1 bg-[#f2f2f3] p-1 rounded-[9999px]">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              type="button"
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium rounded-[9999px] transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#17191c]'
                  : 'text-[#979799] hover:text-[#17191c]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section content */}
      <div className="bg-white border border-[#f2f2f3] rounded-[20px] overflow-hidden">
        {activeSection === 'harmony' && (
          <div className="p-3 grid grid-cols-2 gap-2">
            {harmonyModes.map((mode) => {
              const isActive = harmonyMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setHarmonyMode(mode.id)}
                  type="button"
                  className={`p-2.5 rounded-[16px] border text-left cursor-pointer transition-all active:scale-[0.96] ${
                    isActive
                      ? 'bg-[#17191c] border-[#17191c] text-white'
                      : 'bg-white border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb]'
                  }`}
                >
                  <div className="text-[10px] font-medium uppercase tracking-wider">{mode.label}</div>
                  <div className="text-[9px] text-[#979799] mt-0.5 leading-tight font-normal">
                    {mode.desc}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeSection === 'wheel' && (
          <div className="p-4 flex flex-col items-center justify-center gap-3">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full" viewBox="0 0 160 160">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#f2f2f3]" />
                <circle cx={cx} cy={cy} r={r - 12} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="text-[#f2f2f3]" />

                <line x1={cx - r - 5} y1={cy} x2={cx + r + 5} y2={cy} stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,2" className="text-[#f2f2f3]" />
                <line x1={cx} y1={cy - r - 5} x2={cx} y2={cy + r + 5} stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,2" className="text-[#f2f2f3]" />

                {wheelHues.map((item, idx) => {
                  const rad = (item.hue * Math.PI) / 180;
                  const x2 = cx + r * Math.cos(rad);
                  const y2 = cy + r * Math.sin(rad);
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={cx}
                      y1={cy}
                      x2={x2}
                      y2={y2}
                      stroke={item.hex}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  );
                })}

                <circle cx={cx} cy={cy} r="3.5" fill="currentColor" className="text-[#979799]" />

                {wheelHues.map((item, idx) => {
                  const rad = (item.hue * Math.PI) / 180;
                  const x = cx + r * Math.cos(rad);
                  const y = cy + r * Math.sin(rad);
                  return (
                    <g key={`point-${idx}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r="7"
                        fill={item.hex}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-white"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="2.5"
                        fill="currentColor"
                        className="text-white opacity-80"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            <span className="text-[9px] text-[#979799] font-medium uppercase tracking-wider">
              HSL Hue Space
            </span>
          </div>
        )}

        {activeSection === 'presets' && (
          <div className="p-3 flex flex-col gap-1.5">
            {PALETTE_PRESETS.map((p) => {
              const isActive = preset === p.name;
              return (
                <button
                  key={p.name}
                  onClick={() => loadPreset(p.name, p.colors)}
                  type="button"
                  className={`w-full flex items-center justify-between p-2 rounded-[16px] border transition-all cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#f2f2f3] border-[#17191c]'
                      : 'bg-white border-[#f2f2f3] hover:bg-[#fafafb]'
                  }`}
                >
                  <span className="text-xs font-medium text-[#17191c] ml-1">
                    {p.name}
                  </span>

                  <div className="flex rounded-md overflow-hidden border border-[#f2f2f3]">
                    {p.colors.map((color, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: color }}
                        className="w-3 h-4 block"
                      ></span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeSection === 'ai' && (
          <form onSubmit={handleGenerateAI} className="p-3.5 flex flex-col gap-3">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. warm beach sunset, clean fintech blue, dark neon cyberpunk..."
              rows={2}
              className="w-full p-2.5 text-xs font-medium rounded-[16px] bg-[#fafafb] border border-[#f2f2f3] focus:outline-none focus:ring-1 focus:ring-[#17191c] focus:border-[#17191c] text-[#17191c] leading-normal resize-none placeholder-[#a3a6af]"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[9999px] bg-[#17191c] hover:bg-[#17191c]/90 active:scale-[0.97] text-white text-xs font-medium transition-all cursor-pointer border-none"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Generate AI colors</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default PaletteGenerator;
