import React from 'react';
import { MapPin, Clock, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { SnipeLogo } from './SnipeLogo';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white animate-fadeIn space-y-16">
      {/* Hero Banner Section */}
      <div className="relative rounded-none overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-16 text-center space-y-6">
        <div className="flex justify-center mb-2">
          <SnipeLogo size="lg" showTagline={false} />
        </div>
        <span className="text-xs font-mono-brand text-red-500 tracking-[0.4em] uppercase block font-bold">
          NO DISTRACTIONS. ONLY DIRECTION.
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-white max-w-4xl mx-auto leading-tight">
          PRECISION • CRAFTSMANSHIP • STREET LUXURY
        </h1>
        <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
          SNIPELUXE is an avant-garde luxury streetwear label engineered for those who move with singular focus. Every garment features razor-sharp architectural paneling, heavyweight raw textiles, and uncompromising attention to hardware.
        </p>
      </div>

      {/* Grid: 2 Column Editorial Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-8">
          <img
            src="/products/snipe-jacket-back.png"
            alt="SNIPELUXE Directional Jacket Embroidery"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)]"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-zinc-800 px-4 py-2 flex justify-between items-center text-[10px] font-mono-brand">
            <span className="text-zinc-400">ARCHIVAL SPECIMEN</span>
            <span className="text-red-500 font-bold">DROP 01</span>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-xs font-mono-brand text-red-500 tracking-[0.3em] uppercase block font-bold">
            THE SNIPELUXE CREED
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold tracking-wide uppercase text-white">
            "NO DISTRACTIONS. ONLY DIRECTION."
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
            Founded to eliminate the noise of fast fashion, SNIPELUXE designs high-impact capsule drops tailored in limited quantities. We believe luxury lies in deliberate weight, crisp silhouettes, and unyielding identity.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            From our signature Directional Racing Track Jacket with reflective technical piping to our 14.5oz raw indigo selvedge denim tailored with gold topstitching, each piece is designed for longevity and presence.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-zinc-800 font-mono-brand text-xs">
            <div className="flex items-center space-x-2 text-zinc-300">
              <Award className="w-4 h-4 text-red-500" />
              <span>Heavyweight 14.5oz Denim</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-300">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Exclusive Capsule Runs</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>DHL Express Worldwide</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Flagship Atelier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Atelier Details Card */}
      <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono-brand text-zinc-400 tracking-[0.3em] uppercase">
            FLAGSHIP ATELIER & SHOWROOM
          </span>
          <h3 className="font-serif-brand text-2xl font-bold uppercase text-white">
            SNIPELUXE PRIVATE CLIENT STUDIO
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Experience the SNIPELUXE collections in person, request custom sizing, or arrange VIP private appointments at our flagship atelier.
          </p>

          <div className="space-y-3 font-mono-brand text-xs text-zinc-300 pt-2">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>
                SNIPELUXE ATELIER, ADMIRALTY WAY, LEKKI PHASE 1, LAGOS & WORLDWIDE
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Hours: Monday – Saturday (10am - 8pm) | Sunday by VIP Appointment</span>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="#contact"
              className="inline-block bg-white text-black px-6 py-3 text-xs font-mono-brand font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              BOOK PRIVATE CLIENT FITTING
            </a>
          </div>
        </div>

        <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center p-6">
          <img
            src="/products/snipe-denim-front.png"
            alt="SNIPELUXE Raw Indigo Jeans"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>
    </div>
  );
};
