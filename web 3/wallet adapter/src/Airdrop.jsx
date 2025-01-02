import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import React from 'react'
function Airdrop() {
    const wallet = useWallet()//custom useContext hook
    const {connection} = useConnection()/*doing the same rpc calls in different ways as differnt libraries and cli's provide different customize ways */
    async function requestAirdrop(){
      const amount = document.getElementById("amount").value
      console.log(amount);  
      console.log(wallet.publicKey );
      console.log(connection);
      
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL)/*doing the same rpc calls in different ways as differnt libraries and cli's provide different customize ways */
       // it will be requestng untill it gets back response
        alert('airdropped')
    }
  return (
    <div>
        <input id="amount" placeholder='enter sol amount'></input>
        <button onClick={requestAirdrop}>request airdrop</button>
        
    </div>
  )
}

export default Airdrop
