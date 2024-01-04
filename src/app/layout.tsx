import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './css/globals.css';
import './css/klinechart.css';
import './css/marketDepth.css';

import TopBar from '../components/TopBar';
import Theme from './theme-provider'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Arcana Markets',
   description: 'DeFi Liquidity on Solana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`dark:bg-black-gradient bg-offWhite ${inter.className}`}>
        <Theme>
          <TopBar />
          {children}
        </Theme>
      </body>
    </html>
  );
}
