const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())//it also returns an funtion
const users = [
];
let JWT_SECRET = 'I LOVE MYSELF'
function auth(req,res,next){
    const token = req.headers.token
    const decodedInformation = jwt.verify(token, JWT_SECRET)//{ username: username}
    const user = users.find(u=>u.username===decodedInformation.username)
    if(user){
        req.username = user.username//middlewires can modify the request and response object
        req.password = user.password
        next()
    }else{
        res.send(decodedInformation)
    }
}
function logger(req,res,next){
    console.log(`${req.method} method is sent`);
    next()
    

}

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }
app.get("/",(req,res)=>{
res.sendFile(__dirname + "/public/index.html")//avoiding the complexcity of cors __drname holds the current directory
})
app.post("/signup",logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    if(users.find(u=>u.username===username)){
        res.send("the username already exist")
        return;
    }
    users.push({
        username: username,
        password: password,
            })
    res.json({
        message:"u are signed up"
    })
    console.log(users);
    
})
app.post("/signin",logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u=>u.username===username && u.password ===password)
    if(user){
        const token = jwt.sign({
            username: username
        },JWT_SECRET)
        // user.token = token
        res.json({
            token
        })
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    // const token = generateToken()
    console.log(users);

})
app.get("/me",logger,auth,(req,res)=>{

        res.json({
            username: req.username,
            password: req.password
        })
    })
        
    
app.listen(3000)