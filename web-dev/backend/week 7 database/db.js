const mongoose = require("mongoose")
const Schema = mongoose.Schema//exports a class named schema
const ObjectId = Schema.ObjectId
const User = new Schema({
    name: String,
    email: {type:String,unique:true},
    Password: String
})
const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
})
const UserModel = mongoose.model('users',User)//collection name , schema
const TodoModel = mongoose.model('todos', Todo)
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}