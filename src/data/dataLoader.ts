import type { ShoppingItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import mockDataJson from './mock-data.json';

interface JsonItem {
  name: string;
  category: string;
  subcategory: string;
  qty: number;
  price: number;
  date: string;
}

export const loadMockData = (): ShoppingItem[] => {
  const jsonData = mockDataJson as JsonItem[];
  
  return jsonData.map(item => ({
    id: uuidv4(),
    name: item.name,
    category: item.category,
    subCategory: item.subcategory, // Map subcategory to subCategory
    quantity: item.qty, // Map qty to quantity
    price: item.price,
    total: item.qty * item.price, // Calculate total
    date: item.date,
    isNew: false
  }));
};