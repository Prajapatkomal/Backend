const express = require("express")
const app = express()
const connection = require("./config/db")
const movieRouter = require("./router/movieRouter")
app.use(express.json())


app.use("/",movieRouter)

app.listen(8080,async()=>{
    try {
       await connection 
    } catch (error) {
        console.log(error)
    }
    console.log('server started at port 8080')
})