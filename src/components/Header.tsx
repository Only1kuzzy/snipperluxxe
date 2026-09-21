import React, { useState } from 'react';
import { TabType, Currency } from '../types';
import { Search, ShoppingBag, User, ChevronDown, Menu, X, Globe } from 'lucide-react';
import { SnipeLogo } from './SnipeLogo';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenCurrencyModal: () => void;
  selectedCurrency: Currency;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenCurrencyModal,
  selectedCurrency,
  setSelectedCategory,
}) => {
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectShopCategory = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('SHOP');
    setShopMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: TabType; hasDropdown?: boolean }[] = [
    { label: 'HOME' },
    { label: 'SHOP', hasDropdown: true },
    { label: 'ABOUT' },
    { label: 'FAQ' },
    { label: 'CONTACT' },
    { label: 'TRACK YOUR ORDER' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-zinc-800/80 text-white transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-xs py-2 px-4 border-b border-zinc-800/80 flex justify-between items-center text-zinc-300">
        <div className="hidden sm:flex items-center space-x-2 font-mono-brand text-[11px] tracking-widest text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span>SNIPELUXE • NO DISTRACTIONS. ONLY DIRECTION. • EXPRESS WORLDWIDE DELIVERY</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center space-x-6 text-[11px] tracking-wider uppercase font-medium">
          <button
            onClick={onOpenCurrencyModal}
            className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {selectedCurrency.flag} {selectedCurrency.code} ({selectedCurrency.symbol})
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              alert('Welcome to SNIPELUXE. Client account portal is active.');
            }}
            className="hover:text-white transition-colors cursor-pointer hidden md:inline font-mono-brand text-[10px]"
          >
            Client Access
          </a>
        </div>
      </div>

      {/* Main Brand Logo Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-zinc-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Center Logo */}
        <div
          onClick={() => {
            setActiveTab('HOME');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer group py-2"
        >
          <SnipeLogo size="md" showTagline={true} />
        </div>

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          <a
            href="#account"
            onClick={(e) => {
              e.preventDefault();
              alert('SNIPELUXE VIP Client account active.');
            }}
            className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
            title="Account"
          >
            <User className="w-5 h-5" />
          </a>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer group"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono-brand animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden lg:block border-t border-zinc-800/80 bg-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center space-x-10">
          {navItems.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setShopMenuOpen(true)}
                  onMouseLeave={() => setShopMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      setActiveTab('SHOP');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`py-4 text-xs tracking-[0.2em] font-medium uppercase flex items-center space-x-1 cursor-pointer transition-colors ${
                      activeTab === 'SHOP' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>SHOP</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {shopMenuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-zinc-950 border border-zinc-800 p-8 shadow-2xl rounded-none grid grid-cols-3 gap-8 z-50 animate-fadeIn">
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-4 border-b border-zinc-800 pb-2 font-mono-brand">
                          BROWSE DROP
                        </h4>
                        <ul className="space-y-2.5 text-xs text-zinc-400 font-mono-brand">
                          <li>
                            <button
                              onClick={() => handleSelectShopCategory('All Products')}
                              className="hover:text-white transition-colors cursor-pointer font-semibold text-white"
                            >
                              ALL PRODUCTS
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleSelectShopCategory('New In')}
                              className="hover:text-white transition-colors cursor-pointer text-red-400 flex items-center space-x-1.5"
                            >
                              <span>NEW ARRIVALS</span>
                              <span className="text-[10px]">★</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleSelectShopCategory('Best Sellers')}
                              className="hover:text-white transition-colors cursor-pointer"
                            >
                              BEST SELLERS
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleSelectShopCategory('Tracksuits')}
                              className="hover:text-white transition-colors cursor-pointer text-amber-400"
                            >
                              CAPSULE TRACKSUITS
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-4 border-b border-zinc-800 pb-2 font-mono-brand">
                          OUTERWEAR
                        </h4>
                        <ul className="space-y-2.5 text-xs text-zinc-400 font-mono-brand">
                          {['Jackets', 'Outerwear', 'Tracksuits'].map((cat) => (
                            <li key={cat}>
                              <button
                                onClick={() => handleSelectShopCategory(cat)}
                                className="hover:text-white transition-colors cursor-pointer uppercase"
                              >
                                {cat}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-4 border-b border-zinc-800 pb-2 font-mono-brand">
                          DENIM & PANTS
                        </h4>
                        <ul className="space-y-2.5 text-xs text-zinc-400 font-mono-brand">
                          {['Denim', 'Pants'].map((cat) => (
                            <li key={cat}>
                              <button
                                onClick={() => handleSelectShopCategory(cat)}
                                className="hover:text-white transition-colors cursor-pointer uppercase"
                              >
                                {cat}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-4 text-xs tracking-[0.2em] font-medium uppercase cursor-pointer transition-colors relative ${
                  activeTab === item.label ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.label && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-mono-brand">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-zinc-900 pb-2">
                <button
                  onClick={() => {
                    setActiveTab(item.label);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-sm tracking-widest uppercase font-semibold text-left w-full ${
                    activeTab === item.label ? 'text-red-500' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
                {item.label === 'SHOP' && (
                  <div className="pl-4 pt-2 flex flex-col space-y-2 text-xs text-zinc-400">
                    <button
                      onClick={() => handleSelectShopCategory('All Products')}
                      className="text-left py-1"
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => handleSelectShopCategory('Jackets')}
                      className="text-left py-1"
                    >
                      Directional Jackets
                    </button>
                    <button
                      onClick={() => handleSelectShopCategory('Denim')}
                      className="text-left py-1"
                    >
                      Raw Indigo Denim
                    </button>
                    <button
                      onClick={() => handleSelectShopCategory('Tracksuits')}
                      className="text-left py-1"
                    >
                      Capsule Tracksuits
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
            <button onClick={onOpenCurrencyModal} className="flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>
                {selectedCurrency.flag} {selectedCurrency.code} ({selectedCurrency.symbol})
              </span>
            </button>
            <span className="font-mono-brand text-[10px] text-zinc-500">SNIPELUXE • 2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
