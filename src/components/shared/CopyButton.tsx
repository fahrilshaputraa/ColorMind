import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  showIconOnly?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label,
  className = '',
  showIconOnly = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`Copied: ${value}`, {
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-200 cursor-pointer shadow-xs ${className}`}
      title={`Copy "${value}"`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500 animate-in fade-in zoom-in-50 duration-200" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-neutral-400" />
      )}
      {!showIconOnly && <span>{copied ? 'Copied!' : label || value}</span>}
    </button>
  );
};
export default CopyButton;
