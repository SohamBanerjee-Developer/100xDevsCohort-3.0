import { useRef, useState } from "react";
import "./App.css";
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction } from "wagmi";
import {  mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { parseEther } from "viem";

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(), //protocol used to talk to the bckend and for nodes to talk to each other
  },
});

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <EthSend/>
        <WalletOptions/>
        <MyDetails/>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
function MyDetails(){
  const {address} = useAccount()
  const balance = useBalance({address})  
  return<div>
    {address}<br/>
    {balance?.data?.formatted}{/*balance.data.value is big int type which react have issues to render */}
  </div>
}

function WalletOptions(){
  const {connectors, connect} = useConnect()

  return(
    <div>
      {
        connectors.map((connector)=><button key={connector.uid} onClick={()=>connect({connector})}>
          {connector.name}{/*glitches in chrome works properly in brave or maybe it was already connected to a wallet*/}
        </button>)
      }
    </div>
  )
}

function EthSend(){
  const ethRef = useRef(null)
  const { data: hash, sendTransaction } = useSendTransaction()//data stores the hash/signature of the transaction after succesfull execution of the transaction

  async function sendTx() {
      const to = ethRef.current.value;
      sendTransaction({ to, 
        value: parseEther('0.01') });//will not wotk if you have 0 eth
  }//my code chain is in mainnet where my address doen't have money but phantom is on devnet where it has money and the transaction is succesfull
  return(
    <div>
      <input ref={ethRef}></input>
      <button onClick={sendTx}>send 0.1 eth</button>
    </div>
  )
}

export default App;
