import React from 'react';
import { Button } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import Cart from '../assets/Cart.svg';

const TitleRow: React.FC = () => {
  return (
    <div className="flex justify-between px-[18px] py-[24px] items-center">
      <div className="flex items-center flex-wrap">
        <img src={Cart} alt="cart-img" />
        <div className="text-[var(--text-primary)] font-semibold text-[20px] ml-[12px]">
          Shopping List Application
        </div>
      </div>
      <div>
        <Button
          className="font-semibold"
          icon={<BarChartOutlined className="!font-semibold" />}
        >
          <span className="font-semibold">View Reports</span>
        </Button>
      </div>
    </div>
  );
};

export default TitleRow;
