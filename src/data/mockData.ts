import type { ShoppingItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateMockData = (): ShoppingItem[] => {
  const items: Omit<ShoppingItem, 'id' | 'total'>[] = [
    { name: 'Milk', category: 'Dairy', subCategory: 'Milk', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Bread', category: 'Grains', subCategory: 'Bread', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Eggs', category: 'Dairy', subCategory: 'Eggs', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Apples', category: 'Fruits', subCategory: 'Apples', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Oranges', category: 'Fruits', subCategory: 'Oranges', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Chicken', category: 'Meat', subCategory: 'Chicken', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Rice', category: 'Grains', subCategory: 'Rice', quantity: 2, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Fish', category: 'Meat', subCategory: 'Fish', quantity: 1, price: 170.50, date: '2024-02-25', isNew: false },
    { name: 'Pasta', category: 'Grains', subCategory: 'Pasta', quantity: 3, price: 4.25, date: '2024-02-25', isNew: false },
    { name: 'Tomatoes', category: 'Vegetables', subCategory: 'Tomatoes', quantity: 4, price: 4.00, date: '2024-02-25', isNew: false },
    { name: 'Carrots', category: 'Vegetables', subCategory: 'Carrots', quantity: 5, price: 4.25, date: '2024-02-25', isNew: false },
    { name: 'Potatoes', category: 'Vegetables', subCategory: 'Potatoes', quantity: 6, price: 4.50, date: '2024-02-25', isNew: false },
    { name: 'Onions', category: 'Vegetables', subCategory: 'Onions', quantity: 3, price: 5.50, date: '2024-02-25', isNew: false },
  ];

  return items.map(item => ({
    ...item,
    id: uuidv4(),
    total: item.quantity * item.price,
  }));
};