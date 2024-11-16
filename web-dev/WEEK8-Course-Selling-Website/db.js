const mongoose = require("mongoose")
const Schema = mongoose.Schema//exports a class named schema
const ObjectId = Schema.ObjectId
const User = new Schema({
    email: {type:String,unique:true},
    firstName: String,
    lastName: String,
    Password: String
})
const Admin = new Schema({
    email: {type:String,unique:true},
    firstName: String,
    lastName: String,
    Password: String
})
const Course = new Schema({
    imageUrl: String,
    title: String,
    description: String,
    adminID: ObjectId,
    price: Number,
})
const Purchases = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})
const userModel = mongoose.model('Users', User)
const adminModel = mongoose.model('Admins', Admin)
const courseModel = mongoose.model('Courses', Course)
const purchasesModel = mongoose.model('Purchases', Purchases)// why both can be same? : one value of type string another one is variable referencing a value

module.exports = {
userModel,
adminModel,
courseModel,
purchasesModel
}