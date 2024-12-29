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
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlwire_1 = require("./middlwire");
const userRouter = (0, express_1.Router)();
userRouter.post("/signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(10),
        password: zod_1.z.string().min(4).max(20),
    });
    const parsed = requiredBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            message: "Error in inputs",
        });
        return;
    }
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.userModel.create({
            username,
            password: hashedPassword,
        });
    }
    catch (error) {
        res.status(403).json({
            message: "user with this username already exists",
            error,
        });
        return;
    }
    res.status(200).json({
        message: "signed up",
    });
}));
userRouter.post("/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(10),
        password: zod_1.z.string().min(4).max(20),
    });
    const parsed = requiredBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            message: "Error in inputs",
        });
        return;
    }
    const { username, password } = req.body;
    const response = yield db_1.userModel.findOne({
        username,
    });
    if (!response) {
        res.status(403).json({
            message: "username doesnot exist",
        });
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, `${response === null || response === void 0 ? void 0 : response.password}`);
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            id: response === null || response === void 0 ? void 0 : response._id,
        }, `${process.env.JWT_USER_SECRET}`);
        res.status(200).json({
            message: "you are signed in",
            token,
        });
    }
    else {
        res.status(403).json({
            message: "incorrect password",
        });
    }
}));
userRouter.post("/content", middlwire_1.authMiddlewire, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    const { link, type, title } = req.body;
    try {
        yield db_1.contentModel.create({
            link,
            type,
            title,
            tags: [],
            userId,
        });
        res.json({
            messsage: "content created",
        });
    }
    catch (e) {
        res.json({
            message: "content entry error",
            error: e,
        });
    }
}));
userRouter.get("/content", middlwire_1.authMiddlewire, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        console.log(userId);
        const contents = yield db_1.contentModel.find({
            userId,
        }).populate("userId", "username");
        res.status(200).json({
            contents,
        });
    }
    catch (e) {
        res.status(404).json({
            message: "content preview error",
            error: e,
        });
    }
}));
userRouter.delete("/content", middlwire_1.authMiddlewire, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const { contentId } = req.body;
        yield db_1.contentModel.deleteMany({
            _id: contentId,
            userId
        }); // doen't give error if the document is already deleted
        res.status(200).json({
            message: "successfully deleted"
        });
    }
    catch (error) {
        res.status(411).json({
            message: "content deletion error",
            error
        });
    }
}));
userRouter.post("/brain/share", (req, res) => { });
userRouter.post("/brain/:shareLink", (req, res) => { });
exports.default = userRouter;
