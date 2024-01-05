'use client'

import React, { useEffect } from 'react';

import ComponentWrapper from '../components/ComponentWrapper';

import CarouselSlider from '../components/marketData/CarouselSlider';
import TradingChart from '../components/marketData/TradingChart';
import BuyAndSell from '../components/marketData/BuyAndSell';
import OrderBook from '../components/marketData/OrderBook';
import MarketVolume from '../components/marketData/MarketVolume';
import TradeHistory from '../components/marketData/TradeHistory';
import MarketDepth from '../components/marketData/MarketDepth';
import MarketInformation from '../components/marketData/MarketInformation';
import AdditionalDetails from '../components/marketData/AdditionalDetails';
import MarketSelect from '@/components/marketData/MarketSelect';

export default function Home() {

  return (
    <main className='w-full'>
      <CarouselSlider />
      <ComponentWrapper>
      <MarketSelect />
        <div className='w-full flex flex-col'>
          {/* trading chart + Buy and Sell portion ========>  */}
          <div className='w-full grid grid-cols-1 lg:grid-cols-[1.9fr,1fr] lg:gap-0 gap-8 justify-center items-start py-2 sm:py-6'>
            {/* trading chart ----->  */}
            <div className='w-full flex justify-center items-center'>
              <div className='w-full max-w-[700px] lg:max-w-none bg-transparent h-full'>
                <TradingChart />
              </div>
            </div>
            {/* buy and sell ------->  */}
            <div className='w-full flex justify-center items-center'>
              <BuyAndSell />
            </div>
          </div>
          {/* order book + market volume + market depth section =========> */}
          <div className='w-full grid grid-cols-1 xl:grid-cols-[1.9fr,1fr] gap-6 xl:gap-0 justify-center items-start pt-6 pb-10 sm:pb-20'>
            {/* order book ---> */}
            <OrderBook />
            {/* market volume ----->  */}
            <div className='w-full gap-y-4 gap-x-4 flex flex-col md:flex-row xl:flex-col'>
              <MarketVolume />
              <MarketDepth />
            </div>
          </div>
        </div>
      </ComponentWrapper>
      <div className='w-full bg-[#e0e0e0] dark:bg-[#01171E] py-6 sm:py-10'>        
      <ComponentWrapper>
          {/* trade history ===========>  */}
          <TradeHistory />
          {/* market infomation + additional detail =======> */}
          <div className='w-full grid gap-6 grid-cols-1 lg:grid-cols-2 py-10 items-start'>
            {/* Market Volumne --->  */}
            <MarketInformation />
            {/* Additional Detail -----> */}
            <AdditionalDetails />
          </div>
          {/* <ToggleTheme /> */}
        </ComponentWrapper>
      </div>
    </main>
  );
}
