"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icons from "../../app/svg/Icons";
import Link from "next/link";
import { getToken } from "@/apis/coinGecko";
import { CoinLogosTyped, MarketData } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";

const MarketInformation = ({
  marketId = "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q",
}) => {
  // const [marketData, setMarketDetails] = useState<MarketData | any>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const marketData: MarketData | any = useMarketStore(
    (state) => state.marketData
  );

  // useEffect(() => {
  //   fetch(`https://alpha.arcana.markets/api/openbookv2/markets/${marketId}`)
  //     .then((response) => response.json())
  //     .then((data) => setMarketDetails(data))
  //     .catch((error) => console.error("Error fetching market details:", error));
  // }, [marketId]);

  useEffect(() => {
    if (marketData?.market.name === "SOL-USDC") {
      getToken("solana")
        .then((data) => {
          if (data?.market_data?.price_change_percentage_24h_in_currency?.usd) {
            setPriceChange(
              data.market_data.price_change_percentage_24h_in_currency.usd
            );
          }
        })
        .catch((error) => console.error("Error fetching token data:", error));
    }
  }, [marketData?.market.name]);

  const getPriceChangeClassName = () =>
    priceChange === null || priceChange === 0
      ? "text-foreground-400"
      : priceChange > 0
      ? "text-success-100"
      : "text-danger-100";

  // Split the market name to get base and quote tokens
  // This regex will split the string on either a slash or a hyphen
  const [baseToken, quoteToken] = marketData?.market.name
    ? marketData.market.name.split(/[-\/]/)
    : ["", ""];

  const baseTokenLink = marketData?.market?.baseMint ?? "defaultBaseMint";
  const quoteTokenLink = marketData?.market?.quoteMint ?? "defaultQuoteMint";

  // Get the logos for base and quote tokens
  const baseTokenLogo = CoinLogosTyped[baseToken] || "/tokens/SOL.png";
  const quoteTokenLogo = CoinLogosTyped[quoteToken] || "/tokens/WUSDC.png";

  const renderDetails = () => {
    if (!marketData) return null;

    const details = [
      { name: "Market ID", value: marketData.market.marketId },
      { name: "Base Mint", value: marketData.market.baseMint },
      { name: "Quote Mint", value: marketData.market.quoteMint },
      { name: "Bids", value: marketData.market.bids },
      { name: "Asks", value: marketData.market.asks },
      { name: "Event Queue", value: marketData.market.eventHeap },
    ];

    return details.map((detail, index) => (
      <div
        key={index}
        className="w-full h-[45px] border-b-[1px] borderColor flex justify-between items-center"
      >
        <p className="text-[14px] font-medium text-foreground-100 dark:opacity-100 opacity-80 dark:text-white">
          {detail.name}
        </p>
        <div className="flex items-center gap-1">
          <Link
            href={`https://solscan.io/account/${detail.value}`}
            className="underline break-all text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {detail.value}
          </Link>
          <Link
            href={`https://solscan.io/account/${detail.value}`}
            className="underline break-all text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <button>
                <Icons.copy />
              </button>
            </div>
          </Link>
        </div>
      </div>
    ));
  };

  // Calculate and format total volume
  const totalVolume = marketData
    ? (marketData.market.takerVolume + marketData.market.makerVolume) /
      Math.pow(10, marketData.market.quoteDecimals)
    : 0;
  const formattedTotalVolume = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalVolume);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[600px] lg:max-w-[650px] flex flex-col bg-foreground-900 dark:bg-[#09303c] border-[1px] borderColor rounded-[16px] ">
        <div className="w-full h-[60px] flex justify-between items-center px-4 sm:px-8">
          <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-semibold">
            Market Information
          </p>
          <p className="text-[10px] sm:text-[16px] font-semibold text-white/50">
            MCAP $59,303,563,478
          </p>
        </div>
        {/* trade ---->   */}
        <div className="w-full bg-background-800 dark:bg-[#012A36] py-4 flex justify-between items-center border-b-[1px] borderColor px-4 sm:px-8">
          <p className="text-[14px] sm:text-[16px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
            Trade
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {tradeInCoin.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-background-900 dark:bg-[#E3DB680D] px-[5px] h-[25px] flex justify-center items-center rounded-[4px]"
                >
                  {index === 2 ? (
                    <Icons.prism />
                  ) : (
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={19}
                      className="object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* stats ---> */}
        <div className="w-full bg-transparent flex flex-col gap-4 sm:gap-8 px-4 sm:px-8 py-4 border-b-[1px] borderColor">
          <div className="flex sm:gap-0 gap-3 justify-between items-start">
            {/* 24h High */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Price Midpoint
              </p>
              <p
                className={`text-[18px] sm:text-[24px] font-medium ${getPriceChangeClassName()}`}
              >
                $ {marketData?.midpoint.toFixed(4)}
              </p>
            </div>
            {/* 24h Low */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                24h Price Change
              </p>
              <p
                className={`text-[18px] sm:text-[24px] font-medium ${getPriceChangeClassName()}`}
              >
                {priceChange?.toFixed(2) ?? "0.00"}%
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                24h USD Volume
              </p>
              <p className="text-[18px] sm:text-[24px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-semibold">
                ${formattedTotalVolume}
              </p>
            </div>
          </div>
          {/* base token + quote token section */}
          <div className="w-full flex flex-wrap justify-start items-center gap-3 sm:gap-4">
            {/* Base Token */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Base token
              </p>
              <div className="flex items-center bg-background-800 dark:bg-[#012A36] py-[6px] px-[8px] rounded-[8px] gap-2">
                <Image
                  src={baseTokenLogo}
                  alt={baseToken}
                  width={32}
                  height={32}
                  className="object-fill"
                />
                <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
                  {baseToken} {/* Display only the base token name */}
                </p>
                <Link
                  href={`https://solscan.io/account/${baseTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex justify-center items-center">
                    {" "}
                    {/* Flex container with center alignment */}
                    <Icons.share ClassName="w-[20px] h-[20px]" />
                  </button>
                </Link>
              </div>
            </div>
            {/* Quote Token */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Quote token
              </p>
              <div className="flex items-center bg-background-800 dark:bg-[#012A36] py-[6px] px-[8px] rounded-[8px] gap-2">
                <Image
                  src={quoteTokenLogo}
                  alt={quoteToken}
                  width={32}
                  height={32}
                  className="object-fill"
                />
                <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
                  {quoteToken} {/* Display only the quote token name */}
                </p>
                <Link
                  href={`https://solscan.io/account/${quoteTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex justify-center items-center">
                    {" "}
                    {/* Flex container with center alignment */}
                    <Icons.share ClassName="w-[20px] h-[20px]" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* links ---->  */}
        <div className="w-full flex flex-col py-4 px-4 sm:px-8">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
};

const tradeInCoin = [
  {
    src: "/assets/openBook.svg",
    width: 100,
  },
];

export default MarketInformation;
