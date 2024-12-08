const express = require("express");
const Router = express.Router;
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, courseModel, purchasesModel } = require("../db");
const { z } = require("zod");
const {JWT_USER_SECRET} = require('../config');
const { userMiddleWire } = require("../middlewires/user");

// function createUserRoutes(app){
//     app.post('/user/signUp', function(req, res){

//     })
//     app.post('/user/signIn', function(req, res){

//     })
// app.get('/user/purchases', function(req, res){
//
// })
// }
userRouter.post("/signUp", async function (req, res) {
  console.log(req.baseUrl) // logged: /api/v1/user  The URL path on which a router instance was mounted.
  // input validation using zod
  const requiredBody = z.object({
    email: z.string().email(),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    password: z.string().min(4),
  });
  const parsedWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedWithSuccess.success) {
    res.json({
      message: "incorrect format",
      error: parsedWithSuccess.error,
    });

    return;
  }

  //password hashing
  const { email, firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);

  //insertion in db
  try {
    await userModel.create({
      // need to await it will throw error after the try block has excuted
      email,
      firstName,
      lastName,
      Password: hashedPassword,
    });
  } catch (e) {
    res.json({
      message: " duplicate entry",
      error: e,
    });
    return;
  }
  res.json({
    message: " you are signed up",
  });
});

userRouter.post("/signIn", async function (req, res) {
  //input validation using ZOD
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });
  const parsedWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedWithSuccess.success) {
    res.json({
      message: "incorrect format",
      error: parsedWithSuccess.error,
    });

    return;
  }
  //authentication
  const { email, password } = req.body;
  const response = await userModel.findOne({
    email,
  });
  if (!response) {
    res.send("user does not exist");
    return;
  }
  const passwordmatch = await bcrypt.compare(password, response.Password);
  console.log(passwordmatch);
  if(passwordmatch){
    const token = jwt.sign({
     id: response._id
    },JWT_USER_SECRET) 
    res.json({
      message:"you are signed in",
     token
    })
   }else{
    res.status(403).json({
      message: "incorrect password"
    })
   }
});

userRouter.get("/purchases", userMiddleWire, async function (req, res) {
  const userId = req.userId
  const purchases = await purchasesModel.find({
    userId
  })
  const courses = await courseModel.find({
    _id: {$in : purchases.map(c=>c.courseId)}//finding courses based on the course id in the given array
  })
  console.log(courses); 
  

  res.json({
    purchases, courses
  })
});
module.exports = {
  // createUserRoutes,
  userRouter,
};