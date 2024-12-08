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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const pgClient = new pg_1.Client("postgresql://neondb_owner:qYgDJFmr2Q7X@ep-fancy-flower-a53gsmzz.us-east-2.aws.neon.tech/neondb?sslmode=require");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('in the signup route');
    const { username, email, password } = req.body;
    try {
        console.log(username + ' ' + email + ' ' + password);
        const insertQuery = `INSERT INTO users(username, email,password ) VALUES ($1,$2,$3)`; //the values should be withing '' or ""
        const insertValues = [username, email, password];
        console.log(insertQuery);
        yield pgClient.query(insertQuery, insertValues);
        res.send("you are signed up");
    }
    catch (error) {
        console.log('in the error block');
        res.json({
            message: " error signing up ",
            error
        });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        console.log("connected");
        // const response = await pgClient.query("update users set username='harkirat' where id = 6")
        // console.log(response.rows);
        app.listen(3000);
    });
}
main();
