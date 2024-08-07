const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    "title" :{type:String,required:true},
    "rating" :{type:Number,required:true},
    "genre" :{type:String,required:true},
    "releaseDate" :{type:String,required:true},
    "description" :{type:String,required:true}
})

const Moviemodel = mongoose.model("movie",movieSchema)

module.exports = Moviemodel