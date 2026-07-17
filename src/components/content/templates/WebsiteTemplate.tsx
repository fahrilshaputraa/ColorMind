import React, { useState } from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem.ts';
import { ContrastBadge } from '../../shared/ContrastBadge.tsx';
import { ArrowRight, Shield, Heart, Zap, PlayCircle, Check, Activity, LayoutDashboard, BarChart3, Users, Settings, Lock, ArrowUpRight, ArrowDownRight, Database, FileSpreadsheet, BarChart } from 'lucide-react';

type ActivePage = 'landing' | 'login' | 'dashboard';

export const WebsiteTemplate: React.FC = () => {
  const tokens = useDesignSystem();
  const [activePage, setActivePage] = useState<ActivePage>('landing');

  const c1 = tokens.colors[0]?.hex || '#17191c';
  const c3 = tokens.colors[2]?.hex || '#f2f2f3';
  const c4 = tokens.colors[3]?.hex || '#fafafb';

  const paperBg = '#ffffff';
  const inkBlack = c1;
  const charcoalText = '#17191c';
  const borderMist = '1px solid #f2f2f3';
  const slateGrayText = '#777b86';

  const headingFontFamily = tokens.headingFont ? `"${tokens.headingFont.name}", "Source Serif 4", Georgia, ui-serif, serif` : '"Source Serif 4", Georgia, ui-serif, serif';
  const bodyFontFamily = tokens.bodyFont ? `"${tokens.bodyFont.name}", Inter, ui-sans-serif, system-ui, sans-serif` : 'Inter, ui-sans-serif, system-ui, sans-serif';

  const isActivePageStyle = (page: ActivePage) =>
    activePage === page
      ? 'bg-white text-[#17191c] shadow-sm'
      : 'bg-transparent text-[#979799] hover:text-[#17191c]';

  return (
    <div
      style={{ fontFamily: bodyFontFamily, backgroundColor: paperBg, color: charcoalText }}
      className="w-full min-h-full flex flex-col p-4 sm:p-8 select-none text-left"
    >
      <div style={{ borderBottom: borderMist }} className="flex flex-wrap items-center justify-between pb-4 mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-[#f2f2f3] p-1.5 rounded-[9999px]">
          <button onClick={() => setActivePage('landing')} type="button" className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-[9999px] text-xs sm:text-sm font-medium cursor-pointer transition-all ${isActivePageStyle('landing')}`}>Landing Page</button>
          <button onClick={() => setActivePage('login')} type="button" className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-[9999px] text-xs sm:text-sm font-medium cursor-pointer transition-all ${isActivePageStyle('login')}`}>Login Page</button>
          <button onClick={() => setActivePage('dashboard')} type="button" className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-[9999px] text-xs sm:text-sm font-medium cursor-pointer transition-all ${isActivePageStyle('dashboard')}`}>Dashboard</button>
        </div>
        <div className="flex gap-2">
          <ContrastBadge textHex={c1} bgHex={paperBg} size="sm" />
        </div>
      </div>

      {activePage === 'landing' && (
        <div className="flex flex-col gap-16 sm:gap-20 max-w-[1200px] mx-auto w-full">

          {/* Navigation — transparent, no bg, no shadow */}
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span style={{ backgroundColor: inkBlack, borderRadius: '6px' }} className="w-5.5 h-5.5 block"></span>
              <span style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '18px', color: inkBlack }} className="tracking-tight">Steep</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-normal tracking-tight" style={{ color: charcoalText }}>
              <span className="hover:opacity-70 cursor-pointer transition-opacity">Product</span>
              <span className="hover:opacity-70 cursor-pointer transition-opacity">Features</span>
              <span className="hover:opacity-70 cursor-pointer transition-opacity">Pricing</span>
              <span className="hover:opacity-70 cursor-pointer transition-opacity">Enterprise</span>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" className="text-sm font-normal bg-transparent border-none cursor-pointer" style={{ color: charcoalText }}>Sign in</button>
              <button type="button" style={{ backgroundColor: inkBlack, color: '#ffffff', borderRadius: '9999px' }} className="px-5 py-2 text-sm font-normal cursor-pointer border-none">Book a Demo</button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-12 gap-0 rounded-[24px] overflow-hidden">
            <div style={{ backgroundColor: c4 }} className="lg:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col gap-6 justify-center">
              <span style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: inkBlack }}>Editorial. Warm. Clear.</span>
              <h1 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: inkBlack }} className="text-balance">
                Analytics rendered as editorial — serif headlines on warm paper.
              </h1>
              <p style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '17px', lineHeight: 1.35, color: slateGrayText }} className="max-w-xl">
                Steep renders data on a near-monochrome white canvas with a single warm peach accent. No shadows, no glassmorphism — just layered surfaces and editorial typography.
              </p>
              <div className="flex items-center gap-3.5 mt-2">
                <button type="button" style={{ backgroundColor: inkBlack, color: '#ffffff', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400, fontFamily: bodyFontFamily }} className="flex items-center gap-2 cursor-pointer border-none">
                  Get started <ArrowRight className="w-4 h-4" />
                </button>
                <button type="button" style={{ color: inkBlack, border: '1px solid #17191c', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400, fontFamily: bodyFontFamily }} className="bg-transparent cursor-pointer">Book a demo</button>
              </div>
            </div>
            <div style={{ backgroundColor: c3 }} className="lg:col-span-5 p-8 sm:p-10 flex flex-col gap-5 justify-center">
              <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '16px 20px 12px 12px', boxShadow: '0 0 0 1px rgba(4,23,43,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: inkBlack }}></span>
                  <span className="text-[10px] font-medium" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>Region Table</span>
                </div>
                <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: c3 }}></div>
                <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: c4 }}></div>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '16px 20px 12px 12px', boxShadow: '0 0 0 1px rgba(4,23,43,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: inkBlack }}></span>
                  <span className="text-[10px] font-medium" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>Activation Chart</span>
                </div>
                <div className="flex gap-2">
                  <span className="h-6 w-8 rounded-sm" style={{ backgroundColor: c3 }}></span>
                  <span className="h-8 w-8 rounded-sm" style={{ backgroundColor: c4 }}></span>
                  <span className="h-10 w-8 rounded-sm" style={{ backgroundColor: inkBlack }}></span>
                </div>
              </div>
              <div style={{ backgroundColor: '#fbe1d1', borderRadius: '20px', padding: '16px 20px 12px 12px' }} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5d2a1a' }}></span>
                  <span className="text-[10px] font-medium" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>AI Composer</span>
                </div>
                <span className="text-lg font-normal" style={{ color: '#5d2a1a', fontFamily: headingFontFamily, fontWeight: 400 }}>Ask anything…</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div style={{ borderTop: borderMist, borderBottom: borderMist }} className="py-8 flex flex-col gap-4 text-center">
            <span style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979799' }}>Trusted by analytics organizations worldwide</span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4 opacity-50 font-normal tracking-tight text-xs sm:text-sm" style={{ color: charcoalText }}>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Acme Analytics</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> Globex Data</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Initech Labs</span>
              <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> Umbrella Corp</span>
            </div>
          </div>

          {/* Feature Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979799' }}>Why Steep</span>
              <h2 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: inkBlack }} className="mt-4">Analytics wrapped in editorial calm.</h2>
              <p style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '17px', lineHeight: 1.35, color: slateGrayText }} className="mt-4 max-w-lg">
                Our interface uses color as information, not decoration. Ink black for actions, mist gray for surfaces, peach for editorial emphasis — each hue has a job.
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: inkBlack }} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: inkBlack }}>Monochrome Color System</span>
                    <p className="text-xs mt-0.5" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Ink black + paper white + mist gray + peach accent — no chromatic hues outside the system.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: inkBlack }} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: inkBlack }}>Editorial Typography</span>
                    <p className="text-xs mt-0.5" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Signifier weight 400 for headings, Sohne for body — hushed and authoritative.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fbe1d1', borderRadius: '24px', padding: '42px' }} className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" style={{ color: '#5d2a1a' }} />
                <span className="text-xs font-medium" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>Patient Satisfaction</span>
              </div>
              <span style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: '#5d2a1a' }}>94.8%</span>
              <div className="h-2 rounded-full w-full" style={{ backgroundColor: '#fbe1d1' }}>
                <div className="h-full rounded-full" style={{ backgroundColor: '#5d2a1a', width: '94.8%' }}></div>
              </div>
              <p className="text-xs" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>Based on 12,849 patient surveys across 47 clinics.</p>
            </div>
          </div>

          {/* Features Grid — Neutral Cards */}
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: inkBlack }}>
                <BarChart className="w-5 h-5 text-white" />
              </div>
              <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '22px', lineHeight: 1.5, color: inkBlack }}>Analytics Suite</h3>
              <p className="text-xs leading-relaxed" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Real-time metrics rendered as clean editorial components — no dashboard clutter.</p>
            </div>
            <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: inkBlack }}>
                <FileSpreadsheet className="w-5 h-5 text-white" />
              </div>
              <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '22px', lineHeight: 1.5, color: inkBlack }}>Automated Reports</h3>
              <p className="text-xs leading-relaxed" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Generate compliant PDF reports with your brand's monochrome color palette.</p>
            </div>
            <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: inkBlack }}>
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '22px', lineHeight: 1.5, color: inkBlack }}>Team Workspace</h3>
              <p className="text-xs leading-relaxed" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Share design tokens, palettes, and component specs across your team.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col gap-8">
            <span style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979799' }}>Quick Answer</span>
            <div className="flex flex-col gap-0 divide-y" style={{ borderTop: borderMist }}>
              <div className="grid lg:grid-cols-2 gap-8 py-8">
                <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: inkBlack }} className="text-balance">Why no shadows on cards?</h3>
                <p style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '17px', lineHeight: 1.35, color: slateGrayText }}>Depth comes from layered tinted surfaces, not elevation. Paper white → fog white → mist gray creates hierarchy through color density alone, keeping the interface feeling like warm paper rather than glass.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 py-8">
                <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: inkBlack }} className="text-balance">What fonts does the system use?</h3>
                <p style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '17px', lineHeight: 1.35, color: slateGrayText }}>Signifier (weight 400) owns all display headings — serif, editorial, never bold. Sohne handles body copy, navigation, buttons, and captions in weights 400–500.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 py-8">
                <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: inkBlack }} className="text-balance">Is this accessible?</h3>
                <p style={{ fontFamily: bodyFontFamily, fontWeight: 400, fontSize: '17px', lineHeight: 1.35, color: slateGrayText }}>Yes. Ink Black provides WCAG AAA contrast on paper white. Surface colors (mist gray, fog white) are never used for text — they exist purely as background tints.</p>
              </div>
            </div>
          </div>

          {/* CTA Section — Accent Peach Card */}
          <div style={{ backgroundColor: '#fbe1d1', borderRadius: '9999px' }} className="p-10 md:p-14 text-center flex flex-col gap-6 items-center">
            <h2 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '44px', lineHeight: 1.3, letterSpacing: '-0.66px', color: '#5d2a1a' }} className="max-w-2xl">
              Ready to bring editorial clarity to your analytics platform?
            </h2>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color: '#5d2a1a', fontFamily: bodyFontFamily }}>
              Join leading organizations that use Steep's design system to create calm, rigorous analytical interfaces.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <button type="button" style={{ backgroundColor: '#5d2a1a', color: '#fbe1d1', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400 }} className="flex items-center gap-2 cursor-pointer border-none">
                Get started <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" style={{ color: '#5d2a1a', border: '1px solid #5d2a1a', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400 }} className="bg-transparent cursor-pointer">Contact sales</button>
            </div>
          </div>

          {/* Footer */}
          <footer style={{ borderTop: borderMist }} className="pt-10 pb-6 flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: inkBlack, borderRadius: '5px' }} className="w-5 h-5 block"></span>
              <span style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '14px', color: inkBlack }}>Steep</span>
            </div>
            <p className="text-[11px]" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>&copy; 2026 Steep. All rights reserved.</p>
            <div className="flex gap-6 text-[11px]" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Status</span>
            </div>
          </footer>
        </div>
      )}

      {activePage === 'login' && (
        <div className="flex-1 flex items-center justify-center py-6 sm:py-12 px-4">
          <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '42px' }} className="max-w-md w-full flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <span style={{ backgroundColor: inkBlack, borderRadius: '12px' }} className="w-8 h-8 block"></span>
              <h2 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '26px', lineHeight: 1.18, letterSpacing: '-0.23px', color: inkBlack }} className="tracking-tight">
                Welcome to Steep
              </h2>
              <p className="text-sm" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Sign in to your analytics workspace</p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>Email Address</label>
                <input type="email" placeholder="name@company.com" style={{ backgroundColor: '#ffffff', color: charcoalText, border: '1px solid #ececec', borderRadius: '16px', fontFamily: bodyFontFamily }} className="px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#17191c] placeholder-[#a3a6af]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>Password</label>
                  <a href="#" className="text-xs hover:underline" style={{ color: inkBlack, fontFamily: bodyFontFamily }}>Forgot password?</a>
                </div>
                <input type="password" placeholder="••••••••" style={{ backgroundColor: '#ffffff', color: charcoalText, border: '1px solid #ececec', borderRadius: '16px', fontFamily: bodyFontFamily }} className="px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#17191c]" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded accent-[#17191c]" />
                <label htmlFor="remember" className="text-xs cursor-pointer" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>Remember me for 30 days</label>
              </div>
              <button type="button" style={{ backgroundColor: inkBlack, color: '#ffffff', borderRadius: '9999px', padding: '14px 20px', fontSize: '16px', fontWeight: 400, fontFamily: bodyFontFamily }} className="w-full cursor-pointer border-none flex items-center justify-center gap-2 mt-2">
                <Lock className="w-3.5 h-3.5" /> Sign in
              </button>
            </form>
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t" style={{ borderColor: '#ececec' }}></div>
              <span className="flex-shrink mx-4 text-xs uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>or continue with</span>
              <div className="flex-grow border-t" style={{ borderColor: '#ececec' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" style={{ backgroundColor: '#ffffff', border: '1px solid #ececec', borderRadius: '9999px', color: charcoalText, fontFamily: bodyFontFamily, padding: '14px 20px', fontSize: '14px', fontWeight: 400 }} className="cursor-pointer">Google</button>
              <button type="button" style={{ backgroundColor: '#ffffff', border: '1px solid #ececec', borderRadius: '9999px', color: charcoalText, fontFamily: bodyFontFamily, padding: '14px 20px', fontSize: '14px', fontWeight: 400 }} className="cursor-pointer">GitHub</button>
            </div>
            <p className="text-xs text-center" style={{ color: charcoalText, fontFamily: bodyFontFamily }}>
              Don't have an account?{' '}
              <a href="#" className="font-medium hover:underline" style={{ color: inkBlack }} onClick={() => setActivePage('landing')}>Sign up free</a>
            </p>
          </div>
        </div>
      )}

      {activePage === 'dashboard' && (
        <div className="flex-1 flex lg:flex-row gap-6 mt-2 max-w-[1200px] mx-auto w-full">
          <aside style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="w-full lg:w-56 flex flex-col gap-6 shrink-0">
            <div className="flex items-center gap-2 px-1">
              <span style={{ backgroundColor: inkBlack, borderRadius: '6px' }} className="w-5.5 h-5.5 block"></span>
              <span style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '14px', color: inkBlack }}>Steep</span>
            </div>
            <nav className="flex lg:flex-col flex-wrap gap-1">
              <button style={{ color: inkBlack, fontFamily: bodyFontFamily }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9999px] text-sm font-medium bg-white/60 border-none cursor-pointer">
                <LayoutDashboard className="w-4 h-4" /> Overview
              </button>
              <button style={{ color: charcoalText, fontFamily: bodyFontFamily }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9999px] text-sm font-medium bg-transparent border-none cursor-pointer hover:bg-white/30">
                <BarChart3 className="w-4 h-4" /> Analytics
              </button>
              <button style={{ color: charcoalText, fontFamily: bodyFontFamily }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9999px] text-sm font-medium bg-transparent border-none cursor-pointer hover:bg-white/30">
                <Users className="w-4 h-4" /> Audience
              </button>
              <button style={{ color: charcoalText, fontFamily: bodyFontFamily }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9999px] text-sm font-medium bg-transparent border-none cursor-pointer hover:bg-white/30">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>
          </aside>

          <div className="flex-grow flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 style={{ fontFamily: headingFontFamily, fontWeight: 400, fontSize: '26px', lineHeight: 1.18, letterSpacing: '-0.23px', color: inkBlack }}>Performance Overview</h2>
              <span className="text-xs font-normal" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Last updated: Just now</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Total Revenue</span>
                  <span className="flex items-center text-xs font-medium text-[#17191c] bg-[#f2f2f3] px-2 py-0.5 rounded-[9999px]">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" /> +12.5%
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-mono" style={{ color: inkBlack }}>$48,259.00</h3>
                <span className="text-xs" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>vs $42,890.00 last month</span>
              </div>
              <div style={{ backgroundColor: '#fafafb', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Active Sessions</span>
                  <span className="flex items-center text-xs font-medium text-[#17191c] bg-[#f2f2f3] px-2 py-0.5 rounded-[9999px]">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" /> +4.2%
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-mono" style={{ color: inkBlack }}>12,849</h3>
                <span className="text-xs" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>vs 12,324 last month</span>
              </div>
              <div style={{ backgroundColor: '#f2f2f3', borderRadius: '24px', padding: '28px' }} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Bounce Rate</span>
                  <span className="flex items-center text-xs font-medium text-[#17191c] bg-[#f2f2f3] px-2 py-0.5 rounded-[9999px]">
                    <ArrowDownRight className="w-4 h-4 mr-0.5" /> -1.8%
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-mono" style={{ color: inkBlack }}>38.2%</h3>
                <span className="text-xs" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>vs 40.0% last month</span>
              </div>
            </div>

            <div style={{ borderRadius: '24px', padding: '28px', border: borderMist, backgroundColor: paperBg }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: inkBlack }} />
                  <span className="text-base font-medium" style={{ color: inkBlack, fontFamily: bodyFontFamily }}>User Conversion Pipeline</span>
                </div>
                <span className="text-xs font-medium uppercase" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Monthly Cohorts</span>
              </div>
              <div className="h-44 flex items-end gap-3 pt-4 pb-2" style={{ borderBottom: borderMist }}>
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-[24px]" style={{ height: '45%', backgroundColor: c3 }}></div>
                  <span className="text-xs font-medium" style={{ color: slateGrayText }}>May</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-[24px]" style={{ height: '60%', backgroundColor: c4 }}></div>
                  <span className="text-xs font-medium" style={{ color: slateGrayText }}>Jun</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-[24px]" style={{ height: '85%', backgroundColor: inkBlack }}></div>
                  <span className="text-xs font-medium" style={{ color: inkBlack }}>Jul</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-[24px]" style={{ height: '70%', backgroundColor: c3 }}></div>
                  <span className="text-xs font-medium" style={{ color: slateGrayText }}>Aug</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-[24px]" style={{ height: '75%', backgroundColor: c4 }}></div>
                  <span className="text-xs font-medium" style={{ color: slateGrayText }}>Sep</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{ borderRadius: '24px', padding: '28px', border: borderMist, backgroundColor: paperBg }} className="flex flex-col gap-3.5">
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>Recent Signups</span>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: borderMist }}>
                    <span className="font-medium" style={{ color: charcoalText }}>john.smith@gmail.com</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-[9999px]" style={{ backgroundColor: '#f2f2f3', color: inkBlack, fontFamily: bodyFontFamily }}>Premium</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: borderMist }}>
                    <span className="font-medium" style={{ color: charcoalText }}>alexa.v@company.io</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-[9999px]" style={{ backgroundColor: '#fafafb', color: slateGrayText, fontFamily: bodyFontFamily }}>Trial</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="font-medium" style={{ color: charcoalText }}>t.brown@outlook.com</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-[9999px]" style={{ backgroundColor: '#f2f2f3', color: inkBlack, fontFamily: bodyFontFamily }}>Premium</span>
                  </div>
                </div>
              </div>
              <div style={{ borderRadius: '24px', padding: '28px', border: borderMist, backgroundColor: paperBg }} className="flex flex-col gap-3.5">
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#979799', fontFamily: bodyFontFamily }}>System Health</span>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5" style={{ color: inkBlack }} />
                    <div className="flex-grow">
                      <div className="text-sm font-medium" style={{ color: charcoalText }}>PostgreSQL Server</div>
                      <div className="text-xs" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Connected &bull; 12ms latency</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-[9999px]" style={{ backgroundColor: '#f2f2f3', color: inkBlack }}>OK</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5" style={{ color: inkBlack }} />
                    <div className="flex-grow">
                      <div className="text-sm font-medium" style={{ color: charcoalText }}>Redis Cache</div>
                      <div className="text-xs" style={{ color: slateGrayText, fontFamily: bodyFontFamily }}>Connected &bull; 2.4k ops/sec</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-[9999px]" style={{ backgroundColor: '#f2f2f3', color: inkBlack }}>OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WebsiteTemplate;
