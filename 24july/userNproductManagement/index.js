

const express = require("express")
const app = express()
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const connection = require("./config/db")
app.use(express.json())

app.use("/user",userRouter)
app.use("/product",productRouter)

app.listen(3000,async()=>{
    try {
      await connection
      console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("server started at port 3000")
})