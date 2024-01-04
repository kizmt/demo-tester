// // MarketSelect.tsx
// "use client";
// import React from "react";
// import { useMarketStore } from "../../stores/arcanaStore";

// const MarketSelect = () => {
//   const updateMarketId = useMarketStore((state) => state.updateMarketId);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     updateMarketId(event.target.value);
//   };

//   return (
//     <select onChange={handleChange}>
//       {/* Options for market IDs */}
//       <option value="C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q">
//         Market 1
//       </option>
//       <option value="G6veo6MpQXc9vbM6p3wcRYyBee2na1uuD9y6CT1ZRgjw">
//         Market 2
//       </option>

//     </select>
//   );
// };

// export default MarketSelect;

import React, { useEffect, useState } from "react";
import { useMarketStore } from "../../stores/arcanaStore";

const MarketSelect = () => {
  const { updateMarketId, setMarketData } = useMarketStore((state) => state);
  const [marketId, setMarketId] = useState(
    "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q"
  );

  // useEffect(() => {
  //   fetchMarketData();
  // }, [marketId]);

  const fetchMarketData = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://alpha.arcana.markets/api/openbookv2/markets/${marketId}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching market details:", error);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMarketId(event.target.value);
  };

  useEffect(() => {
    const populateMarketDetails = async () => {
      const result = await fetchMarketData(marketId);
      setMarketData(result);
    };
    populateMarketDetails();
  }, [marketId]);

  return (
    <select onChange={handleChange} value={marketId}>
      {/* Options for market IDs */}
      <option value="C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q">
        Market 1
      </option>
      <option value="G6veo6MpQXc9vbM6p3wcRYyBee2na1uuD9y6CT1ZRgjw">
        Market 2
      </option>
    </select>
  );
};

export default MarketSelect;
