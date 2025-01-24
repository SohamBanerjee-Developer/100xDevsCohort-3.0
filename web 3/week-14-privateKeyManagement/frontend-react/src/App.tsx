
import axios from 'axios'
import './App.css'
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

function App() {
  const connection = new Connection('https://api.devnet.solana.com')
  const fromPubkey = new PublicKey("7rYa2FSRTY4hpEMRPdEVfai5fVkLNY365sYueWxHzJ7G")

  async function sendSol(){
    const ix = SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: new PublicKey("DzVK22CoNJYGeFdT3X7h3W1f7ZiMjcRPt13VJw5ZcD5Y"),
        lamports: 0.01 * LAMPORTS_PER_SOL
    })
    const tx = new Transaction().add(ix)
    const {blockhash} = await connection.getLatestBlockhash()//returns a promise which resolve in a object which has the recent block
    //hash
    console.log(blockhash);
    
     tx.recentBlockhash = blockhash
     tx.feePayer = fromPubkey
     //we need to add them as trasaction.serialize() check for the above and gives error if not found

    //you can't send a random object of  a class over a http-server you need to serialize it into something that can be sent like a base64
    //string
    const seriaLizedTx = tx.serialize({// so that this func does look for signature and doen't try to verify them
      requireAllSignatures: false,
      verifySignatures: false
    })
    console.log(seriaLizedTx);//logs a uint8array
    
    await axios.post("http://localhost:3000/api/v1/txn/sign",{//sending the body whoose schema is written in the video's note
      message: seriaLizedTx,
      retry: false
    })
    alert('successfully transfered')

  }

  return (
    <>
      <div>
        <input placeholder='amount'/>
        <input placeholder='address'/>
        <button onClick={sendSol}>Submit</button>
      </div>
    </>
  )
}

export default App
