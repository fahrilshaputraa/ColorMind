import React from 'react';
import { getWcagScore } from '../../utils/contrast';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface ContrastBadgeProps {
  textHex: string;
  bgHex: string;
  size?: 'sm' | 'md';
}

export const ContrastBadge: React.FC<ContrastBadgeProps> = ({
  textHex,
  bgHex,
  size = 'md',
}) => {
  const { ratio, aaNormal, aaaNormal } = getWcagScore(textHex, bgHex);

  const getBadgeStyles = () => {
    if (aaaNormal) {
      return {
        bg: 'bg-[#f2f2f3] text-[#17191c] border-[#ececec]',
        text: 'AAA Pass',
        icon: ShieldCheck,
      };
    } else if (aaNormal) {
      return {
        bg: 'bg-[#fafafb] text-[#17191c] border-[#f2f2f3]',
        text: 'AA Pass',
        icon: ShieldCheck,
      };
    } else {
      return {
        bg: 'bg-[#fbe1d1] text-[#5d2a1a] border-[#fbe1d1]',
        text: 'Contrast Low',
        icon: ShieldAlert,
      };
    }
  };

  const badge = getBadgeStyles();
  const Icon = badge.icon;

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[9999px] text-[10px] font-medium border ${badge.bg}`}
        title={`Contrast Ratio: ${ratio}:1`}
      >
        <span>{ratio}:1</span>
        <span>{badge.text}</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[9999px] text-xs font-medium border ${badge.bg}`}
      title={`WCAG contrast check for text: ${textHex} on bg: ${bgHex}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>Contrast: {ratio}:1</span>
      <span className="opacity-80">({badge.text})</span>
    </div>
  );
};
export default ContrastBadge;
