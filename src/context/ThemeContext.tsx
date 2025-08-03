import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { theme as antdTheme, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'shopping_app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  const themeConfig: ThemeConfig = useMemo(() => {
    const isDark = themeMode === 'dark';

    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        //Global tokens
        colorPrimary: isDark ? '#4096ff' : '#1677FF',
        colorBgBase: isDark ? '#1f1f1f' : '#ffffff',
        colorTextBase: isDark ? '#f5f5f5' : '#141414',
        borderRadius: 6,
        fontFamily: 'Inter, Proxima Nova, sans-serif',
      },
      components: {
        Modal:{
          contentBg: isDark? '#000000' : "#ffffff",
          headerBg: isDark? '#000000' : "#ffffff"
        },
        Button: {
          colorPrimary: isDark ?"#3086FF" :"#1677FF",
          colorPrimaryHover: isDark ? '#69b1ff' : '#36cfc9',
        },
        Layout: {
          colorBgHeader: isDark ? '#141414' : '#ffffff',
        },
      },
    };
  }, [themeMode]);


  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
