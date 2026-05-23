import { useState, useEffect } from 'react';
import { PortfolioData, getPortfolioData, savePortfolioData } from './portfolioStore';

export function usePortfolioData(): [PortfolioData, (data: PortfolioData) => void] {
  const [data, setData] = useState<PortfolioData>(getPortfolioData);

  useEffect(() => {
    const onUpdate = (e: Event) => setData((e as CustomEvent<PortfolioData>).detail);
    const onStorage = () => setData(getPortfolioData());
    window.addEventListener('portfolio_updated', onUpdate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('portfolio_updated', onUpdate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return [data, savePortfolioData];
}
