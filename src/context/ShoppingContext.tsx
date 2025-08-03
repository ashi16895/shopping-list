import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type{ ShoppingItem, FilterState, SortConfig, ThemeMode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { generateMockData } from '../data/mockData';

interface ShoppingState {
  items: ShoppingItem[];
  filteredItems: ShoppingItem[];
  filters: FilterState;
  sortConfig: SortConfig;
  //isDarkMode: boolean;
  isReportModalVisible: boolean;
}

type ShoppingAction =
  | { type: 'ADD_ITEM'; payload: Omit<ShoppingItem, 'id' | 'total' | 'isNew'> }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SORT'; payload: SortConfig }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_REPORT_MODAL'; payload: boolean }
  | { type: 'REMOVE_NEW_LABELS' };

// Load mock data on initialization
const mockItems = generateMockData();

const initialState: ShoppingState = {
  items: mockItems,
  filteredItems: mockItems,
  filters: {
    searchTerm: '',
    selectedCategory: '',
    selectedSubCategory: '',
  },
  sortConfig: {
    key: null,
    direction: 'asc',
  },
  //isDarkMode: false,
  isReportModalVisible: false,
};

const ShoppingContext = createContext<{
  state: ShoppingState;
  dispatch: React.Dispatch<ShoppingAction>;
  addItem: (item: Omit<ShoppingItem, 'id' | 'total' | 'isNew'>) => void;
  exportData: (format: 'csv' | 'json') => void;
  getReportData: () => any;
} | null>(null);

function shoppingReducer(state: ShoppingState, action: ShoppingAction): ShoppingState {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem: ShoppingItem = {
        ...action.payload,
        id: uuidv4(),
        total: action.payload.quantity * action.payload.price,
        isNew: true,
      };
      const updatedItems = [newItem, ...state.items];
      return {
        ...state,
        items: updatedItems,
        filteredItems: applyFiltersAndSort(updatedItems, state.filters, state.sortConfig),
      };

    case 'SET_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters,
        filteredItems: applyFiltersAndSort(state.items, newFilters, state.sortConfig),
      };

    case 'SET_SORT':
      const newSortConfig = action.payload;
      return {
        ...state,
        sortConfig: newSortConfig,
        filteredItems: applyFiltersAndSort(state.items, state.filters, newSortConfig),
      };

    // case 'TOGGLE_THEME':
    //   return {
    //     ...state,
    //     isDarkMode: !state.isDarkMode,
    //   };

    case 'SET_REPORT_MODAL':
      return {
        ...state,
        isReportModalVisible: action.payload,
      };

    case 'REMOVE_NEW_LABELS':
      const itemsWithoutNewLabels = state.items.map(item => ({ ...item, isNew: false }));
      return {
        ...state,
        items: itemsWithoutNewLabels,
        filteredItems: applyFiltersAndSort(itemsWithoutNewLabels, state.filters, state.sortConfig),
      };

    default:
      return state;
  }
}

function applyFiltersAndSort(
  items: ShoppingItem[],
  filters: FilterState,
  sortConfig: SortConfig
): ShoppingItem[] {
  let filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory = !filters.selectedCategory || item.category === filters.selectedCategory;
    const matchesSubCategory = !filters.selectedSubCategory || item.subCategory === filters.selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  if (sortConfig.key) {
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;
      
      return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
    });
  }

  return filtered;
}

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Remove "New" labels after 5 seconds
  useEffect(() => {
    const hasNewItems = state.items.some(item => item.isNew);
    if (hasNewItems) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_NEW_LABELS' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.items]);

  const addItem = (item: Omit<ShoppingItem, 'id' | 'total' | 'isNew'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const exportData = (format: 'csv' | 'json') => {
    const dataToExport = state.filteredItems.map(({ isNew, ...item }) => item);
    
    if (format === 'json') {
      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shopping-list-${dayjs().format('YYYY-MM-DD')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = ['ID', 'Name', 'Category', 'Sub Category', 'Quantity', 'Price', 'Total', 'Date'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(item => 
          [item.id, item.name, item.category, item.subCategory, item.quantity, item.price, item.total, item.date].join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shopping-list-${dayjs().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getReportData = () => {
    const items = state.filteredItems;
    const totalSpending = items.reduce((sum, item) => sum + item.total, 0);
    const highestCostItem = items.reduce((max, item) => 
      item.total > (max?.total || 0) ? item : max, null as ShoppingItem | null);
    const averageCost = items.length > 0 ? totalSpending / items.length : 0;
    
    const categoryTotals = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.total;
      return acc;
    }, {} as { [key: string]: number });

    return {
      totalSpending,
      highestCostItem,
      averageCost,
      totalItems: items.length,
      categoryTotals,
    };
  };

  return (
    <ShoppingContext.Provider value={{ state, dispatch, addItem, exportData, getReportData }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};