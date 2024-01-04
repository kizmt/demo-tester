import React, { useEffect, useState } from "react";
import { useMarketStore } from "../../stores/arcanaStore";
import TradeHistory from "./TradeHistory";

const MarketSelect = () => {
  const { updateMarketId, setMarketData, setTradeHistory, setOrderBook } =
    useMarketStore((state) => state);
  const [marketId, setMarketId] = useState(
    "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q"
  );

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

  const fetchTradeHistory = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://alpha.arcana.markets/api/openbookv2/markets/${marketId}/trades`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching trade history:", error);
    }
  };

  const fetchOrderBook = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://alpha.arcana.markets/api/openbookv2/markets/${marketId}/orders`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching order book:", error);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMarketId(event.target.value);
  };

  useEffect(() => {
    const populateMarketDetails = async () => {
      const result = await fetchMarketData(marketId);
      const tradeHistory = await fetchTradeHistory(marketId);
      let orderBook = await fetchOrderBook(marketId);

      orderBook.market?.bidOrders.sort((a: any, b: any) => b.price - a.price);
      orderBook.market?.askOrders.sort((a: any, b: any) => a.price - b.price);

      setOrderBook(orderBook);
      setTradeHistory(tradeHistory.trades || []);
      setMarketData(result);
    };
    populateMarketDetails();
  }, [marketId]);

  return (
    <select onChange={handleChange} value={marketId}>
      {/* Options for market IDs */}
      <option value='C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q'>
        Market 1
      </option>
      <option value='G6veo6MpQXc9vbM6p3wcRYyBee2na1uuD9y6CT1ZRgjw'>
        Market 2
      </option>
    </select>
  );
};

export default MarketSelect;
