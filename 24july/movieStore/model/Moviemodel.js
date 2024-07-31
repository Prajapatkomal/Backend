const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  rating: { type: Number,required: true, min: 0, max: 10,},
  genre: { type: String,required: true,},
  releaseDate: {type: Date,required: true,},
  description: {type: String,},
});

const Moviemodel = mongoose.model("moviedata", movieSchema);

module.exports = Moviemodel;
