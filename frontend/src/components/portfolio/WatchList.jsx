import React from 'react';
import { StockCard } from '../StockCard';
function WatchList() {
  const stocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 173.24,
      change: 2.31,
      volume: 52834521,
      marketCap: 2890000000000,
      dayRange: { low: 171.96, high: 174.30 },
      lastUpdated: '2 mins ago'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 248.50,
      change: -1.24,
      volume: 35672134,
      marketCap: 788000000000,
      dayRange: { low: 247.12, high: 252.75 },
      lastUpdated: '1 min ago'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft',
      price: 338.11,
      change: 0.87,
      volume: 22145678,
      marketCap: 2520000000000,
      dayRange: { low: 336.25, high: 339.04 },
      lastUpdated: '3 mins ago'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com',
      price: 127.12,
      change: -0.45,
      volume: 41234567,
      marketCap: 1310000000000,
      dayRange: { low: 126.80, high: 128.45 },
      lastUpdated: '1 min ago'
    }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Watchlist</h2>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          Edit List
        </button>
      </div>
      <div className="space-y-3">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} {...stock} />
        ))}
      </div>
    </div>
  );
}

export {WatchList};