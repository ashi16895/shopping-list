import React, { useState, useEffect, useCallback, memo } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useShoppingContext } from '../context/ShoppingContext';
import { getCategoryOptions, getSubCategoryOptions } from '../constants/categories';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { useErrorHandler } from '../hooks/useErrorHandler';
import PriceInput from './PriceInput';

const ItemForm: React.FC = memo(() => {
  const { themeMode } = useTheme();
  const { currency } = useCurrency();
  const { handleError } = useErrorHandler();
  const [form] = Form.useForm();
  const { addItem } = useShoppingContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategoryOptions, setSubCategoryOptions] = useState<Array<{label: string; value: string}>>([]);

  useEffect(() => {
    if (selectedCategory) {
      setSubCategoryOptions(getSubCategoryOptions(selectedCategory));
      form.setFieldsValue({ subCategory: undefined });
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedCategory, form]);

  interface FormValues {
    name: string;
    category: string;
    subCategory: string;
    quantity: number;
    price: number;
    date: dayjs.Dayjs;
  }

  const onFinish = useCallback((values: FormValues) => {
    try {
      // Store price in USD as base currency for consistency
      let priceInUSD = values.price;
      if (currency === 'INR') {
        priceInUSD = values.price / 83.12; // Convert INR to USD
      }

      // Validate inputs
      if (!values.name?.trim()) {
        throw new Error('Item name is required');
      }
      
      if (values.quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      
      if (values.price <= 0) {
        throw new Error('Price must be greater than 0');
      }

      const newItem = {
        name: values.name.trim(),
        category: values.category,
        subCategory: values.subCategory,
        quantity: values.quantity,
        price: priceInUSD, // Store in USD
        date: values.date.format('YYYY-MM-DD'),
      };

      addItem(newItem);
      
      // Reset form
      form.resetFields();
      form.setFieldsValue({ date: dayjs() });
      setSelectedCategory('');
    } catch (error) {
      handleError(error);
    }
  }, [addItem, currency, form, handleError]);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
    // Reset subcategory when category changes
    form.setFieldsValue({ subCategory: undefined });
  }, [form]);

  return (
    <div className="shopping-form-container px-[24px] py-[20px]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          date: dayjs(),
          quantity: 1,
          price: 0
        }}
      >
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Add new Item"
            >
              <Input placeholder="Enter Item Name" />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item
              name="category"
              label="Category"
            >
              <Select
                placeholder="Select"
                onChange={handleCategoryChange}
                options={getCategoryOptions()}
              />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item
              name="subCategory"
              label="Sub Category"
            >
              <Select
                placeholder="Select"
                disabled={!selectedCategory}
                options={subCategoryOptions}
              />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item
              name="quantity"
              label="Quantity"
            >
              <InputNumber 
                placeholder="0" 
                min={1} 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item
              name="price"
              label="Price"
            >
              <PriceInput
                placeholder="0"
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                showCurrencySelector={true}
              />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item
              name="date"
              label="Date"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col span={3}>
            <Form.Item>
              <Button 
                htmlType="submit" 
                icon={<PlusOutlined />}
                className={`w-full mt-[30px] ${themeMode === "dark" ? "bg-[#3086FF] text-black" : 'bg-[#1677FF] text-white'}`}
              >
                Add Item
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;