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
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#979799] uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-[#777b86]" />
          <span>Tailwind & Figma config</span>
        </span>

        <div className="flex items-center gap-1 bg-[#f2f2f3] p-0.5 rounded-[9999px] font-sans">
          <button
            onClick={() => setConfigFormat('v4')}
            type="button"
            className={`px-2 py-1 rounded-[9999px] text-[10px] font-medium cursor-pointer transition-all ${
              configFormat === 'v4'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            v4 CSS
          </button>

          <button
            onClick={() => setConfigFormat('v3')}
            type="button"
            className={`px-2 py-1 rounded-[9999px] text-[10px] font-medium cursor-pointer transition-all ${
              configFormat === 'v3'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            v3 JS
          </button>

          <button
            onClick={() => setConfigFormat('figma')}
            type="button"
            className={`px-2 py-1 rounded-[9999px] text-[10px] font-medium cursor-pointer transition-all ${
              configFormat === 'figma'
                ? 'bg-white text-[#17191c]'
                : 'text-[#979799] hover:text-[#17191c]'
            }`}
          >
            Figma JSON
          </button>
        </div>
      </div>

      <div className="relative group rounded-[24px] overflow-hidden border border-[#f2f2f3] bg-[#17191c]">
        <button
          onClick={handleCopyAll}
          type="button"
          className="absolute top-3 right-3 p-2 rounded-[9999px] bg-white/10 hover:bg-white/20 active:bg-white/35 transition-colors cursor-pointer text-white/95"
          title="Copy full code"
        >
          {copied ? <Check className="w-4 h-4 text-[#fbe1d1]" /> : <Clipboard className="w-4 h-4" />}
        </button>

        <pre className="p-4 overflow-x-auto text-[10px] font-mono leading-relaxed text-[#fafafb] max-h-[350px] custom-scrollbar">
          <code>{getOutputCode()}</code>
        </pre>
      </div>
      <p className="text-[10px] text-[#979799] leading-normal font-normal">
        *Klik tombol salin di atas untuk meng-copy seluruh token design system dan meletakkannya di project Anda.
      </p>
    </div>
  );
};
export default TailwindPreview;
