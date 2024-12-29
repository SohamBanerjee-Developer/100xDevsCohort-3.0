"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewire = authMiddlewire;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddlewire(req, res, next) {
    const token = req.headers.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_USER_SECRET);
    if (decoded) {
        //@ts-ignore todo: add overwrite
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "you are not signed in"
        });
    }
}
