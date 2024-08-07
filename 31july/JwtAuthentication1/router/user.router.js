const express = require("express")
const userRouter  = express.Router()
const Usermodel = require("../model/user.model")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');



userRouter.post("/register",async(req,res)=>{
    const {userName,password} = req.body
    user = await Usermodel.find({userName})
    if(user.length !== 0){
         res.send("user already available")
    }else{
            bcrypt.hash(password, 3, function(err, hash) {
            if(err){
                res.send(err)
            }else{
              const  newUser = new Usermodel({userName,password:hash}) 
                newUser.save()
               res.send("user registerd successfully")
            }
        });
  
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {userName,password} = req.body
        user = await Usermodel.find({userName})
        
        if(user.length == 0){
            return res.send("invalid credential")
        }
        bcrypt.compare(password, user[0].password,(err,result)=>{
             if(result){
                var token = jwt.sign({ isvarified:true}, 'masai');
                res.status(201).json({message:"login successful",token})
             }else{
                res.status(500).json({message:"invalid credential"})
             }
        });
       
     
    } catch (error) {
        res.send(error)
    }
 

})







module.exports = userRouter