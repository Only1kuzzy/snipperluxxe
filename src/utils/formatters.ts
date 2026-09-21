import { Currency } from '../types';

export function formatPrice(amountUSD: number, currency: Currency): string {
  const converted = amountUSD * currency.rate;
  
  if (currency.code === 'NGN') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
  
  return `${currency.symbol}${converted.toFixed(2)}`;
}
