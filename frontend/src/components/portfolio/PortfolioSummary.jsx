import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Clock } from 'lucide-react';

function PortfolioSummary({ totalValue, totalGain, totalGainPercent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <DollarSign className="w-5 h-5" />
          <span>Total Value</span>
        </div>
        <div className="text-xl font-bold">${totalValue.toLocaleString()}</div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span>Total Return</span>
        </div>
        <div className={`text-xl font-bold flex items-center gap-1 ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalGain >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
          ${Math.abs(totalGain).toLocaleString()} ({totalGainPercent.toFixed(2)}%)
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <Clock className="w-5 h-5" />
          <span>Last Updated</span>
        </div>
        <div className="text-xl font-bold">2 mins ago</div>
      </div>
    </div>
  );
}

export { PortfolioSummary };