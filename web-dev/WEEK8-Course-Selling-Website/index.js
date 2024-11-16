//entrypoint of a project
const express = require('express')
const app = express()
const {createUserRoutes, userRouter} = require('./routes/user')
const { createCourseRoutes, courseRouter } = require('./routes/courses')
const { adminRouter } = require('./routes/admin')
const { default: mongoose } = require('mongoose')

// createUserRoutes(app)
// createCourseRoutes(app)

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)

async function main(){
    await mongoose.connect(
        "mongodb+srv://sohambanerjee384:6yIsZBnGSSTpbKUS@cluster0.d4xhr.mongodb.net/course-app"
    )
    app.listen(3000)
    console.log("connected");
    
}
main()
// nodemon tracks the files and restart the server after any changes
// that's why I put nodemon index.js as dev under the scripts in package.json
//and set node index.js as start script bcoz in production we don't need to track changes so we would just do npm run start