import { Connection, Keypair, Transaction } from "@solana/web3.js"
import express from "express"
import jwt from "jsonwebtoken"
import 'dotenv/config'
// import { userModel } from "./models"
import cors from 'cors'
import bs58 from 'bs58'

const connection = new Connection('https://api.devnet.solana.com')
const app = express()
const JWT_SECRET = "123545"
app.use(express.json())
app.use(cors())


/* app.post("/api/v1/signup", async (req, res)=>{
//     const {username, password} = req.body
//     const keypair = new Keypair()// Keypair class generates anew keypair on solana's elictive curve
//     //todo: Zod validation password hashing, check if the user already exists
//     const response = await userModel.create({
//         username,
//         password,
//         privatekey: keypair.secretKey.toString(),// returns a uint8array needs to be converted to string as we are storing string in the schema
//         publickey: keypair.publicKey.toString()// returns a class needs to be converted to string as we are stroing string in the schema
//     })

//     res.json({
//         message: keypair.publicKey
//     })
// })

// app.post("/api/v1/signin", async (req, res)=>{
//     const {username, password} = req.body

//     const response = await userModel.findOne({
//         username,
//         password
//     })
//     if(response){
//         const token = jwt.sign({
//             id: response._id
//         },JWT_SECRET)
//         res.json({
//             token
//         })
//     }else{
//         res.status(403).json({
//             message: "invalid credentials"
//         })
//     }

// })*/

//after deseirializing the transaction I swa it had recent blockhash and fee payer in log as expected and i didn't need to  add them again 
//in the backend but harkirat needed to
app.post("/api/v1/txn/sign", async (req, res)=>{
    const serializedTx = req.body.message
    // console.log(serializedTx);//logs object which has property data which holds the buffer from of the transaction obj
    
    const tx = Transaction.from(serializedTx.data)//deserializing the transaction object, you can take serializeTx.data or
    //Buffer.from(serializexTx) to get the buffer

    // console.log(tx);//logs a transaction object
    
    //todo: authenticate the endpoint get the userid from the jwt fecth the user's private key from mongodb based on that userId and
    // todo: then sign the transaction using the private key
    const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY as string))
    console.log(keypair);// if you see the og and see the type of signer you might understand why the types match below
    
    tx.sign(keypair)// somehow here the given type and expected type for the tx.sign() match
    
    //if the tx object is of the VersionedTransaction class then tx.sign() i.e sign function from the VersionedTransaction class
    //expects different type for its argument and the below sendtransaction function will work with just transaction object of the
    //VersionedTransaction class
    const signature = await connection.sendTransaction(tx, [keypair])
    //the Connection class has two sendtransaction method one for normal transaction one for versioned transaction
    console.log(signature);
    
    res.json({
        message: "signed In"
    })
})

app.get("/api/v1/txn/", (req, res)=>{

    res.json({
        message: "signed In"
    })
})

app.listen(3000)