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
import { MetaTokenLaunchpad } from './components/MetaTokenLaunchpad';

function App() {
  const [count, setCount] = useState(0)
// todo: create a liquidity pool for the token and creste token with metadata
  return (
        <>
        {/* the contexts for these custom providers(componets inside which the actual provider exists) is ofcoures in the library
    from which these are imported and the code of library exists in the node modules */}
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>{/*provides the object that was passed to the WalletContext.Provider in node_modules\@solana\wallet-adapter-react\src\WalletProvider.tsx */}
    {/*wallets is now an empty array you need to pass those wallets which doesn't follow the standard it can auto detect the wallets which follows the standard */}
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
                <WalletMultiButton />{/*custom components that has the logic written somwehere which allows them to perform certain tasks with the help of the contexts that were provided to threm*/}
                <WalletDisconnectButton />{/*custom components that has the logic written somwehere which allows them to perform certain tasks with the help of the contexts that were provided to threm*/}
              </div>
                <MetaTokenLaunchpad></MetaTokenLaunchpad>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    </>
  )
}

export default App
