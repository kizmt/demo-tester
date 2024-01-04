import { PublicKey } from '@solana/web3.js';
import CoinLogos from '../config/logos.json';
import { MarketAccount } from '@openbook-dex/openbook-v2';

export interface FullMarketData {
    marketId: 'C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q';
    name: string;
    baseMint: string;
    quoteMint: string;
    bids: string;
    asks: string;
    eventHeap: string;
    takerVolume: number;
    makerVolume: number;
    baseDecimals: number;
    quoteDecimals: number;
    quoteLotSize: number;
    baseLotSize: number;
    quoteDepositTotal: number;
    baseDepositTotal: number;
    midpoint: number;
};

export interface MarketData {
  market: {
    marketId: string;
    name: string;
    baseMint: string;
    quoteMint: string;
    takerVolume: number;
    makerVolume: number;
    baseDecimals: number;
    quoteDecimals: number;
    quoteLotSize: number;
    baseLotSize: number;
    quoteDepositTotal: number;
    baseDepositTotal: number;
  };
  midpoint: number;
};

export interface OrderBookData {
  midpoint: number;
  market: {
    bidOrders: Order[];
    askOrders: Order[];
  }
};

export interface Order {
  trader: string;
  price: number;
  size: number;
  sizePercent?: number;
};

export interface CarouselCardProps {
      item: {
        market: {
          marketId: string;
          name: string;
          takerVolume: number;
          makerVolume: number;
          quoteDecimals: number;
        },
        midpoint: number;
      };
};
    
export interface OpenBookTradeEvent {
    takerSide: number;
    timeStamp: number;
    priceDouble: number;
    quantityDouble: number;
    takerOwner: string;
    makerOwner: string;
    transaction: string;
};

export type CoinLogosType = {
    [key: string]: string;
};

export const CoinLogosTyped: CoinLogosType = CoinLogos as CoinLogosType;

export interface MarketContextValues extends FullMarketInfo {
  market: MarketAccount | undefined | null;
  setMarketAddress: (newMarketAddress: string) => void;
};

export interface FullMarketInfo {
  address?: PublicKey;
  name?: string;
  programId?: PublicKey;
  quoteLabel?: string;
  baseLabel?: string;
  marketName?: string;
  baseCurrency?: string;
  quoteCurrency?: string;
  marketInfo?: MarketInfo;
};

export interface MarketInfo {
  address: PublicKey;
  name: string;
  programId: PublicKey;
  quoteLabel?: string;
  baseLabel?: string;
}
