import { Product, Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar', flag: '🇺🇸' },
  { code: 'NGN', symbol: '₦', rate: 1550, name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro', flag: '🇪🇺' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, name: 'Canadian Dollar', flag: '🇨🇦' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'snipe-directional-track-jacket',
    title: 'SNIPE DIRECTIONAL TRACK JACKET',
    priceUSD: 240.0,
    category: 'Jackets',
    gender: 'Unisex',
    subcategory: 'Outerwear',
    colors: ['Noir Black / Crimson'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/products/snipe-jacket-front.png',
      '/products/snipe-jacket-back.png'
    ],
    description: 'High-definition technical racing track jacket engineered in Noir Black with reflective piped contouring, full zip mock collar, embroidered chest emblem, and signature "No Distractions. Only Direction." typography on the back.',
    fabricCare: 'Heavyweight Technical Poly-Shell with Silk Mesh Lining. Dry clean or cold machine wash inside out.',
    isBestSeller: true,
    isFeatured: true,
    isNewIn: true
  },
  {
    id: 'snipe-raw-indigo-baggy-jeans',
    title: 'SNIPE RAW INDIGO BAGGY JEANS',
    priceUSD: 195.0,
    category: 'Denim',
    gender: 'Unisex',
    subcategory: 'Pants',
    colors: ['Raw Indigo / Gold Stitch'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    images: [
      '/products/snipe-denim-front.png',
      '/products/snipe-denim-back.png',
      '/products/snipe-denim-detail.png'
    ],
    description: '14.5oz heavy selvedge raw indigo denim tailored in a signature oversized wide-leg cut. Accented with contrast gold contrast stitching, custom brass shank button hardware, and bold vertical directional SNIPE statement graphic.',
    fabricCare: '100% Heavyweight Selvedge Cotton Denim. Wash cold, hang dry to preserve raw indigo patina.',
    isBestSeller: true,
    isFeatured: true,
    isNewIn: true
  },
  {
    id: 'snipe-capsule-combo-set',
    title: 'SNIPELUXE CAPSULE 01 FULL SUIT',
    priceUSD: 395.0,
    category: 'Tracksuits',
    gender: 'Unisex',
    subcategory: 'Full Sets',
    colors: ['Noir Black & Raw Indigo'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/products/snipe-jacket-front.png',
      '/products/snipe-denim-front.png',
      '/products/snipe-jacket-back.png',
      '/products/snipe-denim-back.png'
    ],
    description: 'The premier SNIPELUXE pairing — featuring the Directional Track Jacket and the Raw Indigo Baggy Denim. Tailored for maximum presence and zero distractions. Delivered in bespoke SNIPELUXE branded packaging.',
    fabricCare: 'Technical Poly Outerwear + 14.5oz Selvedge Raw Denim Combo.',
    isBestSeller: true,
    isFeatured: true,
    isNewIn: true
  },
  {
    id: 'snipe-statement-back-jacket',
    title: 'SNIPE NO-DISTRACTIONS BOMBER JACKET',
    priceUSD: 240.0,
    category: 'Outerwear',
    gender: 'Unisex',
    subcategory: 'Jackets',
    colors: ['Noir Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/products/snipe-jacket-back.png',
      '/products/snipe-jacket-front.png'
    ],
    description: 'Back-profile statement piece featuring the iconic crimson SNIPELUXE star emblem, razor-sharp SNIPE crest, and "NO DISTRACTIONS. ONLY DIRECTION." embroidered lower panel on matte heavyweight shell.',
    fabricCare: 'High-density weatherproof fabric with ribbed hem and cuffs.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'snipe-statement-calf-denim',
    title: 'SNIPE VERTICAL STENCIL WIDE-LEG JEANS',
    priceUSD: 195.0,
    category: 'Denim',
    gender: 'Unisex',
    subcategory: 'Pants',
    colors: ['Raw Indigo'],
    sizes: ['30', '32', '34', '36'],
    images: [
      '/products/snipe-denim-back.png',
      '/products/snipe-denim-front.png',
      '/products/snipe-denim-detail.png'
    ],
    description: 'Rear view presentation highlighting custom pockets, tailored yoke construction, and the prominent vertical SNIPE speed stencil running down the lower calf.',
    fabricCare: '100% Rigid Indigo Denim.',
    isBestSeller: true,
    isNewIn: true
  },
  {
    id: 'snipe-brass-hardware-denim',
    title: 'SNIPE TAILORED WAIST DENIM TROUSERS',
    priceUSD: 185.0,
    category: 'Pants',
    gender: 'Unisex',
    subcategory: 'Denim',
    colors: ['Raw Indigo'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      '/products/snipe-denim-detail.png',
      '/products/snipe-denim-front.png',
      '/products/snipe-denim-back.png'
    ],
    description: 'Focusing on luxury craftsmanship: custom brass shank button, deep curved utility pockets, coin pocket with gold bar-tacking, and reinforced belt loops.',
    fabricCare: '14.5oz Raw Indigo Selvedge Denim.',
    isFeatured: true
  },
  {
    id: 'snipe-stealth-track-jacket',
    title: 'SNIPE REFLECTIVE RACING JACKET',
    priceUSD: 240.0,
    category: 'Jackets',
    gender: 'Unisex',
    subcategory: 'Outerwear',
    colors: ['Noir Black'],
    sizes: ['M', 'L', 'XL'],
    images: [
      '/products/snipe-jacket-front.png',
      '/products/snipe-jacket-back.png'
    ],
    description: 'Sharp angular white piping running along shoulder seams, sleeves, and side zip pockets for high visibility and sleek silhouette shaping.',
    fabricCare: 'Water-resistant technical poly blend with micro-fleece lining.',
    isNewIn: true,
    isFeatured: true
  },
  {
    id: 'snipe-heritage-indigo-jeans',
    title: 'SNIPE HEAVYWEIGHT RAW SELVEDGE',
    priceUSD: 195.0,
    category: 'Denim',
    gender: 'Unisex',
    subcategory: 'Pants',
    colors: ['Raw Indigo'],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      '/products/snipe-denim-front.png',
      '/products/snipe-denim-detail.png',
      '/products/snipe-denim-back.png'
    ],
    description: 'Classic wide-leg cuff with clean structured drape. Built for daily wear and natural fading characteristics over time.',
    fabricCare: 'Pure Unwashed Indigo Selvedge.',
    isBestSeller: true
  }
];

