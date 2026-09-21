import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Search, X, Eye } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onQuickView: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onQuickView,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.colors.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 overflow-y-auto animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Search Input */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-3 flex-1 pr-4">
            <Search className="w-6 h-6 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS (e.g. Tee, Hoodie, Cap, Jacket, Tracksuit)..."
              className="w-full bg-transparent text-lg sm:text-xl font-mono-brand text-white placeholder-zinc-500 outline-none uppercase"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        {!query && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono-brand font-bold uppercase tracking-widest text-zinc-400">
              POPULAR SEARCHES
            </h4>
            <div className="flex flex-wrap gap-2">
              {['JACKET', 'DENIM', 'TRACKSUIT', 'RAW INDIGO', 'NO DISTRACTIONS', 'BAGGY JEANS'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white px-4 py-2 text-xs font-mono-brand uppercase transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="space-y-4">
            <div className="text-xs font-mono-brand text-zinc-400">
              FOUND <strong className="text-white">{results.length}</strong> RESULTS FOR "{query.toUpperCase()}"
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 font-mono-brand text-xs">
                No matching garments found. Try searching for "Jacket", "Denim", or "Tracksuit".
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="group bg-zinc-950 border border-zinc-800 p-3 cursor-pointer hover:border-red-500 transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] bg-zinc-900 overflow-hidden mb-3 flex items-center justify-center p-2">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold font-serif-brand text-white uppercase line-clamp-1">
                        {product.title}
                      </h5>
                      <span className="text-xs font-mono-brand text-zinc-400 block mt-1">
                        {formatPrice(product.priceUSD, currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
