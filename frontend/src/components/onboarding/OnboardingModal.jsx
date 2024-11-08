import React, { useState } from 'react';
import { DollarSign, ArrowRight, Wallet } from 'lucide-react';

function OnboardingModal({ isOpen, onClose }) {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the investment amount
    onClose();
  };

  const formatAmount = (value) => {
    const number = value.replace(/[^0-9]/g, '');
    if (number === '') return '';
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(number);
  };

  const handleAmountChange = (e) => {
    const formatted = formatAmount(e.target.value);
    setInvestmentAmount(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8">
        {step === 1 ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Welcome to TradeX</h2>
            <p className="text-zinc-400 mb-8">Let's set up your portfolio to start investing</p>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Initial Investment</h2>
              <p className="text-zinc-400">How much would you like to start with?</p>
            </div>

            <div className="mb-8">
              <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-2">
                Amount to Invest
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  id="amount"
                  value={investmentAmount}
                  onChange={handleAmountChange}
                  className="w-full bg-zinc-800 rounded-xl pl-10 pr-4 py-4 text-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center font-bold"
                  placeholder="0"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group"
                disabled={!investmentAmount}
              >
                Start Investing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-zinc-800 text-white py-3 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export { OnboardingModal };