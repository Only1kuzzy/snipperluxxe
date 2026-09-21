import React, { useState, useMemo } from 'react';
import { Product, Currency, CategoryType } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, Grid, SlidersHorizontal, X } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  currency: Currency;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  currency,
  onQuickView,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<number>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories: CategoryType[] = [
    'All Products',
    'New In',
    'Best Sellers',
    'Jackets',
    'Denim',
    'Tracksuits',
    'Outerwear',
    'Pants',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All Products') {
          if (selectedCategory === 'New In' && !p.isNewIn) return false;
          if (selectedCategory === 'Best Sellers' && !p.isBestSeller) return false;
          if (selectedCategory === 'Tracksuits' && p.category !== 'Tracksuits') return false;
          if (selectedCategory !== 'New In' && selectedCategory !== 'Best Sellers' && selectedCategory !== 'Tracksuits') {
            if (p.category !== selectedCategory && p.subcategory !== selectedCategory) return false;
          }
        }

        // Gender Filter
        if (selectedGender !== 'All') {
          if (p.gender !== selectedGender && p.gender !== 'Unisex') return false;
        }

        // In Stock Filter
        if (inStockOnly && p.isSoldOut) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortOption === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortOption === 'name') return a.title.localeCompare(b.title);
        return 0; // featured default order
      });
  }, [products, selectedCategory, selectedGender, inStockOnly, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white animate-fadeIn">
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-zinc-800 pb-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono-brand text-red-500 tracking-[0.3em] uppercase block mb-1 font-bold">
            SNIPELUXE • CAPSULE COLLECTION
          </span>
          <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white">
            {selectedCategory}
          </h1>
        </div>

        <div className="flex items-center space-x-4 self-center sm:self-auto">
          {/* Grid Layout Toggles */}
          <div className="hidden md:flex items-center border border-zinc-800 p-1 space-x-1">
            <button
              onClick={() => setGridCols(2)}
              className={`px-2.5 py-1 text-xs font-mono-brand ${gridCols === 2 ? 'bg-white text-black' : 'text-zinc-400'}`}
            >
              2 COL
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`px-2.5 py-1 text-xs font-mono-brand ${gridCols === 3 ? 'bg-white text-black' : 'text-zinc-400'}`}
            >
              3 COL
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`px-2.5 py-1 text-xs font-mono-brand ${gridCols === 4 ? 'bg-white text-black' : 'text-zinc-400'}`}
            >
              4 COL
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortOption}
            onChange={(e: any) => setSortOption(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono-brand uppercase text-white outline-none cursor-pointer focus:border-zinc-600"
          >
            <option value="featured">SORT: FEATURED</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
            <option value="name">NAME: A - Z</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono-brand uppercase text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTER</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`lg:w-64 flex-shrink-0 space-y-8 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Categories List */}
          <div>
            <h3 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-white mb-4 border-b border-zinc-800 pb-2">
              CATEGORIES
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left w-full hover:text-white transition-colors cursor-pointer py-1 font-mono-brand flex justify-between items-center ${
                      selectedCategory === cat ? 'text-white font-bold border-l-2 border-white pl-2' : ''
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="text-[10px]">●</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Gender Filter */}
          <div>
            <h3 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-white mb-4 border-b border-zinc-800 pb-2">
              COLLECTION
            </h3>
            <div className="space-y-2 text-xs text-zinc-400 font-mono-brand">
              {['All', 'Men', 'Women'].map((gender) => (
                <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === gender}
                    onChange={() => setSelectedGender(gender)}
                    className="accent-white"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-white mb-4 border-b border-zinc-800 pb-2">
              AVAILABILITY
            </h3>
            <label className="flex items-center space-x-2 text-xs font-mono-brand text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-white"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setSelectedGender('All');
              setInStockOnly(false);
              setSortOption('featured');
            }}
            className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white py-2.5 text-xs font-mono-brand uppercase transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {/* Active Filters Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between text-xs font-mono-brand text-zinc-400 pb-4 border-b border-zinc-900">
            <span>
              SHOWING <strong className="text-white">{filteredProducts.length}</strong> PRODUCTS
            </span>

            {(selectedCategory !== 'All Products' || selectedGender !== 'All' || inStockOnly) && (
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-[10px] text-zinc-500 uppercase">ACTIVE:</span>
                <span className="bg-zinc-800 text-white px-2 py-0.5 text-[10px] uppercase">
                  {selectedCategory}
                </span>
                {selectedGender !== 'All' && (
                  <span className="bg-zinc-800 text-white px-2 py-0.5 text-[10px] uppercase">
                    {selectedGender}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Grid Render */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-zinc-950 border border-zinc-900">
              <p className="text-sm font-mono-brand text-zinc-400">
                No items match your selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSelectedGender('All');
                  setInStockOnly(false);
                }}
                className="bg-white text-black px-6 py-3 text-xs font-mono-brand font-bold uppercase hover:bg-zinc-200 transition-colors"
              >
                VIEW ALL PRODUCTS
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridCols === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridCols === 3
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
