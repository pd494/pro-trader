import { useState, useEffect } from 'react';

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  dayChange: number;
  lastUpdated: string;
  transactions: Transaction[];
}

interface Transaction {
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  date: string;
}

export function usePortfolio() {
  const [positions, setPositions] = useState<Position[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 10,
      avgPrice: 150.25,
      currentPrice: 173.24,
      dayChange: 2.31,
      lastUpdated: '2 mins ago',
      transactions: [
        { type: 'buy', shares: 5, price: 145.50, date: '2024-01-15' },
        { type: 'buy', shares: 5, price: 155.00, date: '2024-02-01' }
      ]
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      shares: 5,
      avgPrice: 220.50,
      currentPrice: 248.50,
      dayChange: -1.24,
      lastUpdated: '1 min ago',
      transactions: [
        { type: 'buy', shares: 8, price: 210.25, date: '2024-01-10' },
        { type: 'sell', shares: 3, price: 240.75, date: '2024-02-15' }
      ]
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft',
      shares: 8,
      avgPrice: 310.75,
      currentPrice: 338.11,
      dayChange: 0.87,
      lastUpdated: '3 mins ago',
      transactions: [
        { type: 'buy', shares: 8, price: 310.75, date: '2024-01-20' }
      ]
    }
  ]);

  const totalValue = positions.reduce((sum, pos) => sum + (pos.currentPrice * pos.shares), 0);
  const totalCost = positions.reduce((sum, pos) => sum + (pos.avgPrice * pos.shares), 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;

  return {
    positions,
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    addPosition: (position: Position) => setPositions([...positions, position]),
    updatePosition: (symbol: string, updates: Partial<Position>) => {
      setPositions(positions.map(p => 
        p.symbol === symbol ? { ...p, ...updates } : p
      ));
    }
  };
}