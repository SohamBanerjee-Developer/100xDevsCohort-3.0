const { JWT_ADMIN_SECRET } = require("../config")
const jwt = require("jsonwebtoken")

function adminMiddleWire(req, res, next){
    const token = req.headers.token
    console.log(token);
    
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET)
    if(decoded){
        req.adminId = decoded.id//creating a new property in the req object
        next()
    }else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }
}
//
module.exports = {
    adminMiddleWire
}