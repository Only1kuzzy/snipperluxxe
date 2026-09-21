import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white animate-fadeIn space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3 border-b border-zinc-800 pb-8">
        <span className="text-xs font-mono-brand text-red-500 tracking-[0.4em] uppercase block font-bold">
          SNIPELUXE • CLIENT SERVICES
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider uppercase text-white">
          CONTACT US
        </h1>
        <p className="text-xs text-zinc-400 max-w-lg mx-auto font-mono-brand">
          Our client advisors are available to assist with bespoke orders, sizing guidance, and store inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Form */}
        <div className="bg-zinc-950 border border-zinc-800 p-8 space-y-6">
          <h2 className="text-sm font-bold tracking-widest font-mono-brand uppercase text-white border-b border-zinc-800 pb-3">
            SEND US A MESSAGE
          </h2>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold font-serif-brand uppercase">
                MESSAGE SENT SUCCESSFULLY!
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono-brand">
                Thank you for reaching out to SNIPELUXE. A client advisor will respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-white text-black px-6 py-2.5 text-xs font-mono-brand font-bold uppercase hover:bg-zinc-200"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Smith"
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
                  placeholder="john@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono-brand text-white focus:border-white outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Order Tracking & Delivery</option>
                  <option>Bespoke Custom Fitting</option>
                  <option>Wholesale & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-brand uppercase text-zinc-400 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 text-xs font-mono-brand font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT MESSAGE</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="space-y-8">
          <div className="bg-zinc-950 border border-zinc-800 p-8 space-y-6">
            <h2 className="text-sm font-bold tracking-widest font-mono-brand uppercase text-white border-b border-zinc-800 pb-3">
              LAGOS FLAGSHIP STORE
            </h2>

            <div className="space-y-4 font-mono-brand text-xs text-zinc-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-1" />
                <div>
                  <span className="text-white font-bold block mb-1">ADDRESS</span>
                  <span>SHOP 38/39, AARON'S LEKKI MALL, ADMIRALTY WAY, LAGOS, NIGERIA</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-white flex-shrink-0 mt-1" />
                <div>
                  <span className="text-white font-bold block mb-1">OPERATING HOURS</span>
                  <span>Monday – Saturday: 10:00am – 8:00pm</span>
                  <span className="block text-zinc-400">Sunday: 12:00pm – 8:00pm</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-white flex-shrink-0 mt-1" />
                <div>
                  <span className="text-white font-bold block mb-1">EMAIL SUPPORT</span>
                  <span>client@snipeluxe.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-white flex-shrink-0 mt-1" />
                <div>
                  <span className="text-white font-bold block mb-1">CLIENT SERVICES</span>
                  <span>+234 (0) 812 345 6789</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <a
                href="https://maps.google.com/?q=Aaron's+Lekki+Mall+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center bg-zinc-900 border border-zinc-800 hover:border-white text-white py-3 text-xs font-mono-brand uppercase tracking-widest transition-colors"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
