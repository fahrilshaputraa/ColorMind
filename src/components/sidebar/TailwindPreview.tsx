import React, { useState } from 'react';
import { usePaletteStore } from '../../store/paletteStore.ts';
import { useTypographyStore } from '../../store/typographyStore.ts';
import { useSpacingStore } from '../../store/spacingStore.ts';
import { generateTailwindJSConfig, generateTailwindCSSConfig, generateFigmaTokensConfig } from '../../utils/tailwind.ts';
import { Clipboard, Check } from 'lucide-react';
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
    if (configFormat === 'v4') return generateTailwindCSSConfig(configData);
    if (configFormat === 'figma') return generateFigmaTokensConfig(configData);
    return generateTailwindJSConfig(configData);
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(getOutputCode());
      setCopied(true);
      toast.success('Copied to clipboard!', {
        style: {
          background: '#17191c',
          color: '#ffffff',
          borderRadius: '9999px',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const formats: { id: 'v4' | 'v3' | 'figma'; label: string }[] = [
    { id: 'v4', label: 'v4 CSS' },
    { id: 'v3', label: 'v3 JS' },
    { id: 'figma', label: 'Figma' },
  ];

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Format selector + copy button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5 bg-[#f2f2f3] p-0.5 rounded-[9999px]">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setConfigFormat(fmt.id)}
              type="button"
              className={`px-2.5 py-1 rounded-[9999px] text-[10px] font-medium cursor-pointer transition-all ${
                configFormat === fmt.id
                  ? 'bg-white text-[#17191c]'
                  : 'text-[#979799] hover:text-[#17191c]'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopyAll}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[9999px] text-[10px] font-medium transition-all cursor-pointer border-none ${
            copied
              ? 'bg-[#fbe1d1] text-[#5d2a1a]'
              : 'bg-[#17191c] text-white hover:bg-[#17191c]/90'
          }`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
          <span>{copied ? 'Copied!' : 'Copy all'}</span>
        </button>
      </div>

      {/* Code block */}
      <div className="relative rounded-[20px] overflow-hidden border border-[#f2f2f3] bg-[#17191c]">
        <pre className="p-3.5 overflow-x-auto text-[9px] font-mono leading-relaxed text-[#fafafb] max-h-[320px] custom-scrollbar">
          <code>{getOutputCode()}</code>
        </pre>
      </div>
    </div>
  );
};
export default TailwindPreview;
