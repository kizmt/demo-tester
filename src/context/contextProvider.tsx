import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './autoConnect';
import { notify } from "@/utils/notifications";
import { NetworkConfigurationProvider, useNetworkConfiguration } from './networkConfig';
import dynamic from "next/dynamic";

// Using dynamic import with 'ssr: false' for client-side only components
const WalletModalProvider = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider), { ssr: false });

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Use memoization for wallet initialization
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

    // Improved error handling
    const onError = useCallback((error: WalletError) => {
        notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
        console.error(`WalletError: ${error.name}`, error);
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <NetworkConfigurationProvider>
        <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
    </NetworkConfigurationProvider>
);