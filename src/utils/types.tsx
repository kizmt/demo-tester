import CoinLogos from '../config/logos.json';

export interface FullMarketData {
    marketId: string;
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
