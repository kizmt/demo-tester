"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "../../app/svg/Icons";
import { abbreviateAddress } from "@/utils/formatting";
import { OpenBookTradeEvent } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";

// Helper function to format timestamp
const formatTimestamp = (timestamp: number): string => {
  return dayjs.unix(timestamp).format("HH:mm:ss");
};
const dayjs = require("dayjs");
const timestamp = 1703879491;
const date = dayjs.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
console.log(date);

const TradeHistory = () => {
  const { tradeHistory } = useMarketStore((state) => state);

  const renderTradeRow = (item: OpenBookTradeEvent | null, index: number) => {
    // Determine row background based on row index
    const rowBackground =
      index % 2 === 0
        ? "bg-background-800 dark:bg-[#012a36]"
        : "bg-background-900 dark:bg-[#09303c]";

    return (
      <div
        key={index}
        className={`w-full ${rowBackground} ${
          index + 1 === tradeHistory.length || !item
            ? "rounded-b-[1px]"
            : "border-b-[1px] borderColor"
        } h-[40px] grid grid-cols-[1fr,1.5fr,1.5fr,1.5fr,1.5fr,1.5fr] px-4 sm:px-8 justify-center items-center`}
      >
        {item ? (
          <>
            <div className='w-full flex justify-start items-center'>
              <button
                className={`text-[12px] capitalize font-medium text-foreground-100 dark:opacity-80 opacity-100 py-[2px] px-[12px] ${
                  item.takerSide === 0 ? "bg-green" : "bg-red"
                } rounded-[12px]`}
              >
                {item.takerSide === 0 ? "buy" : "sell"}
              </button>
            </div>
            <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'>
              {formatTimestamp(item.timeStamp)}
            </p>
            <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'>
              {item.priceDouble}
            </p>
            <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'>
              {item.quantityDouble}
            </p>
            {/* Taker cell with better icon spacing */}
            <div className='w-full flex justify-start items-center'>
              <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium mr-2'>
                {abbreviateAddress(item.takerOwner)}
              </p>
              <a
                href={`https://solscan.io/account/${item.takerOwner}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='p-1'>
                  <Icons.share />
                </button>
              </a>
            </div>

            {/* Maker cell with better icon spacing */}
            <div className='w-full flex justify-end items-center'>
              <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium mr-2'>
                {abbreviateAddress(item.makerOwner)}
              </p>
              <a
                href={`https://solscan.io/account/${item.makerOwner}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='p-1'>
                  <Icons.share />
                </button>
              </a>
            </div>
          </>
        ) : (
          <React.Fragment>
            {/* Render empty cells for an empty row */}
            <div className='w-full flex justify-start items-center'></div>
            <div className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'></div>
            <div className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'></div>
            <div className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 font-medium w-full text-left'></div>
            <div className='w-full flex text-foreground-100 dark:opacity-100 opacity-80 gap-1 justify-start items-center'></div>
            <div className='w-full flex text-foreground-100 dark:opacity-100 opacity-80 gap-1 justify-end items-center'></div>
          </React.Fragment>
        )}
      </div>
    );
  };

  const historyTableHeader = [
    "trade",
    "Timestamp",
    "Price",
    "Size",
    "Taker",
    "Maker",
  ];

  return (
    <div className='w-full flex flex-col gap-4 items-start'>
      <div className='flex justify-center items-center gap-3 sm:px-8'>
        <p className='text-[20px] text-foreground-900 dark:text-foreground-100 dark:opacity-80 opacity-100 font-medium'>
          Trade history {tradeHistory.length}
        </p>
        <p className='text-green text-[12px] font-medium'>• Live</p>
      </div>
      <div className='w-full flex flex-col overflow-auto hideScrollBar bg-background-900 dark:bg-[#09303c] border-[1px] borderColor rounded-[16px]'>
        <div className='w-full min-w-[980px] h-[40px] grid grid-cols-[1fr,1.5fr,1.5fr,1.5fr,1.5fr,1.5fr] px-4 sm:px-8 items-center'>
          {historyTableHeader.map((item, index) => (
            <p
              key={index}
              className={`flex ${
                item === "Maker" ? "justify-end" : "justify-start"
              } text-[14px] font-medium capitalize text-foreground-100 opacity-70 items-center w-full`}
            >
              {item}
            </p>
          ))}
        </div>
        <div className='w-full min-w-[980px] max-h-[200px] sm:max-h-[250px] overflow-auto hideScrollBar'>
          {tradeHistory.map((item: any, index: any) =>
            renderTradeRow(item, index)
          )}
          {Array.from(
            { length: Math.max(0, 6 - tradeHistory.length) },
            (_, index) => renderTradeRow(null, tradeHistory.length + index)
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;
