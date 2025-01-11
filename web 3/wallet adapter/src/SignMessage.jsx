import { ed25519 } from '@noble/curves/ed25519';//an implementetion of ed25519 curve for more insights go to google or npmjs https://www.npmjs.com/package/@noble/curves
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');//the logic that if !signMessage then the connected wallet doesn't support message signing,is written in the wallet-adapter-react-ui
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);//converts the message in uint8array as the below function expects that using utf8 encoding
        const signature = await signMessage(encodedMessage);//the wallet signs the message using my private key
        //signature is nothing but the encoded form of the message
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');//using the corresponding public key 
        //manually verifing whether it is signed by the private key 
        alert('success' + ` message signature: ${bs58.encode(signature)}`);
        console.log(`Message signature: ${bs58.encode(signature)}`);        
        console.log(signature);
        
    };

    return (
        <div>
            <input id="message" type="text" placeholder="Message" />
            <button onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
};