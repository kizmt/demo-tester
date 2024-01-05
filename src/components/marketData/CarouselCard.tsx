import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuClipboardCopy } from 'react-icons/lu';
import Tooltip from '../Tooltip';
import { getToken } from '@/apis/coinGecko';
import { copyToClipboard } from '../../utils';
import { CarouselCardProps, CoinLogosTyped } from '@/utils/types';

const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  useEffect(() => {
    if (item.market.name === 'SOL-USDC') {
      getToken('solana')
        .then(data => {
          if (data?.market_data?.price_change_percentage_24h_in_currency?.usd) {
            setPriceChange(data.market_data.price_change_percentage_24h_in_currency.usd);
          }
        })
        .catch(error => console.error('Error fetching token data:', error));
    }
  }, [item.market.name]);

  const totalVolume = (item.market.takerVolume + item.market.makerVolume) / Math.pow(10, item.market.quoteDecimals);
  const formattedTotalVolume = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalVolume);
  
  const tooltipText = `Taker Volume: ${(item.market.takerVolume / Math.pow(10, item.market.quoteDecimals)).toFixed(2)}, Maker Volume: ${(item.market.makerVolume / Math.pow(10, item.market.quoteDecimals)).toFixed(2)}`;

  const [baseToken, quoteToken] = item.market.name.split(/[-/]/);
  const baseTokenLogo = baseToken ? CoinLogosTyped[baseToken] || "/tokens/SOL.png" : "/tokens/WUSDC.png";
  const quoteTokenLogo = quoteToken ? CoinLogosTyped[quoteToken] || "/tokens/WUSDC.png" : "/tokens/SOL.png";

  const handleCopyClick = () => {
    copyToClipboard(item.market.marketId);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000);
  };

  const getPriceChangeClassName = () => priceChange === null || priceChange === 0 ? 'text-foreground-400' : priceChange > 0 ? 'text-success-100' : 'text-danger-100';

  return (
    <div className='w-[250px] sm:w-[330px] flex justify-between items-start ml-3 bg-background-900 dark:bg-background-100 cardShadowBor px-4 py-2 sm:py-3 rounded-[16px]'>
      {/* Left Section */}
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center items-center'>
          {baseTokenLogo && <Image src={baseTokenLogo} alt={baseToken} width={24} height={24} className='object-fill z-10' />}
          {baseTokenLogo && <Image src={quoteTokenLogo} alt={quoteToken} width={24} height={24} className='object-fill -ml-3 z-0' />}
          <p className='text-[12px] sm:text-[14px] text-foreground-100 font-medium ml-2'>{item.market?.name}</p>
        </div>
        <p className={`text-[12px] sm:text-[20px] font-medium ${getPriceChangeClassName()}`}>$ {item.midpoint.toFixed(2)}</p>
        <Tooltip content={tooltipText} placement="bottom">
          <p className='text-[12px] sm:text-[12px] text-foreground-100 font-medium opacity-25'>Vol ${formattedTotalVolume}</p>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className='flex items-end flex-col gap-3'>
        <p className='text-[10px] sm:text-[12px] text-foreground-100 font-medium py-[2px] px-[12px] timeLine rounded-[12px]'>24H</p>
        <p className={`text-[12px] sm:text-[14px] font-medium ${getPriceChangeClassName()}`}>{priceChange?.toFixed(2) ?? '0.00'}%</p>
        <div className='flex items-center justify-end'>
          <Tooltip content={showCopiedTooltip ? 'Copied' : 'Copy Market ID'}>
            <button onClick={handleCopyClick} className='flex text-[12px] sm:text-[12px] text-foreground-100 font-medium'>
              {item.market.marketId.substring(0, 6)}...{item.market.marketId.slice(-4)}
              <LuClipboardCopy className={`ml-2 h-4 w-4 ${showCopiedTooltip ? 'animate-copied' : ''}`} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
