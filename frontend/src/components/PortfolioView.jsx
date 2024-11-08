import React, { useState } from 'react';
import { PortfolioSummary } from './portfolio/PortfolioSummary';
import { PositionsList } from './portfolio/PositionsList';
import { PortfolioChart } from './portfolio/PortfolioChart';
import { OnboardingModal } from './onboarding/OnboardingModal';
import { usePortfolio } from '../hooks/usePortfolio';

function PortfolioView() {
  const { positions, totalValue, totalGain, totalGainPercent } = usePortfolio();
  const [showOnboarding, setShowOnboarding] = useState(true); // In real app, check if first time

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <PortfolioSummary 
          totalValue={showOnboarding ? 0 : totalValue}
          totalGain={showOnboarding ? 0 : totalGain}
          totalGainPercent={showOnboarding ? 0 : totalGainPercent}
        />
        <PortfolioChart positions={showOnboarding ? [] : positions} />
        <PositionsList positions={showOnboarding ? [] : positions} />
      </div>

      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </>
  );
}

export { PortfolioView };