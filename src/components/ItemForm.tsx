import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useShoppingContext } from '../context/ShoppingContext';
import { getCategoryOptions, getSubCategoryOptions } from '../constants/categories';
import { useTheme } from '../context/ThemeContext';

const ItemForm: React.FC = () => {
const { themeMode } = useTheme();
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

  const onFinish = (values: FormValues) => {
    const newItem = {
      name: values.name,
      category: values.category,
      subCategory: values.subCategory,
      quantity: values.quantity,
      price: values.price,
      date: values.date.format('YYYY-MM-DD'),
    };

    addItem(newItem);
    form.resetFields();
    form.setFieldsValue({ date: dayjs() });
    setSelectedCategory('');
    message.success('Item added successfully!');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const priceParser = (value: string | undefined) => {
    if (!value) return 0;
    const parsed = value.replace(/\$\s?|(,*)/g, '');
    return parsed === '' ? 0 : Number(parsed);
  };

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
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="name"
              label="Add new Item"
            //   rules={[{  message: 'Please enter item name!' }]}
            >
              <Input placeholder="Enter Item Name" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={3}>
            <Form.Item
              name="category"
              label="Category"
            //   rules={[{ message: 'Please select category!' }]}
            >
              <Select
                placeholder="Select"
                onChange={handleCategoryChange}
                options={getCategoryOptions()}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={3}>
            <Form.Item
              name="subCategory"
              label="Sub Category"
            //   rules={[{ message: 'Please select sub category!' }]}
            >
              <Select
                placeholder="Select"
                disabled={!selectedCategory}
                options={subCategoryOptions}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={3}>
            <Form.Item
              name="quantity"
              label="Quantity"
            //   rules={[{ message: 'Please enter quantity!' }]}
            >
              <InputNumber 
                placeholder="0" 
                min={1} 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={3}>
            <Form.Item
              name="price"
              label="Price"
            //   rules={[{ message: 'Please enter price!' }]}
            >
              <InputNumber
                placeholder="0"
                min={0}
                step={0.01}
                formatter={value => `$ ${value}`}
                parser={priceParser}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={3}>
            <Form.Item
              name="date"
              label="Date"
              //rules={[{ message: 'Please select date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            
          </Col>
          <Col xs={24} sm={24} md={3}>
            <Form.Item>
              <Button 
                htmlType="submit" 
                icon={<PlusOutlined />}
                className={`w-full md:w-auto mt-[30px]  ${themeMode === "dark" ? "bg-[#3086FF] text-black" : 'bg-[#1677FF] text-white'}`}
              >
                Add Item
              </Button>
            </Form.Item>
          </Col>
          
        </Row>
      </Form>
    </div>
  );
};

export default ItemForm;
