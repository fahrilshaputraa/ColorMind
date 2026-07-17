import React from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { useUIStore } from '../../../store/uiStore';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { ArrowRight, Layout, Star, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateTypeScale } from '../../../utils/typography.ts';

export const WebsiteTemplate: React.FC = () => {
  const tokens = useDesignSystem();
  const { theme } = useUIStore();

  const c1 = tokens.colors[0]?.hex || '#3b82f6';
  const c2 = tokens.colors[1]?.hex || '#10b981';
  const c3 = tokens.colors[2]?.hex || '#f59e0b';

  const scale = generateTypeScale(tokens.baseFontSize, tokens.typeScaleRatio);

  const headingStyle = {
    fontFamily: tokens.headingFont ? `"${tokens.headingFont.name}", sans-serif` : 'sans-serif',
  };

  const bodyStyle = {
    fontFamily: tokens.bodyFont ? `"${tokens.bodyFont.name}", sans-serif` : 'sans-serif',
    fontSize: `${scale.base}px`,
  };

  const handleCopyClass = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied class: ${className}`);
  };

  const isDarkPreview = theme === 'dark';

  // Dynamic spacing multipliers
  const pyNavbar = `${tokens.baseUnit * 2}px`;
  const mbHero = `${tokens.baseUnit * 6}px`;
  const mbNav = `${tokens.baseUnit * 6}px`;
  const gapHero = `${tokens.baseUnit * 5}px`;
  const pCard = `${tokens.baseUnit * 2.5}px`;
  const pMockup = `${tokens.baseUnit * 3}px`;
  
  // Dynamic border radius
  const rButton = `${tokens.borderRadius.md}px`;
  const rCard = `${tokens.borderRadius.xl}px`;
  const rBadge = `${tokens.borderRadius.full}px`;

  // Dynamic shadows
  const sCard = tokens.boxShadow.md;
  const sMockup = tokens.boxShadow.lg;

  return (
    <div
      style={bodyStyle}
      className={`w-full min-h-full flex flex-col transition-all duration-300 p-8 select-none ${
        isDarkPreview ? 'bg-neutral-900 text-neutral-100' : 'bg-white text-neutral-800'
      }`}
    >
      {/* Visual Helper: Contrast Checker for Heading & Background */}
      <div className="flex items-center justify-between border-b pb-4 mb-6 border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-semibold text-neutral-400">Interactive Landing Page Preview</span>
        <div className="flex gap-2">
          <ContrastBadge textHex={c1} bgHex={isDarkPreview ? '#171717' : '#ffffff'} size="sm" />
          <ContrastBadge textHex={c2} bgHex={isDarkPreview ? '#171717' : '#ffffff'} size="sm" />
        </div>
      </div>

      {/* Header / Navbar */}
      <nav style={{ marginBottom: mbNav, paddingTop: pyNavbar, paddingBottom: pyNavbar }} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ backgroundColor: c1, borderRadius: rButton }} className="w-6 h-6 block"></span>
          <span style={{ ...headingStyle, fontSize: `${scale.lg}px` }} className="font-extrabold tracking-tight">
            SaaSify
          </span>
        </div>
        <div style={{ fontSize: `${scale.sm}px` }} className="hidden md:flex items-center gap-6 font-semibold">
          <span className="hover:opacity-85 cursor-pointer">Product</span>
          <span className="hover:opacity-85 cursor-pointer">Features</span>
          <span className="hover:opacity-85 cursor-pointer">Pricing</span>
          <span className="hover:opacity-85 cursor-pointer">Contact</span>
        </div>
        <button
          onClick={() => handleCopyClass(`bg-[${c1}] text-white rounded-lg`)}
          style={{ backgroundColor: c1, borderRadius: rButton, fontSize: `${scale.xs}px` }}
          type="button"
          className="px-4 py-2 font-bold text-white hover:brightness-105 active:scale-97 transition-all cursor-pointer shadow-sm border-none"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{ gap: gapHero, marginBottom: mbHero }} className="grid md:grid-cols-2 items-center">
        <div className="flex flex-col gap-6 text-left">
          <span
            style={{ color: c2, backgroundColor: c2 + '15', borderRadius: rBadge, fontSize: `${scale.xs}px` }}
            className="inline-flex self-start items-center gap-1.5 px-3 py-1 font-bold border border-neutral-200/50"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Introducing ColorMind Generator
          </span>
          
          <h2
            style={{ ...headingStyle, fontSize: `${scale['3xl']}px` }}
            className="font-black leading-tight tracking-tight text-neutral-900 dark:text-white"
          >
            Membangun <span style={{ color: c1 }}>Aplikasi</span> Lebih Cepat & Indah
          </h2>
          
          <p style={{ fontSize: `${scale.base}px` }} className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Pilih palet warna harmonis, kustomisasi typography Google Fonts, dan langsung dapatkan
            konfigurasi Tailwind yang siap pakai untuk proyek Anda berikutnya.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopyClass(`bg-[${c1}] text-white hover:bg-[${c1}]/90`)}
              style={{ backgroundColor: c1, borderRadius: rButton, fontSize: `${scale.xs}px` }}
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 font-bold text-white hover:brightness-105 active:scale-97 transition-all cursor-pointer shadow-md border-none"
            >
              <span>Mulai Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleCopyClass(`border-[${c1}] text-[${c1}]`)}
              style={{ borderColor: c1, color: c1, borderRadius: rButton, fontSize: `${scale.xs}px` }}
              type="button"
              className="px-5 py-2.5 font-bold bg-transparent border hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-97 transition-all cursor-pointer"
            >
              Pelajari Fitur
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div style={{ borderRadius: rCard, boxShadow: sMockup }} className="relative p-2 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div style={{ borderRadius: rCard, padding: pMockup }} className="bg-white dark:bg-neutral-900 flex flex-col gap-4 text-left border">
            <div className="flex items-center gap-2 border-b pb-3 mb-2 border-neutral-100 dark:border-neutral-800">
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c1 }}></span>
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c2 }}></span>
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c3 }}></span>
            </div>
            
            <h4 style={{ ...headingStyle, fontSize: `${scale.lg}px` }} className="font-extrabold">
              Panel Statistik Design System
            </h4>
            <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-2 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700"></div>
            
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div style={{ backgroundColor: c1 + '12', borderColor: c1, borderRadius: rButton }} className="border p-3 flex flex-col gap-1">
                <span style={{ fontSize: `${scale.xs}px` }} className="text-neutral-400 font-bold">Warna 1</span>
                <span style={{ fontSize: `${scale.xs}px`, color: c1 }} className="font-extrabold">{c1}</span>
              </div>
              <div style={{ backgroundColor: c2 + '12', borderColor: c2, borderRadius: rButton }} className="border p-3 flex flex-col gap-1">
                <span style={{ fontSize: `${scale.xs}px` }} className="text-neutral-400 font-bold">Warna 2</span>
                <span style={{ fontSize: `${scale.xs}px`, color: c2 }} className="font-extrabold">{c2}</span>
              </div>
              <div style={{ backgroundColor: c3 + '12', borderColor: c3, borderRadius: rButton }} className="border p-3 flex flex-col gap-1">
                <span style={{ fontSize: `${scale.xs}px` }} className="text-neutral-400 font-bold">Warna 3</span>
                <span style={{ fontSize: `${scale.xs}px`, color: c3 }} className="font-extrabold">{c3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="grid md:grid-cols-3 gap-6 pt-6 mb-8">
        <div style={{ borderRadius: rCard, padding: pCard, boxShadow: sCard }} className="flex flex-col gap-3 border border-neutral-150 dark:border-neutral-800 hover:shadow-lg transition-all duration-300">
          <div style={{ backgroundColor: c1 + '15', color: c1, borderRadius: rButton }} className="w-10 h-10 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <h4 style={{ ...headingStyle, fontSize: `${scale.base}px` }} className="font-bold">Flexible Layout</h4>
          <p style={{ fontSize: `${scale.xs}px` }} className="text-neutral-500 dark:text-neutral-400 leading-normal">
            Tata letak responsif yang dirancang khusus untuk memvisualisasikan data Anda di desktop atau mobile.
          </p>
        </div>

        <div style={{ borderRadius: rCard, padding: pCard, boxShadow: sCard }} className="flex flex-col gap-3 border border-neutral-150 dark:border-neutral-800 hover:shadow-lg transition-all duration-300">
          <div style={{ backgroundColor: c2 + '15', color: c2, borderRadius: rButton }} className="w-10 h-10 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <h4 style={{ ...headingStyle, fontSize: `${scale.base}px` }} className="font-bold">Harmonious Scales</h4>
          <p style={{ fontSize: `${scale.xs}px` }} className="text-neutral-500 dark:text-neutral-400 leading-normal">
            Skala warna harmoni dan typography Google Fonts yang telah teruji untuk kenyamanan membaca.
          </p>
        </div>

        <div style={{ borderRadius: rCard, padding: pCard, boxShadow: sCard }} className="flex flex-col gap-3 border border-neutral-150 dark:border-neutral-800 hover:shadow-lg transition-all duration-300">
          <div style={{ backgroundColor: c3 + '15', color: c3, borderRadius: rButton }} className="w-10 h-10 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h4 style={{ ...headingStyle, fontSize: `${scale.base}px` }} className="font-bold">High Accessibility</h4>
          <p style={{ fontSize: `${scale.xs}px` }} className="text-neutral-500 dark:text-neutral-400 leading-normal">
            Setiap kombinasi warna diperiksa secara instan dengan standard WCAG AA/AAA compliance.
          </p>
        </div>
      </div>
    </div>
  );
};
export default WebsiteTemplate;
