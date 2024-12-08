const {Router} = require('express')
const { courseModel, purchasesModel } = require('../db')
const { userMiddleWire } = require('../middlewires/user')
const courseRouter = Router()
// function createCourseRoutes(app){
    // app.get('course/courses', function(req, res){
    //     res.send("testing")
    // })

    // app.post("/purchase", function(req, res){
    
    // })
// }
courseRouter.get('/preview', async function(req, res){
    const courses = await courseModel.find({})//if you doesn't pass empty object it still works
    res.json({
        courses
    })
})

courseRouter.post("/purchase", userMiddleWire,async function(req, res){
    const userId = req.userId
    const courseId = req.body.courseId
    await purchasesModel.create({
        userId,
        courseId
    })
    res.json({
        message: "course successfully purchased"
    })
})
module.exports = {
    // createCourseRoutes,
    courseRouter: courseRouter
}