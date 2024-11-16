const {Router} = require('express')
const courseRouter = Router()
// function createCourseRoutes(app){
    // app.get('course/courses', function(req, res){
    //     res.send("testing")
    // })

    // app.post("/purchase", function(req, res){
    
    // })
// }
courseRouter.get('/courses', function(req, res){
    res.send("testing")
})

courseRouter.post("/course/purchase", function(req, res){

})
module.exports = {
    // createCourseRoutes,
    courseRouter: courseRouter
}