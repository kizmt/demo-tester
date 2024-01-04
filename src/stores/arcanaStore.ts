import { FullMarketData, MarketData, OrderBookData } from "@/utils/types";
import { create } from "zustand";

interface MarketState {
  marketId: string;
  marketData: FullMarketData | null;
  tradeHistory: any | null;
  orderBook: OrderBookData | null;
  updateMarketId: (id: string) => void;
  setMarketData: (data: any) => void;
  setTradeHistory: (data: any) => void;
  setOrderBook: (data: any) => void;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  marketId: "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q", // Set the default market ID here
  marketData: null,
  tradeHistory: null,
  orderBook: null,

  updateMarketId: (id: string) => {
    set({ marketId: id });
  },

  setMarketData: (data: any) => {
    set({ marketData: data });
  },

  setTradeHistory: (data: any) => {
    set({ tradeHistory: data });
  },

  setOrderBook: (data: any) => {
    set({ orderBook: data });
  },
}));

// useMarketStore.subscribe((marketData) =>
//   console.log("Market data updated:", marketData.marketData)
// );
