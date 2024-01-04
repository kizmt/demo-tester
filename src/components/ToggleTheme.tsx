'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { LuSun } from 'react-icons/lu';
import { IoMoonSharp } from 'react-icons/io5';

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleOnClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={handleOnClick} className='px-2 py-1 rounded-lg'>
      {theme === 'dark' ? (
        <LuSun className='text-background-900 dark:text-white text-[22px] hover:opacity-80' />
      ) : (
        <IoMoonSharp className='text-background-900 dark:text-white text-[22px] hover:opacity-80' />
      )}
    </button>
  );
};

export default ToggleTheme;