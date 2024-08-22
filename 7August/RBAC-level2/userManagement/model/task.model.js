import mongoose  from "mongoose"


const taskSchema = new mongoose.Schema({
 "task":{type:String,require:true},
 "status":{type:String,require:true,Enum:['pending', 'completed'],default:"pending"},
 "userId":{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true}
},
{
  versionKey:false,
  timestamps:true
}) 

const TaskModel = mongoose.model("task",taskSchema)

export{TaskModel}