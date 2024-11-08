import React from 'react';
import { StockChart } from './StockChart';
import { WatchList } from './portfolio/WatchList';
import { Portfolio } from './Portfolio';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <Portfolio />
      <StockChart />
      <WatchList />
    </div>
  );
}

export { Dashboard };