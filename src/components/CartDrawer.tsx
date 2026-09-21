import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  currency: Currency;
  onNavigateShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onNavigateShop,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoCodeApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: 'Lagos',
    country: 'Nigeria',
  });

  if (!isOpen) return null;

  const subtotalUSD = cartItems.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD);

  const freeShippingThresholdUSD = 300;
  const progressPercent = Math.min(100, (subtotalUSD / freeShippingThresholdUSD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SNIPE10' || promoCode.trim().toUpperCase() === 'LUXE10') {
      setDiscountPercent(10);
      setPromoCodeApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setPromoCodeApplied(true);
    } else {
      alert('Invalid promo code. Try "SNIPE10" for 10% off!');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase font-mono-brand">
                YOUR SHOPPING BAG ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          {cartItems.length > 0 && checkoutStep === 'cart' && (
            <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800">
              <div className="flex justify-between text-[11px] font-mono-brand mb-1.5">
                {subtotalUSD >= freeShippingThresholdUSD ? (
                  <span className="text-emerald-400 font-bold">
                    ✓ YOU QUALIFY FOR FREE WORLDWIDE SHIPPING!
                  </span>
                ) : (
                  <span className="text-zinc-300">
                    Add {formatPrice(freeShippingThresholdUSD - subtotalUSD, currency)} more for FREE SHIPPING
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'success' ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider font-serif-brand uppercase">
                    ORDER CONFIRMED!
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 font-mono-brand">
                    Order #SNIPE-{Math.floor(10000 + Math.random() * 90000)}
                  </p>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed px-4">
                  Thank you for securing your order with SNIPELUXE. A confirmation receipt and tracking code have been dispatched to <span className="text-white font-bold">{formData.email || 'your email'}</span>.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutStep('cart');
                      setIsCheckingOut(false);
                      onClose();
                    }}
                    className="w-full bg-white text-black py-4 text-xs font-mono-brand font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            ) : checkoutStep === 'shipping' ? (
              <form onSubmit={handleCompleteOrder} className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold font-mono-brand uppercase tracking-widest text-zinc-300 border-b border-zinc-800 pb-2">
                  SHIPPING & PAYMENT DETAILS
                </h3>

                <div>
                  <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                    Delivery Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="38 Admiralty Way, Victoria Island"
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex justify-between text-xs font-mono-brand mb-2">
                    <span className="text-zinc-400">TOTAL DUE:</span>
                    <span className="text-white font-bold">{formatPrice(finalTotalUSD, currency)}</span>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="w-1/3 border border-zinc-800 text-zinc-400 hover:text-white py-3 text-xs font-mono-brand uppercase"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-white text-black py-3 text-xs font-mono-brand font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>PAY NOW</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-sm font-mono-brand text-zinc-400">
                  Your shopping bag is currently empty.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateShop();
                  }}
                  className="mt-4 bg-white text-black px-6 py-3 text-xs font-mono-brand font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-zinc-900">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 flex space-x-4">
                    <div className="w-20 aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold tracking-wider font-serif-brand text-white uppercase line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-zinc-600 hover:text-red-400 p-1 cursor-pointer"
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-zinc-400 font-mono-brand space-x-3 mt-1">
                          <span>COLOR: <strong className="text-white">{item.selectedColor}</strong></span>
                          <span>SIZE: <strong className="text-white">{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-zinc-800 bg-zinc-900">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-zinc-300 hover:text-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-mono-brand text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-zinc-300 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold font-mono-brand text-white">
                          {formatPrice(item.product.priceUSD * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cartItems.length > 0 && checkoutStep === 'cart' && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE (e.g. HF10)"
                  className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono-brand uppercase text-white outline-none focus:border-zinc-600"
                />
                <button
                  type="submit"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 text-xs font-mono-brand font-bold uppercase transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </form>

              {promoApplied && (
                <div className="text-[11px] text-emerald-400 font-mono-brand">
                  ✓ {discountPercent}% PROMO DISCOUNT APPLIED!
                </div>
              )}

              <div className="space-y-1.5 text-xs font-mono-brand pt-2 border-t border-zinc-900">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotalUSD, currency)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountUSD, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span>
                    {subtotalUSD >= freeShippingThresholdUSD ? 'FREE' : formatPrice(25, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>ESTIMATED TOTAL</span>
                  <span>{formatPrice(finalTotalUSD, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('shipping')}
                className="w-full bg-white text-black py-4 text-xs font-mono-brand font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
