const express = require("express")
const userRouter = express.Router()
const Usermodel = require("../model/Usermodel")



userRouter.get("/get-user",async(req,res)=>{
    try {
        const users = await Usermodel.find()
        console.log("welcome")
        res.status(200).send(users) 
    } catch (error) {
        res.status(404).send({"error":"something went wrong"})
        console.log(error)
    }
})

userRouter.post("/add-user",async(req,res)=>{
  try {
    const { name, age,city } = req.body;
    const user = await Usermodel.findOne({name,age,city})
   if(user){
     res.send("user already exist")
   }else{
    const newuser = await new Usermodel(req.body)
    await newuser.save()
     res.status(201).send("user has been created")
   }
  
  } catch (error) {
    res.status(404).send({"error":"something went wrong"})
    console.log(error)
  }
})

userRouter.patch("/update-user/:id",async(req,res)=>{
    const {id} = req.params
    try {
      await Usermodel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send("user updated successfully")
    } catch (error) {
        res.status(404).send({"error":"something went wrong"})
        console.log(error)
    }
})

userRouter.delete("/delete-user/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await Usermodel.findByIdAndDelete({_id:id})
        res.status(200).send(`user with user ID ${id} has been deleted from database`)
    } catch (error) {
        res.status(404).send({"error":"something went wrong"})
        console.log(error)
    }
})


module.exports = userRouter