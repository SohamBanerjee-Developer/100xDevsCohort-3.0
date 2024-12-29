import { Schema, model } from "mongoose";
// import { ObjectId } from "mongoose";
const objectID = Schema.ObjectId

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const user = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
  });

const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: objectID, ref: 'Tag' }],
    userId: { type: objectID, ref: 'user', required: true },
  });
  
  const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: objectID, ref: 'User', required: true },
  });


export const userModel = model("user", user)
export const contentModel = model("content", contentSchema)
export const tagModel = model("tags", tagSchema)
export const linkModel = model("links", linkSchema)