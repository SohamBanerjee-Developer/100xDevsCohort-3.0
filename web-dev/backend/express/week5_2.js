const express = require('express')
const cors = require('cors')
const app = express()
let request = 0
function loggerMiddlewire(req, res, next){//assignmet 1
    console.log("the method is: "+ req.method);
    console.log("the route is: "+ req.url);
    console.log("the timestamp is: "+ Date.now());
    next()
    
}
function requestMiddlwire(req,res,next){//assignmet 2
    request+=1
    Request = request.toString()
    next()
}
app.use(loggerMiddlewire)//everything afterwards will get the middlewire
app.get("/", (req,res)=>{
    //res.sendFile(__dirname + "/index.html");//you don't need cors middlewire if frontend and backend are on the sme domain
    res.send("welcome to my calculator")
})
app.use(cors())// u can also restrict to some specofied domain cors({domains:["http://google.com"]})//it returns an function that's why we are calling it
app.get("/multiply/:firstArg/:secondArg",(req, res)=>{
    let a = parseInt(req.params.firstArg)
    let b = parseInt(req.params.secondArg)
    res.json({ans:a*b})    
})
app.get("/division/:firstArg/:secondArg",(req, res)=>{
    let a = parseInt(req.params.firstArg)
    let b = parseInt(req.params.secondArg)
    res.json({ans:a/b})
})
app.get("/add/:firstArg/:secondArg",(req, res)=>{
    let a = parseInt(req.params.firstArg)
    let b = parseInt(req.params.secondArg)
    res.json({ans:a+b})
})
app.get("/subtrac/:firstArg/:secondArg",(req, res)=>{
    let a = parseInt(req.params.firstArg)
    let b = parseInt(req.params.secondArg)
    res.json({ans:a-b})
})


app.get("/request",requestMiddlwire,(req,res)=>{
    res.send(Request)
})
app.listen(3000)