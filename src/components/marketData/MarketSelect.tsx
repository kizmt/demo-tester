import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronDown, LuCheckCircle } from "react-icons/lu";
import Image from "next/image";
import { CoinLogosTyped, FullMarketData } from "@/utils/types";
import { useMarketStore } from "@/stores/arcanaStore";

const MarketSelect = () => {
  const { setMarketData, setTradeHistory, setOrderBook } = useMarketStore(
    (state) => state
  );
  const [marketId, setMarketId] = useState(
    "C3YPL3kYCSYKsmHcHrPWx1632GUXGqi2yMXJbfeCc57q"
  );
  const [markets, setMarkets] = useState([]); // Array of market data
  const [selected, setSelected] = useState(null); // Selected market
  const { marketData }: FullMarketData | any = useMarketStore();

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

  useEffect(() => {
    fetch("https://alpha.arcana.markets/api/openbookv2/markets")
      .then((response) => response.json())
      .then((data) => {
        setMarkets(data);

        setSelected(
          data.find((market: any) => market.market.marketId === marketId)
        ); // Initialize with the first market
      })
      .catch((error) => console.error("Error fetching markets:", error));
  }, []);

  const handleChange = (market: React.SetStateAction<null | any>) => {
    setMarketId(market.market.marketId);
    setSelected(market);
    // Other logic to handle market change
  };

  // const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setMarketId(event.target.value);
  // };

  useEffect(() => {
    const populateMarketDetails = async () => {
      const result = await fetchMarketData(marketId);
      const tradeHistory = await fetchTradeHistory(marketId);
      let orderBook = await fetchOrderBook(marketId);

      orderBook?.market?.bidOrders.sort((a: any, b: any) => b.price - a.price);
      orderBook?.market?.askOrders.sort((a: any, b: any) => a.price - b.price);
      console.log(result);
      setOrderBook(orderBook);
      setTradeHistory(tradeHistory?.trades || []);
      setMarketData(result);
    };
    populateMarketDetails();
  }, [marketId]);

  const renderMarketOption = (marketData: any) => {
    const [baseToken, quoteToken] = marketData?.market.name.split(/[-/]/);
    const baseTokenLogo = CoinLogosTyped[baseToken] || "/tokens/SOL.png";
    const quoteTokenLogo = CoinLogosTyped[quoteToken] || "/tokens/WUSDC.png";

    return (
      <div className='flex items-center'>
        <Image
          src={baseTokenLogo}
          alt={baseToken}
          width={18}
          height={18}
          className='object-fill z-10'
        />
        <Image
          src={quoteTokenLogo}
          alt={quoteToken}
          width={18}
          height={18}
          className='object-fill -ml-2 z-0'
        />
        <span className='ml-2'>{marketData.market.name}</span>
      </div>
    );
  };

  return (
    <div className='w-56'>
      <Listbox value={selected} onChange={handleChange}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-background-100 cardShadowBor py-2 pl-3 pr-10 text-left'>
            {selected ? renderMarketOption(selected) : "Select Market"}
            <LuChevronDown className='absolute inset-y-3 right-3 flex' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-100 cardShadowBor py-1 text-left shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {markets.map((market, index) => (
                <Listbox.Option
                  key={index}
                  value={market}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-primary-100 text-white" : "text-white"
                    }`
                  }
                >
                  {() => renderMarketOption(market)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MarketSelect;
