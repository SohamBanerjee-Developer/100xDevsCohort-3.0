import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import React from 'react'

function SendTokens() {
    const {connection} = useConnection()//custom useContext hook
    const wallet = useWallet()//custom useContext hook
    async function sendTransaction() {
        const amount = document.getElementById('Amount').value
        const to = document.getElementById('to').value
        const transaction = new Transaction()
        transaction.add(SystemProgram.transfer({// creating a transaction with a single instruction
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }))
        await wallet.sendTransaction(transaction, connection)//sends to the wallet then we confirm the transaction then wallet does all the other thing like signing the transaction sending it to blockchain
        alert("sent " + amount + " from " + wallet.publicKey + " to " + to)      
        
    }
  return (
    <div>
        <input id='to' placeholder='to' type='text'/>
         <input id='Amount' placeholder='amount' type='text'/>{/*if given same id(amount) as the id that was given to the input field 
        to the airdrop.jsx the getElementById method of this file is detecting that input of airdrop.jsx */}
        <button onClick={sendTransaction}>send</button>
    </div>
  )
}

export default SendTokens