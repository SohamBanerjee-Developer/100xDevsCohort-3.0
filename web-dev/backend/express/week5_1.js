const express = require('express')
const app = express()

app.use(loggerMiddlewire)
app.get("/", (req,res)=>{
    res.send("welcome to my express calculator")
})
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
app.listen(3000)