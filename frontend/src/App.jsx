import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignupScreen } from './components/auth/SignupScreen';
import { SigninScreen } from './components/auth/SigninScreen';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './components/Dashboard';
import { PortfolioView } from './components/PortfolioView';
import { StockDetail } from './components/StockDetail';
import { useStocks } from './hooks/useStocks';
function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const { getStockBySymbol } = useStocks();

  const handleSelectStock = (symbol) => {
    setSelectedStock(symbol);
  };

  const stock = selectedStock ? getStockBySymbol(selectedStock) : null;

  const AuthenticatedApp = () => (
    <MainLayout onSelectStock={handleSelectStock}>
      {(activeTab) => (
        <>
          {activeTab === 'markets' ? <Dashboard /> : <PortfolioView />}
          {stock && (
            <StockDetail 
              stock={stock} 
              onClose={() => setSelectedStock(null)} 
            />
          )}
        </>
      )}
    </MainLayout>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/" element={<AuthenticatedApp />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;