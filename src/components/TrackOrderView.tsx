import React, { useState } from 'react';
import { MOCK_ORDER_TIMELINE } from '../data/products';
import { Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Truck, CheckCircle, Package, Search, Clock, MapPin } from 'lucide-react';

interface TrackOrderViewProps {
  currency: Currency;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({ currency }) => {
  const [orderNumber, setOrderNumber] = useState('SNIPE-90812');
  const [email, setEmail] = useState('client@snipeluxe.com');
  const [orderData, setOrderData] = useState<any>(MOCK_ORDER_TIMELINE['SNIPE-90812']);
  const [searched, setSubmittedSearch] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(true);
    const key = orderNumber.trim().toUpperCase();
    if (MOCK_ORDER_TIMELINE[key]) {
      setOrderData(MOCK_ORDER_TIMELINE[key]);
    } else {
      // Generated fallback demo order
      setOrderData({
        orderNumber: key,
        email: email || 'customer@example.com',
        status: 'In Production',
        estimatedDelivery: 'Oct 16, 2026',
        carrier: 'DHL Express International',
        trackingCode: `DHL-${key}-8891`,
        items: [
          {
            title: 'SNIPE DIRECTIONAL TRACK JACKET',
            quantity: 1,
            color: 'Noir Black / Crimson',
            size: 'L',
            priceUSD: 240.0,
            image: '/products/snipe-jacket-front.png',
          },
        ],
        shippingAddress: 'SNIPELUXE Atelier Dispatch Hub -> Destination',
        updates: [
          {
            date: 'Oct 11, 2026',
            time: '09:00',
            location: 'Lagos Workshop, Nigeria',
            status: 'Garment undergoing quality assurance & tailoring',
          },
        ],
      });
    }
  };

  const steps = [
    'Order Placed',
    'In Production',
    'Shipped from Lagos',
    'Out for Delivery',
    'Delivered',
  ];

  const currentStepIndex = orderData ? steps.indexOf(orderData.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white animate-fadeIn space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 border-b border-zinc-800 pb-8">
        <span className="text-xs font-mono-brand text-red-500 tracking-[0.4em] uppercase block font-bold">
          SNIPELUXE • PARCEL TRACKING
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs text-zinc-400 max-w-md mx-auto font-mono-brand">
          Enter your SNIPELUXE order reference number and email address below to inspect live shipment status.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1.5">
              Order Number (e.g. SNIPE-90812)
            </label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="HF-89210"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono-brand text-white uppercase focus:border-white outline-none"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono-brand text-white focus:border-white outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-white text-black py-3 px-4 text-xs font-mono-brand font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>TRACK</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[11px] font-mono-brand text-zinc-500">
          <span>Need a quick test demo?</span>
          <button
            onClick={() => {
              setOrderNumber('HF-89210');
              setEmail('alex@example.com');
              setOrderData(MOCK_ORDER_TIMELINE['HF-89210']);
              setSubmittedSearch(true);
            }}
            className="text-white underline hover:text-zinc-300"
          >
            Load Sample Order HF-89210
          </button>
        </div>
      </div>

      {/* Order Status Timeline Card */}
      {searched && orderData && (
        <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-8 animate-fadeIn">
          {/* Top Order Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-[10px] font-mono-brand uppercase text-zinc-500 block">
                ORDER REFERENCE
              </span>
              <h3 className="text-xl font-bold font-serif-brand text-white uppercase">
                {orderData.orderNumber}
              </h3>
            </div>

            <div className="sm:text-right font-mono-brand text-xs">
              <span className="text-zinc-400 block">CARRIER: <strong className="text-white">{orderData.carrier}</strong></span>
              <span className="text-zinc-400 block">WAYBILL: <strong className="text-white">{orderData.trackingCode}</strong></span>
              <span className="text-amber-400 block font-bold mt-1">EST. DELIVERY: {orderData.estimatedDelivery}</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-zinc-400">
              SHIPMENT PROGRESS
            </h4>

            <div className="relative flex justify-between items-center">
              {/* Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-white -translate-y-1/2 transition-all duration-700 z-0"
                style={{
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center group">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono-brand text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-white text-black border-white ring-4 ring-white/20'
                          : isPassed
                          ? 'bg-zinc-800 text-white border-white'
                          : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-mono-brand uppercase mt-2 text-center hidden sm:block max-w-[80px] ${
                        isCurrent ? 'text-white font-bold' : isPassed ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Included */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-zinc-400">
              ITEMS IN THIS SHIPMENT
            </h4>

            <div className="space-y-3">
              {orderData.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center space-x-4 bg-zinc-900/50 p-3 border border-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-16 object-contain bg-zinc-950 p-1 border border-zinc-800"
                  />
                  <div className="flex-1">
                    <h5 className="text-xs font-bold font-serif-brand text-white uppercase">
                      {item.title}
                    </h5>
                    <p className="text-[11px] font-mono-brand text-zinc-400 mt-1">
                      QTY: {item.quantity} • COLOR: {item.color} • SIZE: {item.size}
                    </p>
                  </div>
                  <div className="text-xs font-bold font-mono-brand text-white">
                    {formatPrice(item.priceUSD * item.quantity, currency)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold tracking-widest font-mono-brand uppercase text-zinc-400">
              TRACKING ACTIVITY LOG
            </h4>

            <div className="space-y-3 font-mono-brand text-xs">
              {orderData.updates.map((update: any, idx: number) => (
                <div key={idx} className="flex items-start space-x-3 text-zinc-300 pb-3 border-b border-zinc-900 last:border-none">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block">{update.status}</span>
                    <span className="text-zinc-500 text-[10px]">
                      {update.date} at {update.time} • {update.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
