import React from 'react';
import { InputNumber, Select, Space } from 'antd';
import { useCurrency } from '../context/CurrencyContext';
import type { Currency } from '../context/CurrencyContext';

interface PriceInputProps {
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  min?: number;
  step?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  showCurrencySelector?: boolean;
}

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  placeholder = "0",
  min = 0,
  step = 0.01,
  style,
  disabled = false,
  showCurrencySelector = true,
}) => {
  const { currency, setCurrency, getCurrencySymbol, convertPrice } = useCurrency();

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    // Convert current value to new currency if there's a value
    if (value && onChange) {
      const convertedValue = convertPrice(value, currency === 'USD' ? 'USD' : 'INR');
      onChange(convertedValue);
    }
  };

  const currencyOptions = [
    { label: '$ USD', value: 'USD' },
    { label: '₹ INR', value: 'INR' },
  ];

  const addonAfter = showCurrencySelector ? (
    <Select
      value={currency}
      onChange={handleCurrencyChange}
      options={currencyOptions}
      style={{ width: 80 }}
      size="small"
    />
  ) : (
    getCurrencySymbol()
  );

  const priceParser = (displayValue: string | undefined) => {
    if (!displayValue) return 0;
    // Remove currency symbols and spaces
    const parsed = displayValue.replace(/[\$₹\s,]/g, '');
    return parsed === '' ? 0 : Number(parsed);
  };

  const priceFormatter = (val: number | undefined) => {
    if (!val) return '';
    return `${val}`;
  };

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      style={style}
      disabled={disabled}
      addonAfter={addonAfter}
      formatter={priceFormatter}
      parser={priceParser}
      precision={2}
    />
  );
};

export default PriceInput;