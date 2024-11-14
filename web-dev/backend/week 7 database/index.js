const express = require("express");
const bcrypt = require('bcrypt')
const { UserModel, TodoModel } = require("./db");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {z} = require('zod')
mongoose.connect(
  "mongodb+srv://sohambanerjee384:6yIsZBnGSSTpbKUS@cluster0.d4xhr.mongodb.net/soham-todo-db-1"//it will create the database if it does not exist
);
const jwt_secret = "hello";

app.use(express.json());
app.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string()
  })
  const parsedWithSuccess = requiredBody.safeParse(req.body)
//we use safeParse() over parse() bcoz it returns a object which contains data , error but doesn't throw error like parse() which either returns data or throws an error
  if(!parsedWithSuccess.success){
    res.send({message:"incorrect format",
      error: parsedWithSuccess.error
    })
    return;
  }

  const email = req.body.email;
  const Password = req.body.password;
  const name = req.body.name;

const hashedPassword = await bcrypt.hash(Password, 5)//5 is the no of round makes it computationally expensive there is synchronus predefined which doesn't take the 2nd arguement
  console.log(hashedPassword);
  await UserModel.create({
    name: name,
    email: email,
    Password: hashedPassword,
  });
  res.json({
    message: "you are signed up",
  })
}
);
app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;  
  const user = await UserModel.findOne({
    email: email,
  });// mind the keywords of the query 
  if(!user){
    res.status(403).json({
      message:"the user does not exist"
    })
  }
  const passwordmatch = await bcrypt.compare(password,user.Password)
  if (passwordmatch) {
    const token = jwt.sign({
      id: user._id.toString(),//as the type was object id
    },jwt_secret);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "wrong credentials",
    });
  }
});
app.post("/todo",auth, async (req, res) => {
  const userId = req.userId
  const title = req.body.title
  await TodoModel.create({
    userId: userId,
    title: title
  })
  res.json({
    message: "todo is created"
  })
});
app.get("/todos",auth,async (req, res) => {
  const userId = req.userId
  const todos = await TodoModel.findOne({
    userId: userId
  })
  console.log(todos);
  
  res.json({
    todos: todos
  })
});
function auth(req,res,next){
  const token = req.headers.token
  const decodedData = jwt.verify(token,jwt_secret)
  if(decodedData){
    req.userId = decodedData.id
    next()
  }else{
    res.send("invalid credentials")
  }
}
app.listen(3000);
