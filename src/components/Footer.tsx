import React, { useState } from 'react';
import { TabType } from '../types';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, Truck, Globe, Check } from 'lucide-react';
import { SnipeLogo } from './SnipeLogo';

interface FooterProps {
  onNavigateTab: (tab: TabType) => void;
  onNavigateShopCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onNavigateShopCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-800 text-white text-xs pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Banner */}
        <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono-brand text-amber-400 uppercase tracking-[0.3em]">
              EXCLUSIVE VIP CLUB
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-wider uppercase font-serif-brand">
              GET 10% OFF YOUR NEXT ORDER
            </h3>
            <p className="text-xs text-zinc-400 font-mono-brand max-w-md">
              Subscribe to receive exclusive access to limited drops, private sales, and fashion show previews.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 font-mono-brand text-xs bg-emerald-950/60 border border-emerald-800 p-3">
                <Check className="w-4 h-4" />
                <span>WELCOME TO THE HF CLUB! USE CODE <strong>HF10</strong> FOR 10% OFF.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-white flex-1 font-mono-brand"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-mono-brand font-bold px-6 py-3 uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
          {/* Brand Intro */}
          <div className="space-y-4">
            <SnipeLogo size="sm" showTagline={true} />
            <p className="text-xs text-zinc-400 leading-relaxed">
              At SNIPELUXE, we design high-impact luxury streetwear engineered with deliberate weight, architectural paneling, and zero distractions.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/snipeluxe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white font-mono-brand text-xs transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@snipeluxe</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-brand uppercase tracking-widest text-white border-b border-zinc-900 pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono-brand">
              <li>
                <button
                  onClick={() => onNavigateTab('HOME')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('ABOUT')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('CONTACT')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CONTACT US
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('FAQ')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FREQUENTLY ASKED QUESTIONS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('TRACK YOUR ORDER')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  TRACK YOUR ORDER
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-brand uppercase tracking-widest text-white border-b border-zinc-900 pb-2">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono-brand">
              <li>
                <button
                  onClick={() => onNavigateShopCategory('All Products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SHOP ALL PRODUCTS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShopCategory('New In')}
                  className="hover:text-white transition-colors cursor-pointer text-amber-400"
                >
                  NEW ARRIVALS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShopCategory('Tracksuits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  TRACKSUITS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShopCategory('Accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ACCESSORIES & HATS
                </button>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-brand uppercase tracking-widest text-white border-b border-zinc-900 pb-2">
              LAGOS BOUTIQUE
            </h4>
            <div className="text-xs text-zinc-400 font-mono-brand space-y-2">
              <p>SHOP 38/39, AARON'S LEKKI MALL, ADMIRALTY WAY, LAGOS, NIGERIA</p>
              <p className="text-[11px] text-zinc-500">
                Operating hours: Mon – Sat (10am - 8pm) | Sun (12pm - 8pm)
              </p>
              <a
                href="https://maps.google.com/?q=Aaron's+Lekki+Mall+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white underline hover:text-zinc-300 pt-1"
              >
                GET DIRECTIONS →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono-brand text-zinc-500 space-y-4 sm:space-y-0">
          <span>© 2026 SNIPELUXE. All Rights Reserved.</span>
          <div className="flex space-x-6 uppercase">
            <span>NO DISTRACTIONS. ONLY DIRECTION.</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
