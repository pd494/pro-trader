import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function TransactionHistory({ transactions }) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Transaction History</h4>
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {transaction.type === 'buy' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className="text-zinc-400">
                {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.shares} shares
              </span>
            </div>
            <div className="text-right">
              <div>${transaction.price}</div>
              <div className="text-xs text-zinc-500">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { TransactionHistory };