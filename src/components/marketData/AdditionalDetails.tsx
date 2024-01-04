"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "../../app/svg/Icons";
import { CoinLogosTyped } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";
import { MarketData } from "@/utils/types";

const AdditionalDetails = () => {
  const { marketData }: MarketData | any = useMarketStore();

  // Split the market name to get base and quote tokens
  // This regex will split the string on either a slash or a hyphen
  const [baseToken, quoteToken] = marketData?.market?.name
    ? marketData.market.name.split(/[-\/]/)
    : ["", ""];

  // Get the logos for base and quote tokens
  const baseTokenLogo = CoinLogosTyped[baseToken] || "/tokens/SOL.png";
  const quoteTokenLogo = CoinLogosTyped[quoteToken] || "/tokens/WUSDC.png";

  const renderDetails = () => {
    if (!marketData?.market) return null;

    const details = [
      { name: "Base Decimals", value: marketData.market.baseDecimals },
      { name: "Quote Decimals", value: marketData.market.quoteDecimals },
      { name: "Quote Lot Size", value: marketData.market.quoteLotSize },
      { name: "Base Lot Size", value: marketData.market.baseLotSize },
    ];

    return details.map((detail, index) => (
      <div
        key={index}
        className='w-full h-[45px] border-b-[1px] borderColor flex justify-between items-center'
      >
        <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
          {detail.name}
        </p>
        <p className='text-[16px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
          {detail.value}
        </p>
      </div>
    ));
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full max-w-[600px] lg:max-w-[650px] h-fit flex flex-col bg-background-900 dark:bg-[#09303c] border-[1px] borderColor rounded-[16px]'>
        {/* Header */}
        <div className='w-full h-[60px] flex justify-start border-b-[1px] borderColor items-center px-4 sm:px-8'>
          <p className='text-[16px] sm:text-[20px] text-white dark:opacity-100 opacity-80 font-semibold'>
            Additional details
          </p>
        </div>

        {/* Base and Quote Deposits */}
        <div className='flex flex-col items-start gap-4 px-4 sm:px-8 py-4 border-b-[1px] borderColor'>
          {/* Base deposits */}
          <div className='flex flex-col gap-2'>
            <p className='text-[12px] sm:text-[14px] text-white/50 font-medium'>
              Base deposits
            </p>
            <div className='flex gap-2 justify-center items-center'>
              <Image
                src={baseTokenLogo}
                alt='Base'
                width={32}
                height={32}
                className='object-fill'
              />
              <p className='text-foreground-100 dark:opacity-100 opacity-80 dark:text-white text-[18px] sm:text-[24px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.baseDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.baseDecimals ?? 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Quote deposits */}
          <div className='flex flex-col gap-2'>
            <p className='text-[14px] text-white/50 font-medium'>
              Quote deposits
            </p>
            <div className='flex gap-2 justify-center items-center'>
              <Image
                src={quoteTokenLogo}
                alt='Quote'
                width={32}
                height={32}
                className='object-fill'
              />
              <p className='text-foreground-100 dark:opacity-100 opacity-80 dark:text-white text-[18px] sm:text-[24px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.quoteDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.quoteDecimals ?? 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic market details rendering */}
        <div className='w-full flex flex-col px-4 sm:px-8'>
          {renderDetails()}

          {/* Permalink section */}
          <div className='w-full h-[45px] flex justify-between items-center'>
            <p className='text-[14px] min-w-[120px] font-medium text-foreground-100 dark:opacity-100 opacity-80 dark:text-white'>
              Permalink
            </p>
            <div className='flex justify-center items-center gap-1'>
              <Link href='https://arcana.markets/perma/1293uasco9u102h119204hn'>
                <div className='underline break-all text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                  https://arcana.markets/perma/1293uasco9u102h119204hn
                </div>
              </Link>
              <button>
                <Icons.copy />
              </button>
            </div>
          </div>

          {/* Tools section */}
          <div className='w-full pt-3 pb-4 flex justify-between items-center'>
            <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
              Tools
            </p>
            <div className='flex flex-wrap justify-end sm:justify-center items-center gap-2'>
              {/* Crank Market + List new Market */}
              <div className='flex justify-center items-center gap-3'>
                <div className='flex justify-center items-center bg-background-800 dark:bg-[#012A36] gap-1 py-2 px-3 rounded-[12px]'>
                  <Icons.crank />
                  <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                    Crank Market
                  </p>
                </div>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <div className='flex justify-center items-center bg-background-800 dark:bg-[#012A36] gap-1 py-2 px-3 rounded-[12px]'>
                  <Icons.list />
                  <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                    Create Market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
