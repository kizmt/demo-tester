'use client';

import React, { useState } from 'react';
import ComponentWrapper from './ComponentWrapper';
import * as Icons from '../app/svg/Icons';
import Link from 'next/link';
import { Spin as Hamburger } from 'hamburger-react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
//  import ToggleTheme from './ToggleTheme';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <ComponentWrapper>
      <div className='w-full h-[60px] sm:h-[80px] flex justify-between items-center'>
        {/* left portion ---------------->  */}
        <div className='flex gap-24 justify-center items-center'>
          {/* logo --> */}
          <Link href='/'>
            <Icons.logo ClassName='w-[120px] sm:w-[140px] h-[100px] sm:h-[140px]' />
          </Link>
          {/* links --> */}
          <div className='hidden md:flex justify-center items-center gap-10'>
            {naviLinks.map((item, index) => {
              return (
                <Link
                  className='text-[16px] font-medium dark:text-foreground-100 text-foreground-900 relative after:absolute after:w-0 after:bottom-0 after:left-0 after:h-[2px] after:dark:bg-foreground-100 after:bg-foreground-900 hover:after:w-full after:duration-200'
                  key={index}
                  href={item.path}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        {/* right Portion --------------> */}
        <div className='flex gap-10 justify-center items-center'>
          {/* theme toggle ------->  */}
          {/* <ToggleTheme /> */}
          {/* button -----> */}
          <button className='px-[16px] md:block hidden py-[10px] text-[16px] text-foreground-100 from-gray-900 font-medium dark:bg-primary-100 bg-primary-900 hover:opacity-80 active:translate-y-[2px] rounded-[12px]'>
            Connect Wallet
          </button>

          {/* hamburger and drawer for small screen ==========>  */}
          <div className='w-full md:hidden flex'>
            <Hamburger
              color='white'
              rounded
              size={26}
              toggled={isOpen}
              toggle={setIsOpen}
            />
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction='right'
              className='drawer'
            >
              <div className='w-full flex flex-col p-8'>
                {/* top bar --->  */}
                <div className='w-full flex justify-end'>
                  <button onClick={toggleDrawer}>
                    <Icons.crossIcon
                      fill='#ffffff'
                      ClassName='w-[32px] h-[32px] cursor-pointer'
                    />
                  </button>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-6'>
                  {/* links ---->  */}
                  <div className='flex flex-col justify-center items-center gap-6 mt-16'>
                    {naviLinks.map((item, index) => {
                      return (
                        <Link
                          className='text-[18px] tracking-wider font-medium dark:text-foreground-100 text-foreground-900 relative after:absolute after:w-0 after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:dark:bg-foreground-100 hover:after:w-full after:duration-200'
                          key={index}
                          href={item.path}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

const naviLinks = [
  {
    name: 'Data',
    path: '#',
  },
  {
    name: 'Vaults',
    path: '#',
  },
  {
  name: 'Tools',
  path: '#',
  },
];

export default TopBar;
