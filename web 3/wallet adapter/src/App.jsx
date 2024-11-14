import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import ShowBalance from './ShowBalance';
import SendTokens from './SendTokens';
import { SignMessage } from './SignMessage';

function App() {


  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/Q2sMxfLhwZtyozPE8bZ9pDJ4KcLTbTvn"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>{/*providing to our dapp*/}
                  <WalletMultiButton></WalletMultiButton>
                  <WalletDisconnectButton></WalletDisconnectButton>
      <div>hi there</div>
      <Airdrop/>
      <ShowBalance/>
      <SendTokens/>
      <SignMessage/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  )
}

export default App
