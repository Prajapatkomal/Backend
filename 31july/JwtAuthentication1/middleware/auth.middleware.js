var jwt = require('jsonwebtoken');

authToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return  res.send("user not authorized")
     }
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        var decoded = jwt.verify(token, 'masai')
        if(decoded){
            // req.body.userName = decoded.name
            // req.body.password = decoded.password
             next()
        }else{
            res.send("user not authorized")
        }
}}

module.exports = authToken