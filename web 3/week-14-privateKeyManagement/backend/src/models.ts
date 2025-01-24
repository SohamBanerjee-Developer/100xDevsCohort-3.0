import mongoose from "mongoose";
mongoose.connect("mongodb+srv://sohambanerjee384:6yIsZBnGSSTpbKUS@cluster0.d4xhr.mongodb.net/privateKeys")

const userSchema = new mongoose.Schema({// Schema is a class
    username: String,
    password: String,
    privatekey: String,
    Publickey: String
})

export const userModel = mongoose.model('Users', userSchema)