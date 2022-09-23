import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import AwakePage from './pages/AwakePage';
import { NETWORK, RPC } from './vars';
import 'animate.css'

require('./css/App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {

    const network = NETWORK as WalletAdapterNetwork
    const rpc = RPC
    const connection = new Connection(rpc)

    const wallets = [
        new SolanaMobileWalletAdapter({
            appIdentity: { name: 'Dapp' },
            authorizationResultCache: createDefaultAuthorizationResultCache(),
        }),
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
    ]

    return (
        <ConnectionProvider endpoint={rpc}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="App">
                        <Navbar connection={connection} />
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<AwakePage connection={connection} />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
export default App;