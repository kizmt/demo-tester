import { FullMarketData, MarketData } from "@/utils/types";
import { create } from "zustand";

interface MarketState {
  marketId: string;
  marketData: FullMarketData | null;
  updateMarketId: (id: string) => void;
  setMarketData: (data: any) => void;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  marketId: "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q", // Set the default market ID here
  marketData: null,

  updateMarketId: (id: string) => {
    set({ marketId: id });
  },

  setMarketData: (data: any) => {
    set({ marketData: data });
  },
}));

// useMarketStore.subscribe((marketData) =>
//   console.log("Market data updated:", marketData.marketData)
// );
