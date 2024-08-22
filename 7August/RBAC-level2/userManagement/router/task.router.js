import express from "express"
const taskRouter = express.Router()
import { TaskModel } from "../model/task.model.js"

// role - user can access this route(taskRouter)


taskRouter.get("/get",async(req,res)=>{
  const userId = req.user._id
  try {
   {
    const task = await TaskModel.find({userId:userId})
     return  res.status(200).json({task:task})
   }
     
  } catch (error) {
     res.status(500).json({ message: "Error retrieving tasks", error });
  }
})

taskRouter.post("/add",async(req,res)=>{
 
  const {task,status} = req.body   
  const userId = req.user._id
    try {
       const tasks = new TaskModel({
        task,status,userId
       })
       await tasks.save()
       res.status(200).json({ message: "task created successfully" });

    } catch (error) {
     res.status(500).json({ message: "Error creating task", error:error });
    }
  
})


taskRouter.patch("/update/:id",async(req,res)=>{
  const taskId = req.params.id
  const userId = req.user._id
  try { 
     const task = await  TaskModel.findOne({_id:taskId})
     if(!task){
      return  res.status(400).json({message:"task not found"})
     }

     if(task.userId.toString() === userId.toString()){
          await TaskModel.findByIdAndUpdate({_id:taskId},req.body)
          return  res.status(200).json({message:"task upadted successfully",task:task})
     }else{
         return res.status(400).json({message:"error in updating task, unauthorized",error:error})
     }
  } catch (error) {
     res.status(500).json({message:"error in updating task",error:error})
  }
})


taskRouter.delete("/delete/:id",async(req,res)=>{
  const taskId = req.params.id
  const userId = req.user._id
  try { 
     const task = await TaskModel.findOne({_id:taskId})
     if(!task){
      return  res.status(400).json({message:"task not found"})
     }
     if(task.userId.toString() === userId.toString()){
          await TaskModel.findByIdAndDelete({_id:taskId})
           return  res.status(200).json({message:"task Deleted successfully",task:task})
     }else{
        return res.status(500).json({message:"error in Deleting task,unauthorized",error:error})
     }  
  } catch (error) {
     res.status(500).json({message:"error in Deleting task",error:error})
  }
})



export{taskRouter}