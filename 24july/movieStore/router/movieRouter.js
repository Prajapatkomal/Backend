const express = require("express")
const movieRouter  = express.Router()
const Moviemodel = require("../model/Moviemodel")


movieRouter.get('/movies', async (req, res) => {
    try {
        let { title, rating, q, sortBy, page = 1, limit = 10 } = req.query;
        let query = {};

        if (title) query.title = new RegExp(title, 'i');
        if (rating) query.rating = rating;
        if (q) query.title = new RegExp(q, 'i');

        const movies = await Moviemodel.find(query)
                                  .sort(sortBy ? { [sortBy]: 1 } : {})
                                  .skip((page - 1) * limit)
                                  .limit(Number(limit));
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




movieRouter.get("/movies/:id",async(req,res)=>{
    const {id} = req.params
    const movie  = await Moviemodel.findById({_id:id})
    res.json({message:"movie found",movie})
    console.log(welcome)
})

movieRouter.post("/movies",async(req,res)=>{
    try {
        const movie = await new Moviemodel(req.body)
        await movie.save()
        res.json({message:"movie added",movie})
    } catch (err) {
        res.status(400).json({error:err.message})
}})

movieRouter.put("/movies/:id",async(req,res)=>{
    try {
        const {id} = req.params
    const movie = await Moviemodel.findByIdAndUpdate({_id:id},req.body)
        if(!movie){res.status(404).json({error:"movie not found"})}
        res.status(200).json({message:"movie updated"})
    }  catch (err) {
        res.status(400).json({error:err.message})
}})

movieRouter.delete("/movies/:id",async(req,res)=>{
    const {id} = req.params
    const movie = await Moviemodel.findByIdAndDelete({_id:id})
    if(!movie){res.status(404).json({message:"movie not found"})}
    res.status(200).json({message:"movie deleted"})
})

module.exports = movieRouter