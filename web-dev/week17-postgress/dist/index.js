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
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in the signup route");
    const { username, email, password, city, pincode, street, country } = req.body;
    try {
        console.log(username + " " + email + " " + password);
        const insertQuery = `INSERT INTO users(username, email,password ) VALUES ($1,$2,$3) returning id`; //the values should be withing '' or ""
        const insertValues = [username, email, password];
        //the query and values reach the database seperately the query get executed and takes the
        //values while executed, although password is itself a sql but
        //its not appended to the query so its not executed
        console.log(insertQuery);
        const response = yield pgClient.query(insertQuery, insertValues);
        console.log(response);
        yield pgClient.query('BEGIN;'); //begining the transaction
        const addressQuery = `INSERT INTO addresses(city, country,pincode, street, user_id) VALUES ($1,$2,$3,$4,$5)`;
        const userId = response.rows[0].id; // the query will try create the entry so we wil get the userId even if the transaction fails
        const addressQueryValues = [city, country, pincode, street, userId];
        const addressQueryResponse = yield pgClient.query(addressQuery, addressQueryValues);
        yield pgClient.query('COMMIT;');
        res.send("you are signed up");
    }
    catch (error) {
        console.log("in the error block");
        res.json({
            message: " error signing up ",
            error,
        });
    }
}));
app.get('/metadata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const getQuery = "SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.id = $1;";
    const response = yield pgClient.query(getQuery, [id]);
    res.json({
        response: response.rows
    });
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
