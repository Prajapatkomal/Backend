import express from "express"
const managerRouter = express.Router()
import { TaskModel } from "../model/task.model.js"



managerRouter.get("/get/:userId",async(req,res)=>{
     const tasks = await TaskModel.find({userId:req.params.userId})
     res.json(tasks)
})

export{managerRouter}