import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield } from 'lucide-react';

interface HeroBannerProps {
  onExploreCategory: (cat: string) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'CAPSULE 01 • FLAGSHIP OUTERWEAR',
    title: 'SNIPE DIRECTIONAL TRACK JACKET',
    subtitle: 'NO DISTRACTIONS. ONLY DIRECTION.',
    description: 'Constructed from high-density technical shell with reflective contour piping, stand collar, and the signature SNIPELUXE directional star crest.',
    bgImage: '/products/snipe-jacket-back.png',
    images: [
      {
        src: '/products/snipe-jacket-front.png',
        label: 'FRONT PROFILE',
        caption: 'REFLECTIVE PIPING',
      },
      {
        src: '/products/snipe-jacket-back.png',
        label: 'BACK CREST',
        caption: 'NO DISTRACTIONS',
      },
      {
        src: '/products/snipe-denim-front.png',
        label: 'MATCHING LOOK',
        caption: 'RAW INDIGO',
      },
    ],
    category: 'Jackets',
    buttonText: 'SHOP TRACK JACKET',
  },
  {
    id: 2,
    tag: 'RAW SELVEDGE STREETWEAR',
    title: 'SNIPE RAW INDIGO BAGGY JEANS',
    subtitle: 'HEAVYWEIGHT OVERSIZED SILHOUETTE',
    description: '14.5oz raw rigid indigo denim featuring distinctive gold contrast topstitching, solid brass hardware, and bold vertical SNIPE typography.',
    bgImage: '/products/snipe-denim-back.png',
    images: [
      {
        src: '/products/snipe-denim-front.png',
        label: 'FRONT DRAPE',
        caption: 'OVERSIZED CUT',
      },
      {
        src: '/products/snipe-denim-back.png',
        label: 'REAR PROFILE',
        caption: 'GOLD STENCIL',
      },
      {
        src: '/products/snipe-denim-detail.png',
        label: 'HARDWARE & WAIST',
        caption: 'BRASS SHANK',
      },
    ],
    category: 'Denim',
    buttonText: 'SHOP RAW DENIM',
  },
  {
    id: 3,
    tag: 'LIMITED CAPSULE DROP',
    title: 'THE COMPLETE SNIPELUXE UNIFORM',
    subtitle: 'COORDINATED LUXURY ESSENTIALS',
    description: 'The definitive look for the season. Pair the Directional Racing Jacket with the Raw Indigo Baggy Jeans for an uncompromising luxury presence.',
    bgImage: '/products/snipe-jacket-front.png',
    images: [
      {
        src: '/products/snipe-jacket-front.png',
        label: 'RACING JACKET',
        caption: 'TECHNICAL SHELL',
      },
      {
        src: '/products/snipe-jacket-back.png',
        label: 'STATEMENT BACK',
        caption: 'STAR EMBROIDERY',
      },
      {
        src: '/products/snipe-denim-front.png',
        label: 'BAGGY DENIM',
        caption: '14.5OZ RAW INDIGO',
      },
    ],
    category: 'Tracksuits',
    buttonText: 'EXPLORE CAPSULE 01',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full min-h-[680px] lg:h-[82vh] max-h-[920px] bg-black overflow-hidden border-b border-zinc-800/80 flex items-center">
      {/* Background Model / Editorial Image Layer - Full Width */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Full Bleed Editorial Model / Product Backdrop */}
        <div className="absolute inset-0 w-full h-full">
          <img
            key={slide.bgImage}
            src={slide.bgImage}
            alt="Editorial Model Backdrop"
            className="w-full h-full object-cover object-center lg:object-right opacity-85 sm:opacity-90 transform transition-all duration-1000 ease-out animate-fadeIn"
          />
        </div>

        {/* Elegant Gradient: Keeps text on the left readable while leaving model bright across full width */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent lg:via-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Subtle Luxury Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-0 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 self-start bg-zinc-950/90 border border-zinc-800 px-3 py-1 text-[11px] font-mono-brand tracking-[0.25em] text-zinc-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{slide.tag}</span>
            </div>

            {/* Subtitle / Ethos */}
            <div className="space-y-1">
              <span className="font-mono-brand text-xs sm:text-sm tracking-[0.35em] uppercase text-red-500 font-bold block">
                {slide.subtitle}
              </span>
              <h1 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide text-white uppercase leading-[1.1]">
                {slide.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onExploreCategory(slide.category)}
                className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-xs tracking-[0.25em] font-mono-brand font-bold uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExploreCategory('All Products')}
                className="inline-flex items-center space-x-2 border border-zinc-800 hover:border-zinc-500 bg-zinc-950/90 hover:bg-zinc-900 text-zinc-300 hover:text-white px-7 py-4 text-xs tracking-[0.25em] font-mono-brand font-medium uppercase transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>VIEW ENTIRE DROP</span>
              </button>
            </div>

            {/* Luxury Micro-perks */}
            <div className="pt-4 border-t border-zinc-900 flex flex-wrap gap-6 text-[11px] font-mono-brand text-zinc-500">
              <div className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>AUTHENTIC SNIPELUXE</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>EXPRESS WORLDWIDE</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Column: 3 Real Product Pictures */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4">
              {slide.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group/card relative bg-zinc-950/90 border border-zinc-800 p-2.5 sm:p-3.5 flex flex-col items-center justify-between hover:border-zinc-500 hover:shadow-[0_0_25px_rgba(0,0,0,0.9)] transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Top Image Label */}
                  <span className="self-start text-[8px] sm:text-[9px] font-mono-brand tracking-widest text-zinc-400 uppercase bg-black/90 px-1.5 sm:px-2 py-0.5 border border-zinc-800 truncate max-w-full">
                    {img.label}
                  </span>

                  {/* Garment Image */}
                  <div className="w-full h-44 sm:h-64 lg:h-72 flex items-center justify-center p-1 sm:p-2 my-2">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_14px_14px_rgba(0,0,0,0.9)] group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="w-full pt-2 border-t border-zinc-900 flex justify-between items-center text-[8px] sm:text-[9px] font-mono-brand text-zinc-400">
                    <span className="truncate">SNIPELUXE</span>
                    <span className="text-zinc-200 font-bold truncate ml-1">{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-red-600 text-white border border-zinc-800 transition-all cursor-pointer hidden md:flex items-center justify-center z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-red-600 text-white border border-zinc-800 transition-all cursor-pointer hidden md:flex items-center justify-center z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 flex space-x-2 z-20">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all cursor-pointer rounded-full ${
              idx === currentSlide ? 'w-10 bg-red-500' : 'w-3 bg-zinc-800 hover:bg-zinc-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
