"use client"

import React, { useState, useEffect } from 'react';
import Card from './CarouselCard';
import Marquee from 'react-fast-marquee';

const CarouselSlider = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://alpha.arcana.markets/api/openbookv2/markets')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className='py-4 sm:py-6'>
      <Marquee
        gradient={false}
        pauseOnHover={true}
        style={{ width: '100%', height: '100%' }}
        speed={50}
      >
        {items.map((item, index) => {
          return <Card key={index} item={item} />;
        })}
      </Marquee>
    </div>
  );
};

export default CarouselSlider;
