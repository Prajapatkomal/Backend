const express = require("express")
const app = express()
const connection = require("./config/db")
const movieRouter = require("./router/movie.router")
const userRouter = require("./router/user.router")
app.use(express.json())


app.use("/",movieRouter)
app.use("/",userRouter)

app.listen(8080,async()=>{
    try {
       await connection 
    } catch (error) {
        console.log(error)
    }
    console.log('server started at port 8080')
})