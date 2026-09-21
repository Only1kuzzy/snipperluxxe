import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
}) => {
  return (
    <div className="group relative flex flex-col bg-zinc-950 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(0,0,0,0.9)] transition-all duration-300">
      {/* Product Image Container with Subtle Lookbook Backdrop */}
      <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950 overflow-hidden flex items-center justify-center p-4 border-b border-zinc-900">
        {/* Subtle background grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #666 1px, transparent 1px), linear-gradient(to bottom, #666 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.85)]"
          loading="lazy"
        />

        {/* Secondary image on hover (e.g. Back view with statement embroidery) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} Alternate View`}
            className="absolute inset-0 w-full h-full object-contain object-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.85)]"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.isSoldOut ? (
            <span className="bg-red-950/90 text-red-300 border border-red-800/60 text-[9px] font-mono-brand font-bold uppercase px-2 py-0.5 tracking-widest">
              Sold Out
            </span>
          ) : product.isNewIn ? (
            <span className="bg-red-600 text-white text-[9px] font-mono-brand font-bold uppercase px-2 py-0.5 tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              Drop 01
            </span>
          ) : product.isBestSeller ? (
            <span className="bg-zinc-800 text-zinc-200 text-[9px] font-mono-brand font-bold uppercase px-2 py-0.5 tracking-widest">
              Signature
            </span>
          ) : null}
        </div>

        {/* Quick View Floating Button */}
        <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="w-full bg-black/90 hover:bg-white text-white hover:text-black border border-zinc-700 py-2.5 px-4 text-xs font-mono-brand tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xl"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK INSPECT</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-zinc-950">
        <div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-bold tracking-wider text-zinc-100 uppercase hover:text-red-400 transition-colors line-clamp-1 cursor-pointer font-serif-brand"
          >
            {product.title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-mono-brand text-zinc-200 font-bold">
              {formatPrice(product.priceUSD, currency)}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono-brand uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        </div>

        {/* Color variants preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400 font-mono-brand">
            <span className="truncate max-w-[150px] text-[10px] text-zinc-400">
              {product.colors[0]}
            </span>
            <span className="text-[9px] text-red-500/90 tracking-wider">
              {product.images.length} VIEWS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
