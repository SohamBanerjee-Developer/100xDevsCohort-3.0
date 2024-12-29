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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.user.findMany();
    res.json({
        users: response
    });
}));
app.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; //always returns a string
    console.log(id);
    const response = yield client.user.findFirst({
        where: {
            userId: parseInt(id) //expects a integer as described in schema
        },
        select: {
            todo: true,
            userName: true,
            city: true
        }
    });
    res.json({
        response
    });
}));
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield client.user.findFirst({
            where: {
                userId: 1
            },
            include: {
                todo: true //this works because we have defined  a one to many relationship in the schema
            }
        });
        console.log(res);
    });
}
createUser();
app.listen(3000);