export const MOCK_ORDER_TIMELINE: Record<string, any> = {
  'SNIPE-90812': {
    orderNumber: 'SNIPE-90812',
    email: 'client@snipeluxe.com',
    status: 'Shipped from Lagos',
    estimatedDelivery: 'Oct 14, 2026',
    carrier: 'DHL Express International',
    trackingCode: 'DHL-SNIPE-908123',
    items: [
      {
        title: 'SNIPE DIRECTIONAL TRACK JACKET',
        quantity: 1,
        color: 'Noir Black / Crimson',
        size: 'L',
        priceUSD: 240.0,
        image: '/products/snipe-jacket-front.png'
      },
      {
        title: 'SNIPE RAW INDIGO BAGGY JEANS',
        quantity: 1,
        color: 'Raw Indigo / Gold Stitch',
        size: '32',
        priceUSD: 195.0,
        image: '/products/snipe-denim-front.png'
      }
    ],
    shippingAddress: 'SNIPELUXE Flagship Studio -> London, UK / New York, USA',
    updates: [
      { date: 'Oct 10, 2026', time: '14:30', location: 'Lagos Hub, Nigeria', status: 'Customs cleared & dispatched with DHL' },
      { date: 'Oct 09, 2026', time: '10:15', location: 'SNIPELUXE Atelier, Lagos', status: 'Handcrafted & quality inspected' },
      { date: 'Oct 08, 2026', time: '18:00', location: 'SNIPELUXE Online', status: 'Order confirmed & secured' }
    ]
  }
};
