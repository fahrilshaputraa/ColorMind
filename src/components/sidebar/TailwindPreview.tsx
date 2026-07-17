import React, { useState } from 'react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import { useTypographyStore } from '../../store/typographyStore.ts';
import { useSpacingStore } from '../../store/spacingStore.ts';
import { generateTailwindJSConfig, generateTailwindCSSConfig, generateFigmaTokensConfig } from '../../utils/tailwind.ts';
import { Code2, Clipboard, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const TailwindPreview: React.FC = () => {
  const [configFormat, setConfigFormat] = useState<'v4' | 'v3' | 'figma'>('v4');
  const [copied, setCopied] = useState(false);

  const { colors, shadeScale } = usePaletteStore();
  const { headingFont, bodyFont, monoFont } = useTypographyStore();
  const { borderRadius, baseUnit } = useSpacingStore();

  const configData = {
    colors,
    shadeScale,
    headingFont,
    bodyFont,
    monoFont,
    borderRadius,
    baseUnit,
  };

  const getOutputCode = () => {
    if (configFormat === 'v4') {
      return generateTailwindCSSConfig(configData);
    }
    if (configFormat === 'figma') {
      return generateFigmaTokensConfig(configData);
    }
    return generateTailwindJSConfig(configData);
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(getOutputCode());
      setCopied(true);
      toast.success('Copied config code to clipboard!', {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Selector format */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-violet-500" />
          <span>Tailwind & Figma config</span>
        </span>
        
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-750 font-sans">
          <button
            onClick={() => setConfigFormat('v4')}
            type="button"
            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
              configFormat === 'v4'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400'
            }`}
          >
            v4 CSS
          </button>
          
          <button
            onClick={() => setConfigFormat('v3')}
            type="button"
            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
              configFormat === 'v3'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400'
            }`}
          >
            v3 JS
          </button>

          <button
            onClick={() => setConfigFormat('figma')}
            type="button"
            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
              configFormat === 'figma'
                ? 'bg-white dark:bg-neutral-700 text-violet-600 dark:text-violet-300 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400'
            }`}
          >
            Figma JSON
          </button>
        </div>
      </div>

      {/* Code Area Wrapper */}
      <div className="relative group rounded-xl overflow-hidden border border-neutral-250 dark:border-neutral-800/80 bg-neutral-900 shadow-lg">
        {/* Copy Floating Button */}
        <button
          onClick={handleCopyAll}
          type="button"
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/35 transition-colors cursor-pointer text-white/95"
          title="Copy full code"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4" />}
        </button>

        {/* Monospaced code output */}
        <pre className="p-4 overflow-x-auto text-[10px] font-mono leading-relaxed text-neutral-300 max-h-[350px] custom-scrollbar">
          <code>{getOutputCode()}</code>
        </pre>
      </div>
      <p className="text-[10px] text-neutral-400 leading-normal font-semibold">
        *Klik tombol salin di atas untuk meng-copy seluruh token design system dan meletakkannya di project Anda.
      </p>
    </div>
  );
};
export default TailwindPreview;
