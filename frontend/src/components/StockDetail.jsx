import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart2, DollarSign, Clock } from 'lucide-react';

function StockDetail({ stock, onClose }) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
  const [activeTimeframe, setActiveTimeframe] = React.useState('1D');
  const isPositive = stock.change >= 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{stock.symbol}</h2>
                <p className="text-zinc-400">{stock.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Price and Change */}
            <div className="mb-8">
              <div className="text-3xl font-bold">${stock.price}</div>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                <span>{Math.abs(stock.change)}%</span>
                <span className="text-zinc-400 ml-1">Today</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-6">
              <div className="h-64 bg-zinc-800/50 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-zinc-700" />
              </div>
              <div className="flex gap-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeTimeframe === timeframe
                        ? 'bg-indigo-500 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800'
                    }`}
                    onClick={() => setActiveTimeframe(timeframe)}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <BarChart2 className="w-4 h-4" />
                  <span className="text-sm">Volume</span>
                </div>
                <div className="font-medium">{(stock.volume / 1e6).toFixed(2)}M</div>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Market Cap</span>
                </div>
                <div className="font-medium">${(stock.marketCap / 1e9).toFixed(2)}B</div>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Updated</span>
                </div>
                <div className="font-medium">{stock.lastUpdated}</div>
              </div>
            </div>

            {/* Day Range */}
            <div className="mb-8">
              <h3 className="text-sm text-zinc-400 mb-2">Day Range</h3>
              <div className="relative h-2 bg-zinc-800 rounded-full mb-2">
                <div 
                  className="absolute h-full bg-indigo-500 rounded-full"
                  style={{ 
                    width: `${((stock.price - stock.dayRange.low) / (stock.dayRange.high - stock.dayRange.low)) * 100}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>${stock.dayRange.low}</span>
                <span>${stock.dayRange.high}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                Buy
              </button>
              <button className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-medium hover:bg-zinc-700 transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StockDetail };