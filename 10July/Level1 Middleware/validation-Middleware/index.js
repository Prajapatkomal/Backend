const express = require("express")
const app = express()
const fs= require("fs")
app.use(express.json())

const validation = (req, res, next) => {
    const errors = [];
  
    if (typeof req.body.ID !== 'number') {
      errors.push('ID must be a number.');
    }
    if (typeof req.body.Name !== 'string') {
      errors.push('Name must be a string.');
    }
    if (typeof req.body.Rating !== 'number') {
      errors.push('Rating must be a number.');
    }
    if (typeof req.body.Description !== 'string') {
      errors.push('Description must be a string.');
    }
    if (typeof req.body.Genre !== 'string') {
      errors.push('Genre must be a string.');
    }
    if (!Array.isArray(req.body.Cast) || req.body.Cast.some(item => typeof item !== 'string')) {
      errors.push('Cast must be an array of strings.');
    }
  
    if (errors.length > 0) {
      res.status(400).json({
        message: 'Bad request. Some data is incorrect.',
        errors: errors,
      });
    } else {
      next();
    }
  };
  

app.post("/",validation,(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    data.users.push(req.body)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.status(200).send("data received")
    console.log("data added")
})



app.listen(3000,()=>{
    console.log("server started at 3000 ")
})