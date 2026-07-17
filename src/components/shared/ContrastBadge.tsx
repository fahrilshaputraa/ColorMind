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
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        text: 'AAA Pass',
        icon: ShieldCheck,
      };
    } else if (aaNormal) {
      return {
        bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        text: 'AA Pass',
        icon: ShieldCheck,
      };
    } else {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
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
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}
        title={`Contrast Ratio: ${ratio}:1`}
      >
        <span>{ratio}:1</span>
        <span>{badge.text}</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
      title={`WCAG contrast check for text: ${textHex} on bg: ${bgHex}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>Contrast: {ratio}:1</span>
      <span className="opacity-80">({badge.text})</span>
    </div>
  );
};
export default ContrastBadge;
