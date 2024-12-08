// entrypoint of a project
require('dotenv').config()// 0 dependency so it is easier to make sure nothing shady is going on, we are exposing sensitive info
// loads environment variables from a .env file into process.env
const express = require("express");
const app = express();
const { createUserRoutes, userRouter } = require("./routes/user");
const { createCourseRoutes, courseRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");
const { default: mongoose } = require("mongoose");

app.use(express.json());
// createUserRoutes(app)
// createCourseRoutes(app)

app.use("/api/v1/user", userRouter);//when the requested path matches this path the router will be executed and the methods inside while cthe condition matched
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000);
  console.log("connected");
}
main();
// nodemon tracks the files and restart the server after any changes
// that's why I put nodemon index.js as dev under the scripts in package.json
//and set node index.js as start script bcoz in production we don't need to track changes so we would just do npm run start
