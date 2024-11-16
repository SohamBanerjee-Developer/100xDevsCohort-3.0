const {Router} = require('express')
const adminRouter = Router()
const {adminModel} = require("../db")

adminRouter.post('/signUp', function(req, res){
    
})
adminRouter.post('/signIn', function(req, res){

})
adminRouter.post('/course', function(req, res){
    res.send("testing")
})
adminRouter.put('/course', function(req, res){
    res.send("testing")
})
adminRouter.get('/courses', function(req, res){
    res.send("testing")
})
module.exports = {
adminRouter
}