import { useState } from 'react';

export function useStocks() {
  const [stocks] = useState([
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
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 141.80,
      change: 1.15,
      volume: 28456789,
      marketCap: 1790000000000,
      dayRange: { low: 140.50, high: 142.30 },
      lastUpdated: '5 mins ago'
    },
    {
      symbol: 'META',
      name: 'Meta Platforms, Inc.',
      price: 484.05,
      change: 2.78,
      volume: 19876543,
      marketCap: 1240000000000,
      dayRange: { low: 478.20, high: 485.50 },
      lastUpdated: '4 mins ago'
    }
  ]);

  const trendingStocks = stocks.slice(0, 5);

  const getStockBySymbol = (symbol) => 
    stocks.find(stock => stock.symbol === symbol);

  return {
    stocks,
    trendingStocks,
    getStockBySymbol
  };
}