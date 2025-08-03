export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  isNew?: boolean;
}

export interface CategoryData {
  [key: string]: string[];
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedSubCategory: string;
}

export interface SortConfig {
  key: keyof ShoppingItem | null;
  direction: 'asc' | 'desc';
}

export interface ReportData {
  totalSpending: number;
  highestCostItem: ShoppingItem | null;
  averageCost: number;
  totalItems: number;
  categoryTotals: { [key: string]: number };
}

export type ThemeMode = 'light' | 'dark';