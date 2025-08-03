
import React from 'react';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ShoppingProvider } from './context/ShoppingContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import Filters from './components/Filters';
import ShoppingTable from './components/ShoppingTable';
import ReportModal from './components/ReportModal';
import TitleRow from './components/TitleRow';


const AppContent: React.FC = () => {
  const { themeMode} = useTheme();

  return (
   
      <div className={`scroll-hidden h-screen ${themeMode === "dark" ? 'dark bg-black' : 'bg-white'}`}>
        <Header />
        <TitleRow/>
        <div className="">
        
        <div className="">
          <ItemForm />
          
          <div className="mb-4">
            <Filters />
            
          </div>
          
          <ShoppingTable />
        </div>
        </div>
        <ReportModal />
      </div>
    
  );
};

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <ShoppingProvider>
          <AppContent />
        </ShoppingProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
