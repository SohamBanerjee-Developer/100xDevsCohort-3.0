"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
// import { userModel } from "./models"
const cors_1 = __importDefault(require("cors"));
const bs58_1 = __importDefault(require("bs58"));
const connection = new web3_js_1.Connection('https://api.devnet.solana.com');
const app = (0, express_1.default)();
const JWT_SECRET = "123545";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
app.post("/api/v1/txn/sign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedTx = req.body.message;
    // console.log(serializedTx);//logs object which has property data which holds the buffer from of the transaction obj
    const tx = web3_js_1.Transaction.from(serializedTx.data); //deserializing the transaction object, you can take serializeTx.data or
    //Buffer.from(serializexTx) to get the buffer
    // console.log(tx);//logs a transaction object
    //todo: authenticate the endpoint get the userid from the jwt fecth the user's private key from mongodb based on that userId and
    // todo: then sign the transaction using the private key
    const keypair = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRIVATE_KEY));
    console.log(keypair); // if you see the og and see the type of signer you might understand why the types match below
    tx.sign(keypair); // somehow here the given type and expected type for the tx.sign() match
    //if the tx object is of the VersionedTransaction class then tx.sign() i.e sign function from the VersionedTransaction class
    //expects different type for its argument and the below sendtransaction function will work with just transaction object of the
    //VersionedTransaction class
    const signature = yield connection.sendTransaction(tx, [keypair]);
    //the Connection class has two sendtransaction method one for normal transaction one for versioned transaction
    console.log(signature);
    res.json({
        message: "signed In"
    });
}));
app.get("/api/v1/txn/", (req, res) => {
    res.json({
        message: "signed In"
    });
});
app.listen(3000);
