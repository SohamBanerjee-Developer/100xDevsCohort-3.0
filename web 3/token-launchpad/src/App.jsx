import { useState } from 'react'
import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'
// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
                <TokenLaunchpad></TokenLaunchpad>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    </>
  )
}

export default App