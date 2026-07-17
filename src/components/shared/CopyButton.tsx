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

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-[9999px] border border-[#f2f2f3] bg-white text-[#777b86] hover:text-[#17191c] hover:bg-[#fafafb] active:bg-[#f2f2f3] transition-all duration-200 cursor-pointer ${className}`}
      title={`Copy "${value}"`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[#17191c] animate-in fade-in zoom-in-50 duration-200" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-[#979799]" />
      )}
      {!showIconOnly && <span>{copied ? 'Copied!' : label || value}</span>}
    </button>
  );
};
export default CopyButton;
