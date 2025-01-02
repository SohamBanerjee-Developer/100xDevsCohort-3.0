import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
import ShowBalance from "./ShowBalance";
import SendTokens from "./SendTokens";
import { SignMessage } from "./SignMessage";

function App() {
  return (
    <>
      {/* the contexts for these custom providers(componets inside which the actual provider exists) is ofcoures in the library
    from which these are imported and the code of library exists in the node modules */}
      <ConnectionProvider
        endpoint={
          "https://api.devnet.solana.com"
        }
      >{/*provides the object that was passed to the ConnectionContext.Provider in node_modules\@solana\wallet-adapter-react\src\ConnectionProvider.tsx */}
        <WalletProvider wallets={[]} autoConnect>{/*provides the object that was passed to the WalletContext.Provider in node_modules\@solana\wallet-adapter-react\src\WalletProvider.tsx */}
          {/*wallets is now an empty array you need to pass those wallets which doesn't follow the standard it can auto detect the wallets which follows the standard */}
          <WalletModalProvider>
            {/*providing to our dapp*/}
            <WalletMultiButton></WalletMultiButton>{/* custom components that has the logic written somwehere which allows them to perform certain tasks with the help of the contexts that were provided to threm */}
            <WalletDisconnectButton></WalletDisconnectButton>{/*custom components that has the logic written somwehere which allows them to perform certain tasks with the help of the contexts that were provided to threm*/}
            <div>hi there</div>
            <Airdrop />
            <ShowBalance />
            <SendTokens />
            <SignMessage />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
