import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LuClipboardCopy } from "react-icons/lu";
import Tooltip from "../Tooltip";
import { getToken } from "@/apis/coinGecko";
import { copyToClipboard } from "../../utils";
import { CarouselCardProps, CoinLogosTyped } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";
import { MarketData } from "@/utils/types";

const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const marketData: MarketData | any = useMarketStore(
    (state) => state.marketData
  );

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

  const totalVolume =
    (marketData?.market.takerVolume + marketData?.market.makerVolume) /
    Math.pow(10, marketData?.market.quoteDecimals);
  const formattedTotalVolume = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalVolume);

  const tooltipText = `Taker Volume: ${(
    marketData?.market.takerVolume /
    Math.pow(10, marketData?.market.quoteDecimals)
  ).toFixed(2)}, Maker Volume: ${(
    marketData?.market.makerVolume /
    Math.pow(10, marketData?.market.quoteDecimals)
  ).toFixed(2)}`;

  const [coin1, coin2] = (marketData?.market.name || "").split(/[-/]/);
  const coinLogo1URL = coin1 ? CoinLogosTyped[coin1] || "" : "";
  const coinLogo2URL = coin2 ? CoinLogosTyped[coin2] || "" : "";

  const handleCopyClick = () => {
    copyToClipboard(marketData?.market.marketId);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000);
  };

  const getPriceChangeClassName = () =>
    priceChange === null || priceChange === 0
      ? "text-foreground-400"
      : priceChange > 0
      ? "text-success-100"
      : "text-danger-100";

  return (
    <div className='w-[250px] sm:w-[330px] flex justify-between items-start ml-3 bg-background-900 dark:bg-background-100 cardShadowBor px-4 py-2 sm:py-3 rounded-[16px]'>
      {/* Left Section */}
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center items-center'>
          {coinLogo1URL && (
            <Image
              src={coinLogo1URL}
              alt={coin1}
              width={24}
              height={24}
              className='object-fill z-10'
            />
          )}
          {coinLogo2URL && (
            <Image
              src={coinLogo2URL}
              alt={coin2}
              width={24}
              height={24}
              className='object-fill -ml-3 z-0'
            />
          )}
          <p className='text-[12px] sm:text-[14px] text-foreground-100 font-medium ml-2'>
            {marketData?.market.name}
          </p>
        </div>
        <p
          className={`text-[12px] sm:text-[20px] font-medium ${getPriceChangeClassName()}`}
        >
          $ {item.midpoint.toFixed(2)}
        </p>
        <Tooltip content={tooltipText} placement='bottom'>
          <p className='text-[12px] sm:text-[12px] text-foreground-100 font-medium opacity-25'>
            Vol ${formattedTotalVolume}
          </p>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className='flex items-end flex-col gap-3'>
        <p className='text-[10px] sm:text-[12px] text-foreground-100 font-medium py-[2px] px-[12px] timeLine rounded-[12px]'>
          24H
        </p>
        <p
          className={`text-[12px] sm:text-[14px] font-medium ${getPriceChangeClassName()}`}
        >
          {priceChange?.toFixed(2) ?? "0.00"}%
        </p>
        <div className='flex items-center justify-end'>
          <Tooltip content={showCopiedTooltip ? "Copied" : "Copy Market ID"}>
            <button
              onClick={handleCopyClick}
              className='flex text-[12px] sm:text-[12px] text-foreground-100 font-medium'
            >
              {marketData?.market.marketId.substring(0, 6)}...
              {marketData?.market.marketId.slice(-4)}
              <LuClipboardCopy
                className={`ml-2 h-4 w-4 ${
                  showCopiedTooltip ? "animate-copied" : ""
                }`}
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
