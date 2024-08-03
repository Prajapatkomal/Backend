const express = require("express")
const app = express()
app.use(express.static('src'))
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


app.get("/",(req,res)=>{
   res.send("get req")
})

app.post("/upload",upload.single('avatar'),(req,res)=>{
  res.send(`
    message :- file uploaded successfully,
 `
 );
})



app.listen(8000,()=>{
  console.log("server started at port 8000")
})