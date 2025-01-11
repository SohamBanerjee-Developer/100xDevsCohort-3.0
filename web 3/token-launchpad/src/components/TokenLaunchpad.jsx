import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMint2Instruction, createMint, createMintToInstruction, getAccount, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, getOrCreateAssociatedTokenAccount, MINT_SIZE, mintTo, TOKEN_PROGRAM_ID, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, TokenInvalidMintError, TokenInvalidOwnerError } from "@solana/spl-token"// this library was meant for node to run it on browser we need node polyfills
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import React, { useState } from "react"

export function TokenLaunchpad() {
    const {connection} = useConnection()
    const wallet = useWallet()
    const [mint, setMint] = useState(null)

    
    // getOrCreateAssociatedTokenAccount() we can't use this function as this function expects a object which will have prvate key in its value so we are copying the body
    //of the function and modifying it by remove try catch blocks and only creating the ATA not getiing its info as the getAccount() func is giving error and 
    // also we are signing the transaction from the wallet as harkirat has written in the token launchpad in react note
    // doing the same with the mintTo() function
    async function createtATAandMintTokens() {
        const associatedToken = getAssociatedTokenAddressSync(//first i will get the pda then i will create the account for the corresponding address
            mint,
            wallet.publicKey,
            // allowOwnerOffCurve, //the function has a default value for this parameters
            // programId,
            // associatedTokenProgramId,
        );
    
        console.log(associatedToken.toBase58());

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mint,
                TOKEN_PROGRAM_ID,
            ),
        );
        
        await wallet.sendTransaction(transaction2, connection);
        
        const transaction3 = new Transaction().add(
            createMintToInstruction(mint, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_PROGRAM_ID)
        );
        
        await wallet.sendTransaction(transaction3, connection);
    }
    
    //writing the components of the createMint() from spl-token library
    async function createToken(){
        const lamports = await getMinimumBalanceForRentExemptMint(connection)
        const keypair = Keypair.generate()// creating the public and private keys on the curve
        const transaction = new Transaction().add(// this transaction calls function on the systemProgram and token program smart contract of the solana blockchain
            SystemProgram.createAccount({//SystemProgram is a class which has a public key that identifies the system program on the solana blockchain
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),// creates an empty account with the mint size and the lamports
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),//returns an instruction to create a mint(got this info from node_modules\@solana\spl-token\src\instructions\initializeMint2.ts), this instruction shove the data(dafault dat for amint account, passed to the function's argument) in the account created in the previous instruction this instruction most probably calls a function on the token program smart contract
        );
        const recentblockhash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = recentblockhash.blockhash//solana blockchain rejects the current block if the recent blockhash is too old
        transaction.feePayer = wallet.publicKey//thoughts: we need to mention the fee payer differently fo rthe creatinon of the mint account as we didn't mention in the instruction itself and sign it separately, and the paritaila sign functionality probality needs recent blockhash and fee payer 
        transaction.partialSign(keypair)//the transaction nened to be signed by the owner as well as by the mint account, signing by the mint account is done here. Alsso signs the fee payer and recent block has details
        const response = await wallet.sendTransaction(transaction, connection)// and signing by the owner part is sent to the wallet
        console.log(keypair.publicKey.toBuffer());
        
        setMint(keypair.publicKey)
        
        console.log("createmint transactionlog: ",response);
        
        alert("Token created successfully")
        
    }
    
    async function Mint(){// you don't need to mint this function if you use useRef hook instead of useState
        createtATAandMintTokens()
        console.log(mint);
    }


    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>{/*syntax for inline css in react*/}
        <h1>Solana Token Launchpad</h1>
        <button onClick={createToken}className='btn'>Create a token</button>
        <button onClick={Mint}>log mint</button>
    </div>
}