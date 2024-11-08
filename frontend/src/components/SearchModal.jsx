import React, { useState } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useStocks } from '../hooks/useStocks';

function SearchModal({ isOpen, onClose, onSelectStock }) {
  const [query, setQuery] = useState('');
  const { stocks, trendingStocks } = useStocks();
  
  if (!isOpen) return null;

  const filteredStocks = query
    ? stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectStock = (symbol) => {
    onSelectStock(symbol);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
      <div className="min-h-screen px-4 py-16">
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl">
            <div className="p-4 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stocks, ETFs, and crypto"
                  className="w-full bg-zinc-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="p-2">
              {query ? (
                filteredStocks.length > 0 ? (
                  <div className="space-y-1">
                    {filteredStocks.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleSelectStock(stock.symbol)}
                        className="w-full px-4 py-3 text-left hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-zinc-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div>${stock.price}</div>
                          <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change}%
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-400">
                    No results found for "{query}"
                  </div>
                )
              ) : (
                <>
                  <div className="flex items-center gap-2 px-2 py-3">
                    <TrendingUp className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm text-zinc-400">Trending</span>
                  </div>
                  <div className="space-y-1">
                    {trendingStocks.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleSelectStock(stock.symbol)}
                        className="w-full px-4 py-3 text-left hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-zinc-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div>${stock.price}</div>
                          <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change}%
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { SearchModal };