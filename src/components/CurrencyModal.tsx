import React from 'react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/products';
import { X, Check, Globe } from 'lucide-react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-800 text-white w-full max-w-md p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold tracking-widest uppercase font-mono-brand">
              SELECT REGION & CURRENCY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 font-mono-brand">
          Prices will automatically convert based on current international exchange rates.
        </p>

        <div className="space-y-2">
          {CURRENCIES.map((curr) => {
            const isSelected = selectedCurrency.code === curr.code;
            return (
              <button
                key={curr.code}
                onClick={() => {
                  onSelectCurrency(curr);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 border text-left transition-all cursor-pointer font-mono-brand text-xs ${
                  isSelected
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{curr.flag}</span>
                  <div>
                    <span className="block font-bold">{curr.name}</span>
                    <span className="text-[10px] opacity-75">{curr.code} ({curr.symbol})</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
