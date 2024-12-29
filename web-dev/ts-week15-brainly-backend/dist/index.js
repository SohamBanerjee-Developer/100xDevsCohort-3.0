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
//standard require syntax ignore types and some old libraries doesn't have ts declaration files so you 
// can not import types from them without installing npm i @types/libraries @ts-ignore
// @ts-ignore ignores types errors in the next line
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./userRouter"));
require("dotenv/config");
console.log(`${process.env.MONGO_URL}`);
const app = (0, express_1.default)();
app.use(express_1.default.json()); //without it req.body will be undefined
app.use("/api/v1/user", userRouter_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MONGO_URL}`); //otherwise giving types error
        console.log("connected");
        app.listen(3000);
    });
}
main();
