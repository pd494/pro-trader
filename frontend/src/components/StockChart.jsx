import React from 'react';

function StockChart() {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="mt-6">
      <div className="h-64 bg-zinc-900 rounded-xl mb-4">
        {/* Chart placeholder - In a real app, use a charting library */}
        <div className="w-full h-full flex items-center justify-center text-zinc-600">
          Interactive Chart Area
        </div>
      </div>
      <div className="flex justify-between gap-2">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            className="flex-1 py-2 text-center rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
}

export { StockChart };