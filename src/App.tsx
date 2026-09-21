import React, { useState } from 'react';
import { TabType, Product, CartItem, Currency } from './types';
import { PRODUCTS, CURRENCIES } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { FAQView } from './components/FAQView';
import { ContactView } from './components/ContactView';
import { TrackOrderView } from './components/TrackOrderView';
import { SearchModal } from './components/SearchModal';
import { CurrencyModal } from './components/CurrencyModal';
import { Footer } from './components/Footer';
import { ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedColor: 'Noir Black / Crimson',
      selectedSize: 'L',
      quantity: 1,
    },
  ]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.product.id === item.product.id &&
          ci.selectedColor === item.selectedColor &&
          ci.selectedSize === item.selectedSize
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateShop = (categoryName?: string) => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    } else {
      setSelectedCategory('All Products');
    }
    setActiveTab('SHOP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered sections for Home Page
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const newInProducts = PRODUCTS.filter((p) => p.isNewIn).slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCurrencyModal={() => setCurrencyModalOpen(true)}
        selectedCurrency={selectedCurrency}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Body based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'HOME' && (
          <div className="space-y-20 pb-16">
            {/* Hero Banner Showcase */}
            <HeroBanner onExploreCategory={handleNavigateShop} />

            {/* Section 1: BEST SELLERS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800/80 gap-4">
                <div>
                  <span className="text-xs font-mono-brand text-red-500 tracking-[0.35em] uppercase block mb-1 font-bold">
                    SIGNATURE DROP • TOP PICKS
                  </span>
                  <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white">
                    BEST SELLING
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigateShop('Best Sellers')}
                  className="inline-flex items-center space-x-2 text-xs font-mono-brand font-bold uppercase tracking-widest text-zinc-300 hover:text-red-400 cursor-pointer group transition-colors"
                >
                  <span>SHOP BEST SELLING</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestSellers.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={selectedCurrency}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Section 2: CAPSULE 01 SPOTLIGHT - 2 COLUMN LUXURY SHOWCASE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spotlight 1: Track Jacket */}
                <div
                  onClick={() => handleNavigateShop('Jackets')}
                  className="group relative bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-red-500/60 transition-all duration-500"
                >
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <span className="text-[10px] font-mono-brand text-red-500 tracking-[0.3em] uppercase block font-bold">
                        FLAGSHIP OUTERWEAR
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif-brand uppercase text-white mt-1 group-hover:text-red-400 transition-colors">
                        DIRECTIONAL TRACK JACKET
                      </h3>
                    </div>
                    <span className="text-xs font-mono-brand text-zinc-400 bg-black/60 px-3 py-1 border border-zinc-800">
                      DROP 01
                    </span>
                  </div>

                  <div className="my-8 w-full h-64 sm:h-72 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-red-600/10 blur-2xl rounded-full" />
                    <img
                      src="/products/snipe-jacket-front.png"
                      alt="SNIPE Track Jacket"
                      className="max-h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between z-10">
                    <span className="text-xs font-mono-brand text-zinc-400">
                      NO DISTRACTIONS. ONLY DIRECTION.
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-mono-brand font-bold text-white group-hover:text-red-400 tracking-wider">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Spotlight 2: Raw Indigo Baggy Jeans */}
                <div
                  onClick={() => handleNavigateShop('Denim')}
                  className="group relative bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-amber-500/60 transition-all duration-500"
                >
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <span className="text-[10px] font-mono-brand text-amber-500 tracking-[0.3em] uppercase block font-bold">
                        14.5OZ RAW SELVEDGE
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif-brand uppercase text-white mt-1 group-hover:text-amber-400 transition-colors">
                        RAW INDIGO BAGGY JEANS
                      </h3>
                    </div>
                    <span className="text-xs font-mono-brand text-zinc-400 bg-black/60 px-3 py-1 border border-zinc-800">
                      OVERSIZED
                    </span>
                  </div>

                  <div className="my-8 w-full h-64 sm:h-72 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-amber-600/10 blur-2xl rounded-full" />
                    <img
                      src="/products/snipe-denim-front.png"
                      alt="SNIPE Raw Indigo Jeans"
                      className="max-h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between z-10">
                    <span className="text-xs font-mono-brand text-zinc-400">
                      GOLD CONTRAST TOPSTITCH & STENCIL
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-mono-brand font-bold text-white group-hover:text-amber-400 tracking-wider">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: JUST DROPPED / NEW ARRIVALS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800/80 gap-4">
                <div>
                  <span className="text-xs font-mono-brand text-red-500 tracking-[0.35em] uppercase block mb-1 font-bold">
                    JUST ARRIVED
                  </span>
                  <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white">
                    NEW IN COLLECTION
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigateShop('New In')}
                  className="inline-flex items-center space-x-2 text-xs font-mono-brand font-bold uppercase tracking-widest text-zinc-300 hover:text-red-400 cursor-pointer group transition-colors"
                >
                  <span>SHOP ALL ARRIVALS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newInProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={selectedCurrency}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Section 4: Brand Statement Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative border border-zinc-800 bg-zinc-950 p-8 sm:p-14 text-center overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 text-xs font-mono-brand text-red-500 tracking-[0.3em] uppercase font-bold">
                    <Compass className="w-4 h-4" />
                    <span>SNIPELUXE CREED</span>
                  </div>
                  <h2 className="font-serif-brand text-2xl sm:text-4xl font-black tracking-wider uppercase text-white leading-snug">
                    "NO DISTRACTIONS. ONLY DIRECTION."
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    Constructed for precision. Heavyweight textiles, architectural geometry, and signature directional hardware designed to define modern luxury streetwear.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => handleNavigateShop('All Products')}
                      className="bg-white text-black px-8 py-3.5 text-xs font-mono-brand font-bold uppercase tracking-[0.25em] hover:bg-zinc-200 transition-all cursor-pointer"
                    >
                      BROWSE COMPLETE DROP
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* SHOP TAB */}
        {activeTab === 'SHOP' && (
          <ShopView
            products={PRODUCTS}
            currency={selectedCurrency}
            onQuickView={(p) => setQuickViewProduct(p)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* ABOUT TAB */}
        {activeTab === 'ABOUT' && <AboutView />}

        {/* FAQ TAB */}
        {activeTab === 'FAQ' && <FAQView />}

        {/* CONTACT TAB */}
        {activeTab === 'CONTACT' && <ContactView />}

        {/* TRACK ORDER TAB */}
        {activeTab === 'TRACK YOUR ORDER' && (
          <TrackOrderView currency={selectedCurrency} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onNavigateShopCategory={handleNavigateShop}
      />

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={selectedCurrency}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={selectedCurrency}
        onNavigateShop={() => {
          setActiveTab('SHOP');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        currency={selectedCurrency}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      <CurrencyModal
        isOpen={currencyModalOpen}
        onClose={() => setCurrencyModalOpen(false)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />
    </div>
  );
}
