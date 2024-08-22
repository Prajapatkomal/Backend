import express from "express"
const adminRouter = express.Router()
import {UserModel } from "../model/user.model.js"
import { TaskModel } from "../model/task.model.js"



adminRouter.get("/task",async(req,res)=>{
    const tasks = await TaskModel.find()
    console.log(tasks)
    res.json({
        totalTask :tasks.length,
        completedTask : tasks.filter(task=>task.status==="completed").length,
        averageTask :tasks.filter(task=>task.status==="completed").length /tasks.length || 0
    })
})

adminRouter.put("/user/:id/disable",async(req,res)=>{
 const user = await UserModel.find({_id:req.params.id}) 
 if(user){
  user.isActive = false
  res.json({ message: 'User disabled', user });
 }else{
    res.status(404).json({ message: 'User not found' });
 }
})


adminRouter.put("/user/:id/enable",async(req,res)=>{
 const user = await UserModel.find({_id:req.params.id})
 if(user){
    user.isActive = true
    res.json({message:"user enabled",user})
 }else{
    res.status(404).json({message:'User not found'})
 }
})


export{adminRouter}