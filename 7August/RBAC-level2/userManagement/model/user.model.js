import mongoose  from "mongoose"


const userSchema = new mongoose.Schema({
 "name":{type:String,require:true},
 "email":{type:String,require:true,unique:true},
 "password":{type:String,require:true},
 "role":{type:String,Enum:["admin","manager","member"],require:true,default:'member'}
},
{
  versionKey:false,
  timestamps:true
})

const UserModel = mongoose.model("user",userSchema)

export{UserModel}