import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { EXCHANGE_RATES } from '../constants';

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

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const getExchangeRate = useCallback((from: Currency, to: Currency): number => {
    if (from === to) return 1;
    return EXCHANGE_RATES[to] / EXCHANGE_RATES[from];
  }, []);

  const convertPrice = useCallback((price: number, fromCurrency: Currency = 'USD'): number => {
    if (fromCurrency === currency) return price;
    const rate = getExchangeRate(fromCurrency, currency);
    return Math.round(price * rate * 100) / 100; // Round to 2 decimal places
  }, [currency, getExchangeRate]);

  const getCurrencySymbol = useCallback((curr: Currency = currency): string => {
    return curr === 'USD' ? '$' : '₹';
  }, [currency]);

  const formatPrice = useCallback((price: number, fromCurrency: Currency = 'USD'): string => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const symbol = getCurrencySymbol();
    return `${symbol}${convertedPrice.toFixed(2)}`;
  }, [convertPrice, getCurrencySymbol]);

  const value: CurrencyContextType = useMemo(() => ({
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    getExchangeRate,
  }), [currency, convertPrice, formatPrice, getCurrencySymbol, getExchangeRate]);

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