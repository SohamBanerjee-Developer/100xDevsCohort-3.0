require("dotenv").config();
const { Wallet } = require("@project-serum/anchor");
const { bs58 } = require("@project-serum/anchor/dist/cjs/utils/bytes");
const {
  Connection,
  Keypair,
  VersionedTransaction,
} = require("@solana/web3.js");
const { default: axios } = require("axios");

const connection = new Connection("https://api.mainnet-beta.solana.com"); // if log the connection variable then we get a connection object
//with so much information about the network
const wallet = new Wallet(
  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY))
); //bs58.decode converts base58 encoded string to
//buffer of string not uint8array
// console.log( wallet, Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY)))// logs a  Noodewallet object, Keypairobject which are two
//differnt object with different property structure but same value

async function main() {
  const balance = await connection.getBalance(wallet.publicKey);
  // console.log(balance)//the balance of the wallet
  const response = await axios.get(
    "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50"
  ); //jupyter fetching the quote price by going to
  //  different exchanges/different liquidity pool
  const quoteResponse = response.data;
  // console.log(quoteResponse)// quote response object with so much information
  try {
    const {
      data: { swapTransaction },
    } =
      await //equivalent to const response = await axios.post('https://quote-api.jup.ag/v6/swap',
      //  {quoteResponse, userPublicKey: wallet.publicKey.toString()}) -> const swapTransaction = response.data.swapTransaction
      await axios.post("https://quote-api.jup.ag/v6/swap", {
        quoteResponse,
        userPublicKey: wallet.publicKey.toString(),
      }); //sending a request to the jupyter backend to return me the transaction object for the corresponding quote which I will sign

    console.log(swapTransaction); // transaction object for the corresponding swapping encoded in base64
    // note: it logs a string of base64 encoded transaction object

    const swapTransactionBuf = Buffer.from(swapTransaction, "base64"); //converts base64 encoded string to buffer of bytes
    console.log(swapTransactionBuf);

    var transaction = VersionedTransaction.deserialize(swapTransactionBuf); //deserialized bytes to a VersionedTransaction object
    console.log(transaction); //the VersionedTransaction object having the transactions detals like recent blockhash, signatures,
    //addressTableLookups etc

    transaction.sign([wallet.payer]);
    const latestBlockHash = await connection.getLatestBlockhash(); //we will need the latest blockhash to confirm the transaction
    //returns a promise which resolve in a object which has the recent block hash
    // Execute the transaction
    const rawTransaction = transaction.serialize(); //serialize the transaction object to bytes of uint8array
    // console.log(rawTransaction);
    const txid = await connection.sendRawTransaction(rawTransaction, {
      //send the transaction to the network
      skipPreflight: true,
      maxRetries: 2, //retry max 2 times
    });
    console.log("after txid", txid); //the code reaches here  if the connection is in mainnet but doesn't reach here if the connection
    //is in devnet then the confirm transaction sends a blockheight error
    // of course the transaction wouldn't success as i don't have balance in mainnet

    await connection.confirmTransaction({
      //confirm the transaction
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid,
    });
    console.log(`https://solscan.io/tx/${txid}`); //link to the transaction on solscan
  } catch (err) {
    console.log(err);
  }
}
main();
//if the tx object is of the VersionedTransaction class then tx.sign() i.e sign function from the VersionedTransaction class
//expects different type for its argument and the below sendtransaction function will work with just transaction object of the
//VersionedTransaction class
// the connection class has two sendtransaction method one for normal transaction one for versioned transaction
