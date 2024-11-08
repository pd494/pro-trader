import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import { TransactionHistory } from './TransactionHistory';

function PositionsList({ positions }) {
  const [expandedPosition, setExpandedPosition] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Positions</h2>
      <div className="space-y-3">
        {positions.map((position) => {
          const marketValue = position.currentPrice * position.shares;
          const gain = (position.currentPrice - position.avgPrice) * position.shares;
          const gainPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100;
          const isExpanded = expandedPosition === position.symbol;

          return (
            <div key={position.symbol} className="bg-zinc-900 rounded-xl p-4">
              <div 
                className="flex justify-between items-start mb-2 cursor-pointer"
                onClick={() => setExpandedPosition(isExpanded ? null : position.symbol)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{position.symbol}</h3>
                    {isExpanded ? 
                      <ChevronUp className="w-4 h-4 text-zinc-400" /> : 
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    }
                  </div>
                  <p className="text-sm text-zinc-400">{position.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${marketValue.toLocaleString()}</p>
                  <div className={`flex items-center justify-end ${gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {gain >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="text-sm">${Math.abs(gain).toLocaleString()} ({gainPercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-zinc-400">
                <span>{position.shares} shares</span>
                <span>Avg. ${position.avgPrice}</span>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Current Price</p>
                      <p className="font-medium">${position.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Day Change</p>
                      <p className={position.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {position.dayChange}%
                      </p>
                    </div>
                  </div>
                  
                  <TransactionHistory transactions={position.transactions} />
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                      Buy More
                    </button>
                    <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Sell
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { PositionsList };