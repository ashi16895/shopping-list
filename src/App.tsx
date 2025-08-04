
import React, { memo } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ShoppingProvider } from './context/ShoppingContext';
import { CurrencyProvider } from './context/CurrencyContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import Filters from './components/Filters';
import ShoppingTable from './components/ShoppingTable';
import ReportModal from './components/ReportModal';
import TitleRow from './components/TitleRow';

const AppContent: React.FC = memo(() => {
  const { themeMode } = useTheme();

  const containerClasses = `
    scroll-hidden 
    h-screen 
    ${themeMode === 'dark' ? 'dark bg-black' : 'bg-white'}
    transition-colors 
    duration-200
  `.trim();

  return (
    <div className={containerClasses}>
      <Header />
      <TitleRow />
      
      <div>
        <ItemForm />
        
        <div className="mb-4">
          <Filters />
        </div>
        
        <ShoppingTable />
      </div>
      
      <ReportModal />
    </div>
  );
});

AppContent.displayName = 'AppContent';

function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          },
        }}
      >
        <ThemeProvider>
          <CurrencyProvider>
            <ShoppingProvider>
              <AppContent />
            </ShoppingProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
