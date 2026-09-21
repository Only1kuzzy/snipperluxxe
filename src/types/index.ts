export type CurrencyCode = 'USD' | 'NGN' | 'GBP' | 'EUR' | 'CAD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Multiplier relative to USD
  name: string;
  flag: string;
}

export type CategoryType =
  | 'All Products'
  | 'Best Sellers'
  | 'New In'
  | 'Shirts'
  | 'Denim'
  | 'Jackets'
  | 'Shorts'
  | 'Pants'
  | 'Hoodies'
  | 'Outerwear'
  | 'Tops'
  | 'Gown'
  | 'Skirts'
  | 'BumShorts'
  | 'Accessories'
  | 'Tracksuits'
  | 'Featured Products';

export interface Product {
  id: string;
  title: string;
  priceUSD: number;
  category: CategoryType;
  gender: 'Men' | 'Women' | 'Unisex';
  subcategory?: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  fabricCare?: string;
  isBestSeller?: boolean;
  isNewIn?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface OrderTrackingInfo {
  orderNumber: string;
  email: string;
  status: 'Order Placed' | 'In Production' | 'Shipped from Lagos' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  carrier: string;
  trackingCode: string;
  items: {
    title: string;
    quantity: number;
    color: string;
    size: string;
    priceUSD: number;
    image: string;
  }[];
  shippingAddress: string;
  updates: {
    date: string;
    time: string;
    location: string;
    status: string;
  }[];
}

export type TabType = 'HOME' | 'SHOP' | 'ABOUT' | 'FAQ' | 'CONTACT' | 'TRACK YOUR ORDER';
