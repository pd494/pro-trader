import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Clock } from 'lucide-react';

function StockCard({ 
  symbol, 
  name, 
  price, 
  change,
  volume,
  marketCap,
  dayRange,
  lastUpdated
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPositive = change >= 0;
  const changePercent = Math.abs(change);

  return (
    <div 
      className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800/50 transition-all cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{symbol}</h3>
          <p className="text-sm text-zinc-400">{name}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">${price.toLocaleString()}</p>
          <div className={`flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="text-sm">{changePercent}%</span>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <div className={`mt-4 space-y-3 overflow-hidden transition-all ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="h-32 bg-zinc-800/50 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-zinc-600" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-400 mb-1">Market Cap</p>
            <p className="font-medium">${(marketCap / 1e9).toFixed(2)}B</p>
          </div>
          <div>
            <p className="text-zinc-400 mb-1">Volume</p>
            <p className="font-medium">{(volume / 1e6).toFixed(2)}M</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-zinc-400 text-sm">Day Range</p>
          <div className="relative h-2 bg-zinc-800 rounded-full">
            <div 
              className="absolute h-full bg-indigo-500 rounded-full"
              style={{ 
                width: `${((price - dayRange.low) / (dayRange.high - dayRange.low)) * 100}%`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>${dayRange.low}</span>
            <span>${dayRange.high}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
          <button className="px-3 py-1 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
            Add to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export { StockCard };