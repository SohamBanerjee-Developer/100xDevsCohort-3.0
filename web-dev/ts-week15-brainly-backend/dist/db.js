"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
// import { ObjectId } from "mongoose";
const objectID = mongoose_1.Schema.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const user = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true }
});
const contentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: objectID, ref: 'Tag' }],
    userId: { type: objectID, ref: 'user', required: true },
});
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: objectID, ref: 'User', required: true },
});
exports.userModel = (0, mongoose_1.model)("user", user);
exports.contentModel = (0, mongoose_1.model)("content", contentSchema);
exports.tagModel = (0, mongoose_1.model)("tags", tagSchema);
exports.linkModel = (0, mongoose_1.model)("links", linkSchema);
