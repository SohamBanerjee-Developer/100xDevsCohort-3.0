const {Router} = require('express')
const adminRouter = Router()
const {adminModel, courseModel} = require("../db")
const { z } = require("zod");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {JWT_ADMIN_SECRET} = require('../config');
const { adminMiddleWire } = require('../middlewires/admin');
const { default: mongoose } = require('mongoose');

adminRouter.post('/signUp', async function(req, res){
    //input validation using ZOD
    const requiredBody = z.obxject({
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
    await adminModel.create({
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
})


adminRouter.post('/signIn', async function(req, res){
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
  const response = await adminModel.findOne({
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
   },JWT_ADMIN_SECRET) 
   res.json({
    message:"you are signed in",
    token
   })
  }else{
    res.status(403).json({
      message: "incorrect password"
    })
   }

})


adminRouter.post('/course', adminMiddleWire, async function(req, res){
  const adminId = req.adminId
  const {title, imageUrl, description, price} = req.body
  const course = await courseModel.create({
    imageUrl, title, description, adminID: adminId, price
 } )
  res.json({
    message: "course created",
    courseId: course._id
  })
})


adminRouter.put('/course', adminMiddleWire, async function(req, res){
    const adminId = req.adminId
    const { title, imageUrl, description, price, courseId} = req.body
    const course = await courseModel.updateOne({//filtering criteria
      _id: courseId,
      adminID: adminId
    },{
      title, imageUrl, description, adminId, price
    })
    res.json({
      message: "course updated",
      courseId: course._id
    })
})


adminRouter.get('/courses', adminMiddleWire, async function(req, res){
    const adminId = req.adminId
    const courses = await courseModel.find({
      adminID: adminId
    })
    // courses.map((course)=>res.json({course}))
    res.json({
      courses
    })
})
module.exports = {
adminRouter
}