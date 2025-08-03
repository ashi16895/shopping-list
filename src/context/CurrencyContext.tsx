import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'INR';

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  formatPrice: (price: number, fromCurrency?: Currency) => string;
  getCurrencySymbol: (currency?: Currency) => string;
  getExchangeRate: (from: Currency, to: Currency) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (USD as base currency)
const EXCHANGE_RATES = {
  USD: 1,
  INR: 83.12, // 1 USD = 83.12 INR (example rate)
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const getExchangeRate = (from: Currency, to: Currency): number => {
    if (from === to) return 1;
    return EXCHANGE_RATES[to] / EXCHANGE_RATES[from];
  };

  const convertPrice = (price: number, fromCurrency: Currency = 'USD'): number => {
    if (fromCurrency === currency) return price;
    const rate = getExchangeRate(fromCurrency, currency);
    return price * rate;
  };

  const getCurrencySymbol = (curr: Currency = currency): string => {
    return curr === 'USD' ? '$' : '₹';
  };

  const formatPrice = (price: number, fromCurrency: Currency = 'USD'): string => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const symbol = getCurrencySymbol();
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    getExchangeRate,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};