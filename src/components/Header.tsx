import React from 'react';
import { Switch } from 'antd';
import zeta_logoPrimary from '../assets/zeta_logoPrimary.svg';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className="header-bg-color px-6 py-3 text-white flex justify-between items-center">
      <img src={zeta_logoPrimary} className="zeta-logo h-8" alt="zeta-logo" />

      <div className="flex items-center gap-2">
        <span className="text-sm text-white font-inter">
          {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
        <Switch checked={themeMode === 'dark'} onChange={toggleTheme} size="small" className={`
    ${themeMode === 'dark' ? 'bg-[#1677FF]' : 'bg-[#E2E2E240]'}
  `}/>
      </div>
    </div>
  );
};

export default Header;
