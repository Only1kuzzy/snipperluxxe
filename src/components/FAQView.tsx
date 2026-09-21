import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Orders & Shipping',
    question: 'How do I track my order status?',
    answer: 'Once your order is processed, you will receive a tracking ID via email. You can also navigate to our "TRACK YOUR ORDER" tab on the website and input your Order Number (e.g., SNIPE-90812) and email address to view live tracking updates from our dispatch hub.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes! SNIPELUXE ships worldwide via DHL Express International and local express courier partners. Delivery times typically range from 2-4 business days within Nigeria, and 4-7 business days for North America, Europe, and the rest of the world.',
  },
  {
    category: 'Orders & Shipping',
    question: 'What are the shipping costs?',
    answer: 'Express local shipping within Nigeria is complimentary on orders over ₦150,000. Worldwide express shipping is FREE for orders exceeding $300 USD (or equivalent). Standard flat rates apply for orders below threshold.',
  },
  {
    category: 'Payments & Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept major international credit/debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, as well as direct Nigerian Bank Transfers and Paystack for NGN payments. Select your local currency in our top right currency switcher.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your returns and exchange policy?',
    answer: 'We offer hassle-free exchanges or store credit within 7 days of receiving your item, provided garments are unworn, unwashed, with original SNIPELUXE tags attached. Please note custom or sale items are final sale.',
  },
  {
    category: 'Sizing & Products',
    question: 'How do I determine my size?',
    answer: 'Most of our streetwear items (racing jackets, selvedge denim, hoodies) feature a modern relaxed/oversized luxury fit. If you prefer a tailored look, we recommend ordering one size down. Check product detail descriptions for garment measurements.',
  },
  {
    category: 'Sizing & Products',
    question: 'Where is SNIPELUXE located?',
    answer: 'Our flagship studio and private client showroom is located at Admiralty Way, Lekki Phase 1, Lagos, Nigeria. We are open Monday through Saturday 10am - 8pm, and Sunday by VIP appointment.',
  },
];

export const FAQView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white animate-fadeIn space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 border-b border-zinc-800 pb-8">
        <span className="text-xs font-mono-brand text-zinc-400 tracking-[0.4em] uppercase block">
          HELP CENTER & FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white">
          FAQ
        </h1>
        <p className="text-xs text-zinc-400 max-w-lg mx-auto">
          Have questions about shipping, sizing, order status or store operating hours? Search our knowledge base below.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g., shipping, returns, size)..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-11 pr-4 py-3 text-xs font-mono-brand text-white placeholder-zinc-500 outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 font-mono-brand text-xs">
            No FAQ results found for "{searchTerm}". Please contact our support team.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center space-x-4 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide font-mono-brand uppercase text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed font-sans border-t border-zinc-900">
                    <span className="inline-block text-[10px] font-mono-brand text-zinc-500 uppercase tracking-widest mb-2">
                      CATEGORY: {faq.category}
                    </span>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
