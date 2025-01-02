require('dotenv').config()
const { Wallet } = require("@project-serum/anchor")
const { bs58 } = require("@project-serum/anchor/dist/cjs/utils/bytes")
const { Connection, Keypair, VersionedTransaction } = require("@solana/web3.js")
const { default: axios } = require('axios')

const connection = new Connection("https://api.mainnet-beta.solana.com")// if log the connextion variable then we get a connection object with so much information about the network
const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY)))//bs58.decode converts base58 encoded string to bytes in buffer not uint8array
// console.log( wallet, Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY)))// to differnt keypair object with different property structure but same value

async function main() {
    const balance = await connection.getBalance(wallet.publicKey)
    // console.log(balance)//the balance of the wallet
    const response = await axios.get('https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50')
    const quoteResponse = response.data
    // console.log(quoteResponse)// quote response object with so much information
    try{
        const { data: { swapTransaction } } = await (//equivalent to const response = await axios.post('https://quote-api.jup.ag/v6/swap', {quoteResponse, userPublicKey: wallet.publicKey.toString()}) -> const swapTransaction = response.data.swapTransaction
            await axios.post('https://quote-api.jup.ag/v6/swap', {
                quoteResponse,
                userPublicKey: wallet.publicKey.toString(),
            })
        );

        console.log(swapTransaction)// transaction object for the corresponding swapping encoded in base64  
        // note: it logs a string of base64 encoded transaction object
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');//converts base64 encoded string to bytes in buffer
        var transaction = VersionedTransaction.deserialize(swapTransactionBuf);//deserialized bytes to a transaction object
        // console.log(transaction);//the transaction object

        transaction.sign([wallet.payer]);
        const latestBlockHash = await connection.getLatestBlockhash();//we will need the latest blockhash to confirm the transaction

        // Execute the transaction
        const rawTransaction = transaction.serialize()//serialize the transaction object to bytes of uint8array
        // console.log(rawTransaction);
        const txid = await connection.sendRawTransaction(rawTransaction, {//send the transaction to the network
            skipPreflight: true,
            maxRetries: 2//retry max 2 times
        });
        console.log("after txid", txid);//the code reaches here  if the connection is in mainnet but doesn't reach here if the connection is in devnet then the confirm transaction sends a blockheight error
        // of course the transaction wouldn't success as i don't have balance in mainnet
        
        await connection.confirmTransaction({//confirm the transaction
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid
        });
        console.log(`https://solscan.io/tx/${txid}`);//link to the transaction on solscan
    }catch(err){
        console.log(err)
    }
}
main()