import express from "express"
import dotenv from "dotenv"
dotenv.config()
import {connection} from "./config/db.js"
import {userRouter} from "./router/user.router.js"
import {taskRouter} from "./router/task.router.js"
import {auth} from "./middleware/auth.middleware.js"
import {managerRouter} from "./router/manager.router.js"
import {adminRouter} from "./router/admin.router.js"
import {authorize} from "./middleware/role.middleware.js"


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000



app.use("/user",userRouter)
app.use("/task",auth, authorize(["member"]),taskRouter)
app.use("/manager",auth,authorize(['manager']),managerRouter)
app.use("/admin",auth,authorize(['admin']),adminRouter)



app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server started at port ${PORT}`)
    } catch (error) {
        console.log("error in connecting server")
    }
})