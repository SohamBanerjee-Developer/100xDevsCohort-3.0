"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://sohambanerjee384:6yIsZBnGSSTpbKUS@cluster0.d4xhr.mongodb.net/privateKeys");
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    privatekey: String,
    Publickey: String
});
exports.userModel = mongoose_1.default.model('Users', userSchema);
