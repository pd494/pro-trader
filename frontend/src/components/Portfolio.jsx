import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function Portfolio() {
  const portfolioValue = 12462.63;
  const dayChange = 284.32;
  const dayChangePercent = 2.31;
  const isPositive = dayChange >= 0;

  return (
    <div className="pt-6">
      <h2 className="text-3xl font-bold">${portfolioValue.toLocaleString()}</h2>
      <div className="flex items-center gap-2 mt-2">
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
          <span className="font-medium">${Math.abs(dayChange).toLocaleString()}</span>
          <span className="ml-1">({dayChangePercent}%)</span>
        </div>
        <span className="text-zinc-400">Today</span>
      </div>
    </div>
  );
}

export { Portfolio };