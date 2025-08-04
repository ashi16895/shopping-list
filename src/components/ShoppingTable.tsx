import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Badge, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useShoppingContext } from '../context/ShoppingContext';
import type { ShoppingItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { APP_CONFIG } from '../constants';


const ShoppingTable: React.FC = memo(() => {
  const {Title} = Typography
  const {themeMode} = useTheme();
  const { formatPrice } = useCurrency();
  const { state, dispatch } = useShoppingContext();
  const [visibleItems, setVisibleItems] = useState<ShoppingItem[]>([]);
  const [itemsPerPage] = useState(APP_CONFIG.ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleSort = (key: keyof ShoppingItem) => {
    const direction = 
      state.sortConfig.key === key && state.sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    dispatch({
      type: 'SET_SORT',
      payload: { key, direction }
    });
    
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const getSortIcon = (key: keyof ShoppingItem) => {
    if (state.sortConfig.key !== key) {
      return <span className="inline-flex flex-col ml-1 opacity-30">
        <ArrowUpOutlined style={{ fontSize: '8px', lineHeight: '8px' }} />
        <ArrowDownOutlined style={{ fontSize: '8px', lineHeight: '8px' }} />
      </span>;
    }
    
    return state.sortConfig.direction === 'asc' ? 
      <ArrowUpOutlined className="ml-1" style={{ fontSize: '12px' }} /> : 
      <ArrowDownOutlined className="ml-1" style={{ fontSize: '12px' }} />;
  };

  // Load more items when reaching bottom
  const loadMoreItems = useCallback(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const newVisibleItems = state.filteredItems.slice(startIndex, endIndex);
    setVisibleItems(newVisibleItems);
  }, [state.filteredItems, currentPage, itemsPerPage]);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && visibleItems.length < state.filteredItems.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [visibleItems.length, state.filteredItems.length]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);


  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    
    if (tableContainerRef.current) {
      observer.observe(tableContainerRef.current);
    }
    
    return () => observer.disconnect();
  }, [handleObserver]);

 const TableHeader = () => (
  <div
    className={`grid grid-cols-[2fr_repeat(6,_1fr)] gap-2 p-2 border-b border-gray text-sm font-semibold ${
      themeMode === 'dark'
        ? 'text-white bg-[#1C1917]'
        : 'text-black bg-[#F8FAFC]'
    }`}
  >
    {/* Item Name */}
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('name')}
    >
      Item Name
      {getSortIcon('name')}
    </div>

    {/* Equal columns */}
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('category')}
    >
      Category
      {getSortIcon('category')}
    </div>
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('subCategory')}
    >
      Sub Category
      {getSortIcon('subCategory')}
    </div>
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('quantity')}
    >
      Quantity
      {getSortIcon('quantity')}
    </div>
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('price')}
    >
      Price
      {getSortIcon('price')}
    </div>
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('total')}
    >
      Total
      {getSortIcon('total')}
    </div>
    <div
      className="cursor-pointer p-2 flex items-center justify-between"
      onClick={() => handleSort('date')}
    >
      Date
      {getSortIcon('date')}
    </div>
  </div>
);




  const TableRow = ({ item }: { item: ShoppingItem; index: number }) => (
  <div
    key={item.id}
    className={`grid grid-cols-[2fr_repeat(6,_1fr)] gap-2 p-4 border-b border-gray text-sm ${
      themeMode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}
  >
    {/* Item Name (2fr) */}
    <div className="flex items-center gap-2 font-semibold">
      <Title level={5}>{item.name}</Title>
      {item.isNew && (
        <Badge count="New" style={{ backgroundColor: '#52c41a' }} />
      )}
    </div>

    {/* Remaining columns (1fr each) */}
    <div className="text-left">{item.category}</div>
    <div className="text-left">{item.subCategory}</div>
    <div className="text-left">
      {item.quantity}
    </div>
    <div className="text-left">
      {formatPrice(item.price)}
    </div>
    <div className="text-left">
      {formatPrice(item.total)}
    </div>
    <div className="text-left">{new Date(item.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}</div>
  </div>
);


  return (
    <div className="shopping-table-container">
      <div 
        ref={tableContainerRef}
        className="overflow-hidden"
      >
        <TableHeader />
        
        <div className="max-h-96 overflow-y-auto">
          <>
            {visibleItems.map((item, index) => (
              <TableRow key={item.id} item={item} index={index} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
});

ShoppingTable.displayName = 'ShoppingTable';

export default ShoppingTable;