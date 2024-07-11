

const express = require("express")
const fs = require("fs")
const server = express()
server.use(express.json())

server.get("/home",(req,res)=>{
     fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{res.send(data)
        }
     })
     console.log("got the data")
})




server.post("/home",(req,res)=>{
   let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
   console.log(req.body)
   
   if (req.body && Object.keys(req.body).length !== 0) {
      data.todos.push(req.body);
  } else {
      const reqdata = { 
          id: 2, 
          task: "Learning Coding",
          status: "false"
      };
      data.todos.push(reqdata);
  }


   fs.writeFileSync("./db.json", JSON.stringify(data))
   res.send(data)
   console.log("data added successfully" ,data)
})



server.patch("/home",(req,res)=>{
   let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
   console.log(data)
      data.todos.map((el)=>{
      if(el.id % 2 === 0){
         el.status=true
      }
      return el
   })
 
   fs.writeFileSync("./db.json",JSON.stringify(data))
   console.log("data updated  successfully",data)
   res.send(data)
})


server.delete("/home",(req,res)=>{
   let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
   data.todos = data.todos.filter((el) => el.status === false);

   fs.writeFileSync("./db.json",JSON.stringify(data))
   console.log("deletd successfully",data)
   res.send(data)
})




server.listen(3000,()=>{
   console.log("Listening on the port 3000")
})





