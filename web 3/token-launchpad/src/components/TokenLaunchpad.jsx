import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"// this library was meant for node to run it on browser we need node polyfills
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import React from "react"

//writing the components of the createMint() from spl-token library
export function TokenLaunchpad() {
    const {connection} = useConnection()
    const wallet = useWallet()
    async function createToken(){
        const name = document.getElementById("name").value
        const symbol = document.getElementById("symbol").value
        const imageURL = document.getElementById("imageURL").value
        const intialSupply = document.getElementById("intialSupply").valuename
        const lamports = await getMinimumBalanceForRentExemptMint(connection)
        const keypair = Keypair.generate()
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        );
        const recentblockhash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = recentblockhash.blockhash//solana blockchain rejects the current block if the recent blockhash is too old
        transaction.feePayer = wallet.publicKey
        transaction.partialSign(keypair)//also signs the fee payer and recent block has details
        const response = await wallet.sendTransaction(transaction, connection)
        console.log(response);
        

    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>{/*syntax for inline css in react*/}
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="imageURL" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="intialSupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken}className='btn'>Create a token</button>
    </div>
}