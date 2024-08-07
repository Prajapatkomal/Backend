const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/netflix")

// const connection = mongoose.connect("mongodb://localhost:27017/moviedb")


module.exports = connection