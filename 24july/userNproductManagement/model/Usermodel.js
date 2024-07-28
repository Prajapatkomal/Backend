const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
})

const Usermodel = mongoose.model("user",userSchema)

module.exports = Usermodel