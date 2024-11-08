import React from 'react';

function PortfolioChart({ positions }) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
  const [activeTimeframe, setActiveTimeframe] = React.useState('1M');

  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Portfolio Performance</h3>
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
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
      
      <div className="h-64 flex items-center justify-center text-zinc-600">
        Portfolio Chart Area
      </div>
    </div>
  );
}

export { PortfolioChart };