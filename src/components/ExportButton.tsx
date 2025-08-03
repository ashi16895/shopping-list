import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useShoppingContext } from '../context/ShoppingContext';

const ExportButton: React.FC = () => {
  const { exportData, state } = useShoppingContext();

  const handleExport = (format: 'csv' | 'json') => {
    exportData(format);
  };

  const items: MenuProps['items'] = [
    {
      key: 'csv',
      label: 'Export as CSV',
      onClick: () => handleExport('csv'),
    },
    {
      key: 'json',
      label: 'Export as JSON', 
      onClick: () => handleExport('json'),
    },
  ];

  const isDisabled = state.filteredItems.length === 0;

  return (
    <Dropdown menu={{ items }} disabled={isDisabled}>
      <Button 
        icon={<DownloadOutlined />}
        disabled={isDisabled}
        className="flex items-center w-50"
      >
        <Space>
          Export Data
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ExportButton;
