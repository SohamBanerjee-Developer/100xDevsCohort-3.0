const express = require('express')
const Router = express.Router
const userRouter = Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = "course-user"
// function createUserRoutes(app){
//     app.post('/user/signUp', function(req, res){
    
//     })
//     app.post('/user/signIn', function(req, res){
    
//     })
// app.get('/user/purchases', function(req, res){
    // 
// })
// }
userRouter.post('/signUp', function(req, res){

    
})
userRouter.post('/signIn', function(req, res){


})
userRouter.get('/purchases', function(req, res){
    
})
module.exports = {
    // createUserRoutes,
    userRouter,
}