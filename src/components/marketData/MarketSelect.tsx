// MarketSelect.tsx
'use client'
import React from 'react';
import { useMarketStore } from '../../stores/arcanaStore';

const MarketSelect = () => {
  const updateMarketId = useMarketStore((state) => state.updateMarketId);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateMarketId(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {/* Options for market IDs */}
      <option value="C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q">Market 1</option>
      <option value="G6veo6MpQXc9vbM6p3wcRYyBee2na1uuD9y6CT1ZRgjw">Market 2</option>
      {/* Add more options here */}
    </select>
  );
};

export default MarketSelect;
