import React, { useState } from 'react';
import { Product, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Check, ShoppingBag, Truck, ShieldCheck, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart({
      product,
      selectedColor,
      selectedSize,
      quantity,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-white text-zinc-300 hover:text-black transition-all cursor-pointer rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-zinc-900/50 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 aspect-square border overflow-hidden cursor-pointer flex-shrink-0 bg-zinc-950 p-1 flex items-center justify-center ${
                    selectedImage === img ? 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-brand uppercase mb-2">
              <span>{product.category}</span>
              <span className="text-zinc-500">• {product.gender} Collection</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase font-serif-brand text-white mb-2">
              {product.title}
            </h2>

            <div className="text-lg font-bold font-mono-brand text-zinc-100 mb-6 border-b border-zinc-800 pb-4">
              {formatPrice(product.priceUSD, currency)}
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Swatches Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-mono-brand text-zinc-400 uppercase tracking-widest mb-2.5">
                  COLOR: <span className="text-white font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-mono-brand uppercase border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-mono-brand text-zinc-400 uppercase tracking-widest mb-2.5">
                  SIZE: <span className="text-white font-bold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-mono-brand font-bold uppercase border flex items-center justify-center transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-xs font-mono-brand text-zinc-400 uppercase tracking-widest mb-2.5">
                QUANTITY
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-zinc-800 bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-mono-brand font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2.5 border transition-all cursor-pointer ${
                    isWishlisted ? 'border-red-500 bg-red-950/40 text-red-400' : 'border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="space-y-4 border-t border-zinc-800 pt-6 mt-4">
            {product.isSoldOut ? (
              <button
                disabled
                className="w-full bg-zinc-800 text-zinc-500 py-4 text-xs font-mono-brand font-bold tracking-[0.2em] uppercase cursor-not-allowed border border-zinc-700"
              >
                OUT OF STOCK
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-xs font-mono-brand font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART • {formatPrice(product.priceUSD * quantity, currency)}</span>
                  </>
                )}
              </button>
            )}

            {/* Fabric & Shipping guarantee */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 font-mono-brand">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-zinc-500" />
                <span>Global Express DHL</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                <span>100% Authentic J.O.L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
