import { FullMarketData, MarketData } from '@/utils/types';
import { create } from 'zustand';

interface MarketState {
  marketId: string;
  marketData: FullMarketData | null; // Use your MarketData type here
  setMarketId: (id: string) => void;
  fetchMarketData: () => void;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  marketId: 'C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q', // Set the default market ID here
  marketData: null,
  setMarketId: () => set({ marketId: 'C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q' }),
  fetchMarketData: async () => {
    const marketId = get().marketId;
    try {
      const response = await fetch(`https://alpha.arcana.markets/api/openbookv2/markets/${marketId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ marketData: data });
    } catch (error) {
      console.error('Error fetching market details:', error);
    }
  },
}));