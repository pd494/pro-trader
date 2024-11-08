import React, { useState } from 'react';
import { LineChart, Wallet, Bell, Menu, Search } from 'lucide-react';
import { SearchModal } from './SearchModal';

function Layout({ children, onSelectStock }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('markets');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-900/90 backdrop-blur-lg border-b border-zinc-800 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <Menu className="w-6 h-6" />
            <span className="font-bold">TradeX</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6" />
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children(activeTab)}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800">
        <div className="flex items-center justify-around h-20">
          <button 
            className="flex flex-col items-center gap-1"
            onClick={() => setActiveTab('markets')}
          >
            <LineChart className={`w-6 h-6 ${activeTab === 'markets' ? 'text-indigo-500' : 'text-zinc-400'}`} />
            <span className={`text-xs ${activeTab === 'markets' ? 'text-indigo-500' : 'text-zinc-400'}`}>Markets</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-6 h-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">Search</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1"
            onClick={() => setActiveTab('portfolio')}
          >
            <Wallet className={`w-6 h-6 ${activeTab === 'portfolio' ? 'text-indigo-500' : 'text-zinc-400'}`} />
            <span className={`text-xs ${activeTab === 'portfolio' ? 'text-indigo-500' : 'text-zinc-400'}`}>Portfolio</span>
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStock={onSelectStock}
      />
    </div>
  );
}

export { Layout };