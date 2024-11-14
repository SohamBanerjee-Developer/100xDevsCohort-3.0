import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import React from 'react'
function Airdrop() {
    const wallet = useWallet()
    const {connection} = useConnection()
    async function requestAirdrop(){
      const amount = document.getElementById("amount").value
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL)
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
