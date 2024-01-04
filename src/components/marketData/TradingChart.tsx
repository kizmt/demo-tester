'use client'

// TradingViewWidget.tsx
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
  // Specify the type of the ref as HTMLDivElement
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "840",
      height: "450",
      symbol: "COINBASE:SOLUSD",
      interval: "1H",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "rgb(1,39,50)",
      hide_top_toolbar: true,
      support_host: "https://www.tradingview.com"
    });

    // Check if container.current is not null before appending the script
    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="w-full cardShadowBor rounded-[16px]" 
      ref={container} 
      style={{ 
        overflow: 'hidden', 
      }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default memo(TradingViewWidget);
