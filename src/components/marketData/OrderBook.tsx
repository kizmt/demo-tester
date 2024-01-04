"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Icons from "../../app/svg/Icons";
import { abbreviateAddress } from "@/utils/formatting";
import { Order, OrderBookData } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";

const getCumulativeOrders = (orders: Order[], totalSize: number): Order[] => {
  return orders.map((order) => ({
    ...order,
    sizePercent: (order.size / totalSize) * 100,
  }));
};

const OrderBook = ({
  marketId = "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q",
}) => {
  const { orderBookData }: OrderBookData | any = useMarketStore(
    (state) => state
  );
  console.log(orderBookData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevOrderBookData = useRef<OrderBookData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Store the previous order book data for comparison
    prevOrderBookData.current = orderBookData;
  }, [orderBookData]);

  // Function to determine if a flash should be applied
  const shouldFlash = (
    currentOrder: Order,
    previousOrder: Order | undefined,
    side: "bid" | "ask"
  ) => {
    if (
      !previousOrder ||
      currentOrder.sizePercent === previousOrder.sizePercent
    ) {
      return "";
    }
    return side === "bid" ? "green-flash" : "red-flash";
  };

  // Assuming bidOrders and askOrders are sorted with highest bid and lowest ask at index 0
  const bidPrice = orderBookData?.market.bidOrders[0]?.price;
  const askPrice = orderBookData?.market.askOrders[0]?.price;

  // Calculate the spread
  const spread = bidPrice && askPrice ? askPrice - bidPrice : null;

  // Calculate the percent spread
  const percentSpread = spread && askPrice ? (spread / askPrice) * 100 : null;

  if (error) return <div>Error: {error}</div>;

  const { bidOrders, askOrders } = orderBookData?.market || {
    bidOrders: [],
    askOrders: [],
  };
  const { midpoint } = orderBookData || { midpoint: null };

  const totalBidSize = bidOrders.reduce(
    (acc: any, order: any) => acc + order.size,
    0
  );
  const totalAskSize = askOrders.reduce(
    (acc: any, order: any) => acc + order.size,
    0
  );

  const bidOrdersWithPercent = getCumulativeOrders(bidOrders, totalBidSize);
  const askOrdersWithPercent = getCumulativeOrders(askOrders, totalAskSize);

  const rowsData = bidOrdersWithPercent.map((bidOrder, index) => {
    const askOrder = askOrdersWithPercent[index] || {
      trader: "",
      price: 0,
      size: 0,
      sizePercent: 0,
    };
    return { bid: bidOrder, ask: askOrder };
  });

  // Filter rowsData based on search term
  const filteredRowsData = rowsData.filter((row) => {
    const bidMatch = row.bid.trader
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const askMatch = row.ask.trader
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return bidMatch || askMatch;
  });

  return (
    <div className=' h-full flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-foreground-900 cardShadowBor rounded-[16px] dark:bg-[#152531]'>
      <div className='w-full grid grid-cols-2 md:grid-cols-[2fr,1fr,1.5fr] gap-y-4'>
        <div className='flex justify-start items-center gap-1 order-1'>
          <p className='text-[20px] text-foreground-100 opacity-80'>
            Orderbook
          </p>
          <p className='text-[12px] text-green'>• Live</p>
        </div>
        <div className='w-full flex items-center order-2'>
          <div className='flex justify-center bg-foreground-800 dark:bg-[#012A36] rounded-[12px] py-[6px] px-[12px] items-center gap-1'>
            <Icons.arrowUp />
            <p className='text-[14px] text-green font-medium'>
              {midpoint?.toFixed(4)}
            </p>
          </div>
        </div>
        <div className='w-full flex justify-end order-3 col-span-2 md:col-span-1'>
          <div className='flex relative justify-center items-center h-[40px] min-w-[229px]'>
            <input
              placeholder='Search address, .sol domain...'
              type='text'
              className='w-full h-full rounded-[12px] placeholder:opacity-30 text-foreground-100 opacity-90 orderBookSearchBg border-none focus:outline-none pl-7 pr-2'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className='absolute left-[10px]'>
              <Icons.search />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full overflow-auto hideScrollBar'>
        {/* table ==============>  */}
        {/* header --> */}
        <div className='w-full min-w-[750px] h-[40px] grid grid-cols-[1fr,4fr,1fr] border-b-[1px] borderColor'>
          {/* owner */}
          <p className='flex  justify-start w-full text-[14px] font-medium text-foreground-100/50'>
            Owner
          </p>
          <div className='w-full grid grid-cols-[1fr,3.5fr,1fr] sm:grid-cols-[1fr,2fr,1fr]'>
            {/* size ---> */}
            <p className='flex justify-end w-full text-[14px] font-medium text-foreground-100/50'>
              Size
            </p>
            {/* price ---> */}
            <p className='flex justify-center w-full text-[14px] font-medium text-foreground-100/50'>
              Price
            </p>
            {/* size ---> */}
            <p className='flex justify-start w-full text-[14px] font-medium text-foreground-100/50'>
              Size
            </p>
          </div>
          {/* owner ---> */}
          <p className='flex justify-end w-full text-[14px] font-medium text-foreground-100/50'>
            Owner
          </p>
        </div>
        {/* rows */}
        <div className='w-full flex min-w-[750px] flex-col gap-[2px] max-h-[250px] sm:max-h-[350px] md:max-h-[480px] overflow-auto hideScrollBar'>
          {filteredRowsData.map((item, index) => (
            <div
              key={index}
              className='w-full grid grid-cols-[1fr,4fr,1fr] min-h-[35px] justify-center items-center relative'
            >
              {/* Size percent bars */}
              <div
                style={{
                  width: `${item.bid.sizePercent}%`,
                  backgroundColor: "#4EDF87",
                  height: "100%",
                  position: "absolute",
                  right: "50%",
                }}
                className='size-percent-bar'
              ></div>
              <div
                style={{
                  width: `${item.ask.sizePercent}%`,
                  backgroundColor: "#F9564F",
                  height: "100%",
                  position: "absolute",
                  left: "50%",
                }}
                className='size-percent-bar'
              ></div>
              {/* bid owner */}
              <p className='text-[14px] items-center w-full flex justify-start text-foreground-100 opacity-80 font-medium underline'>
                {abbreviateAddress(item.bid.trader)}
              </p>
              <div className='w-full h-full relative grid grid-cols-[1fr,3.5fr,1fr] sm:grid-cols-[1fr,2fr,1fr] z-20'>
                {/* bid size */}
                <p className='text-[14px] w-full items-center flex justify-end text-foreground-100 opacity-80 font-medium'>
                  {item.bid.size > 0 ? item.bid.size : ""}
                </p>
                <div className='w-full grid grid-cols-2'>
                  {/* bid price */}
                  <p className='text-[14px] w-full flex justify-end items-center pr-1 text-foreground-100 font-medium'>
                    {item.bid.price > 0 ? item.bid.price : ""}
                  </p>
                  {/* ask price */}
                  <p className='text-[14px] w-full flex items-center justify-start pl-1 text-foreground-100 font-medium'>
                    {item.ask.price > 0 ? item.ask.price : ""}
                  </p>
                </div>
                {/* ask size */}
                <p className='text-[14px] w-full flex justify-start items-center pl-1 text-foreground-100 opacity-80 font-medium'>
                  {item.ask.size > 0 ? item.ask.size : ""}
                </p>
              </div>
              {/* ask owner */}
              <p className='text-[14px] w-full flex justify-end items-center text-foreground-100 opacity-80 font-medium underline'>
                {abbreviateAddress(item.ask.trader)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Spread row fixed at the bottom */}
      <div className='w-full h-[40px] mt-auto bg-background-800 dark:bg-[#192431] rounded-[16px] flex justify-between items-center'>
        <p className='text-foreground-100 text-[14px] font-medium pl-4'>
          Spread
        </p>
        <p className='text-foreground-100 text-[14px] font-medium'>
          {percentSpread !== null ? percentSpread.toFixed(2) : "-"}%
        </p>
        <button className='flex justify-center h-full bg-background-900 dark:bg-[#012A36] px-2 rounded-[12px] items-center gap-1'>
          <p className='text-foreground-100 text-[14px] font-medium'>
            {spread !== null ? spread.toFixed(4) : "-"}
          </p>
          <Icons.arrowDown2 />
        </button>
      </div>
    </div>
  );
};

export default OrderBook;
