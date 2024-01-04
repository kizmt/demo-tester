'use client'

import React, { useState } from 'react';
import * as Icons from '../../app/svg/Icons';
import Image from 'next/image';

const BuyAndSell = () => {
  const [activeBtn, setActiveBtn] = useState('Buy');

  return (
    <div className='w-full max-w-[400px] flex flex-col bg-background-900 dark:bg-background-100 cardShadowBor rounded-[16px] pt-2 sm:pt-4'>
      {/* button -->  */}
      <div className='w-full h-[40px] sm:h-[45px] grid grid-cols-2 border-b-[1px] borderColor px-5'>
        <button
          onClick={() => setActiveBtn('Buy')}
          className={`w-full flex justify-center ${
            activeBtn === 'Buy'
              ? 'border-b-[2px] dark:border-success-100 border-success-300 dark:text-success-100 text-success-300 opacity-100'
              : 'border-b-[2px] border-transparent text-foreground-100 opacity-30'
          }  radius items-center`}
        >
          <p className='text-[16px] font-medium'>Buy</p>
        </button>
        <button
          onClick={() => setActiveBtn('Sell')}
          className={`w-full flex justify-center ${
            activeBtn === 'Sell'
              ? 'border-b-[2px] dark:border-success-100 border-success-300 dark:text-success-100 text-success-300 opacity-100'
              : 'border-b-[2px] border-transparent text-foreground-100 opacity-30'
          }  radius items-center`}
        >
          <p className='text-[16px] font-medium'>Sell</p>
        </button>
      </div>
      {/* wallet ---->  */}
      <div className='w-full flex justify-between bg-foreground-800 dark:bg-[#012630] py-4 items-center px-5'>
        <div className='flex justify-center items-center gap-1'>
          <Icons.wallet />
          <p className='text-[10px] text-foreground-100 font-medium'>? USDC</p>
        </div>
        {/* half or max -->  */}
        <div className='flex justify-center items-center gap-2'>
          <button className='dark:text-foreground-100 text-foreground-300 text-[12px] font-medium halfBg rounded-[12px] px-[12px] py-[2px]'>
            HALF
          </button>
          <button className='dark:text-foreground-100 text-foreground-300 text-[12px] font-medium halfBg rounded-[12px] px-[12px] py-[2px]'>
            MAX
          </button>
        </div>
      </div>
      {/* you are paying input ------>  */}
      <div className='w-full flex justify-between items-center border-b-[1px] borderColor py-3 sm:py-4 px-3 sm:px-5'>
        {/* input --> */}
        <div className='flex flex-col gap-2'>
          <p className='text-[12px] font-medium text-foreground-100  opacity-75'>
            Youre paying
          </p>
          <input
            type='number'
            placeholder='0.0000'
            className='bg-transparent w-[150px] border-none px-1 text-[20px] sm:text-[28px] font-semibold placeholder:opacity-30 focus:outline-none opacity-80 text-foreground-100'
          />
        </div>
        {/* coin selection --->  */}
        <button className='flex justify-center items-center gap-2'>
          <Image
            src='/tokens/WUSDC.png'
            alt=''
            width={20}
            height={20}
            className='object-cover'
          />
          <p className='text-foreground-100 text-[16px] sm:text-[20px] font-medium'>
            USDC
          </p>
          <Icons.arrowDown />
        </button>
      </div>
      {/* to recieve  ------->  */}
      <div className='w-full flex justify-between items-center border-b-[1px] borderColor py-3 sm:py-4 px-3 sm:px-5'>
        {/* input --> */}
        <div className='flex flex-col gap-2'>
          <p className='text-[12px] font-medium text-foreground-100 opacity-75'>
            Youre paying
          </p>
          <input
            type='number'
            placeholder='0.0000'
            className='bg-transparent w-[150px] border-none px-1 text-[20px] sm:text-[28px] font-semibold placeholder:opacity-30 focus:outline-none text-foreground-100 opacity-80'
          />
        </div>
        {/* coin selection --->  */}
        <div className='flex flex-col gap-2'>
          <p className='text-[12px] font-medium dark:text-success-100 text-success-300 text-end'>
            • Live
          </p>
          <button className='flex justify-center items-center gap-2'>
            <Image
              src='/tokens/PYTH.png'
              alt=''
              width={20}
              height={20}
              className='object-cover'
            />
            <p className='text-foreground-100 text-[16px] sm:text-[20px] font-medium'>
              PYTH
            </p>
            <Icons.arrowDown />
          </button>
        </div>
      </div>
      {/* connect wallet ----> */}
      <div className='w-full px-5 py-4'>
        <button className='w-full py-[8px] sm:py-[10px] border-[1px] dark:border-primary-100 border-primary-900 hover:opacity-70 active:translate-y-[2px] text-[14px] sm:text-[16px] font-medium dark:text-primary-100 text-primary-300 tracking-wide px-[16px] rounded-[12px] bg-foreground-800 dark:bg-[#012630]'>
          Connect Wallet
        </button>
      </div>
      {/* powerd by ---->  */}
      <div className='w-full py-3 sm:py-4 rounded-b-[16px] text-[12px] sm:text-[14px] dark:text-foreground-100 text-foreground-300 font-medium bg-foreground-800 dark:bg-[#012630] flex justify-center items-center gap-1'>
        <p>Powered by</p>
        <Icons.powerdBy />
        <p>Powered by</p>
      </div>
    </div>
  );
};

export default BuyAndSell;
