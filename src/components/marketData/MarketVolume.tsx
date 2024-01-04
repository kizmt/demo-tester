'use client'

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    x: '100',
    y: '30',
  },
  {
    x: '100',
    y: '20',
  },
  {
    x: '100',
    y: '20',
  },
  {
    x: '100',
    y: '15',
  },
  {
    x: '100',
    y: '22',
  },
  {
    x: '100',
    y: '33',
  },
  {
    x: '100',
    y: '44',
  },
  {
    x: '100',
    y: '30',
  },
  {
    x: '100',
    y: '20',
  },
  {
    x: '100',
    y: '40',
  },
  {
    x: '100',
    y: '50',
  },
  {
    x: '100',
    y: '45',
  },
  {
    x: '100',
    y: '55',
  },
  {
    x: '100',
    y: '60',
  },
];

const MarketVolume = () => {
  const [timeLine, setTimeLine] = useState('1h');

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='h-[300px] sm:h-[340px] w-full max-w-[400px] flex flex-col justify-between items-center bg-background-900 dark:bg-background-100 cardShadowBor rounded-[16px]'>
        <div className='w-full flex flex-col items-start gap-3 p-5'>
          <p className='text-[20px] text-white opacity-80 dark:opacity-100'>
            Market Volume (USD)
          </p>
          {/* time line --->  */}
          <div className='flex justify-center items-center gap-3'>
            {timeLineData.map((item: any, index: number) => {
              return (
                <button
                  onClick={() => setTimeLine(item)}
                  key={index}
                  className={`text-[12px] ${
                    timeLine === item
                      ? 'bg-white opacity-90 text-black'
                      : 'timeLine text-white'
                  } font-medium uppercase py-[2px] px-[12px] rounded-[12px]`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <ResponsiveContainer width='100%' height='70%'>
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: -10,
              bottom: 2,
              left: 15,
            }}
          >
            <XAxis
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
              tickSize={2}
            />
            <YAxis
              style={{ fontSize: '12px' }}
              orientation='right'
              axisLine={false}
              tickLine={false}
              padding={{ top: 15 }}
              tickSize={1}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              strokeDasharray='3 3'
              opacity={0.5}
            />
            <Bar
              barSize={12}
              dataKey='y'
              fill='#C77DFF'
              // shape={(props: any) => <CustomBar {...props} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const timeLineData = ['1h', '24h', '1w', '1y', 'all'];

export default MarketVolume;
