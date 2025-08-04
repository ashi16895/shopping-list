import React, { useState, useEffect } from 'react';
import { Input, Select, Typography} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useShoppingContext } from '../context/ShoppingContext';
import { getCategoryOptions, getSubCategoryOptions } from '../constants/categories';
import ExportButton from './ExportButton';
import { useTheme } from '../context/ThemeContext';


const { Search } = Input;

const Filters: React.FC = () => {
  const { themeMode} = useTheme();
  const { Title } = Typography;
  const { state, dispatch } = useShoppingContext();
  const [subCategoryOptions, setSubCategoryOptions] = useState<Array<{label: string; value: string}>>([]);

  useEffect(() => {
    if (state.filters.selectedCategory) {
      setSubCategoryOptions(getSubCategoryOptions(state.filters.selectedCategory));
    } else {
      setSubCategoryOptions([]);
      if (state.filters.selectedSubCategory) {
        dispatch({ 
          type: 'SET_FILTERS', 
          payload: { selectedSubCategory: '' } 
        });
      }
    }
  }, [state.filters.selectedCategory, state.filters.selectedSubCategory, dispatch]);

  const handleSearchChange = (value: string) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { searchTerm: value } 
    });
  };

  const handleCategoryChange = (value: string) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { 
        selectedCategory: value,
        selectedSubCategory: '' // Reset subcategory when category changes
      } 
    });
  };

  const handleSubCategoryChange = (value: string) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { selectedSubCategory: value } 
    });
  };

  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...getCategoryOptions()
  ];

  const subCategoryOptionsWithAll = [
    { label: 'All Sub Categories', value: '' },
    ...subCategoryOptions
  ];

  return (
    <div className='flex px-6 py-6 justify-between items-start'>
      <div className="flex-shrink-0">
        <Title level={4}>{state.filteredItems.length} Items</Title>
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className={`text-sm font-medium whitespace-nowrap ${themeMode === "dark"? "text-white": "text-black"}`}>
          Filter By
        </div>
        
        <div className="flex gap-2 items-center">
          <Select
            placeholder="Select Category"
            value={state.filters.selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: 140, minWidth: 140 }}
            options={categoryOptions}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          />
          
          <Select
            placeholder="Select Sub Category"
            value={state.filters.selectedSubCategory}
            onChange={handleSubCategoryChange}
            style={{ width: 160, minWidth: 160 }}
            disabled={!state.filters.selectedCategory}
            options={subCategoryOptionsWithAll}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          />
          
          <Search
            placeholder="Search"
            value={state.filters.searchTerm}
            onChange={e => handleSearchChange(e.target.value)}
            style={{ width: 200, minWidth: 200 }}
            prefix={<SearchOutlined />}
          />
          
          <ExportButton />
        </div>
      </div>
    </div>
  );
};

export default Filters;
