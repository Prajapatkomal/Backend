
const http = require("http")
const fs = require("fs")

 
const server = http.createServer((req,res)=>{

    console.log(req.url)
    if(req.url==="/"){
       let data =  fs.readdirSync("./","utf-8")
       console.log(data)
       res.writeHead(200,{
        'Content-Type' : 'text/html'
       })
       data.map((el)=>{
        const isDirectory = fs.statSync(`./${el}`).isDirectory();
        const icon = isDirectory ? "&#128193;" : "&#128196;";
           res.write(`<a href=${el}><li>${icon}${el}</li></a>`)
       })
        res.end()
    }else if(req.url !== "/favicon.ico"){
       const path = fs.existsSync(`.${req.url}`)   //path exist or not
       if(path){
        const isDirectory = fs.statSync(`.${req.url}`).isDirectory()
        if(isDirectory === false){       // path is directory or file          
          let data = fs.readFileSync(`.${req.url}`,"utf-8")
          res.write(data)
          res.end()
        }else{
           let data = fs.readdirSync(`.${req.url}`,"utf-8")
           res.writeHead(200,{
            "content-Type": 'text/html'
           })
           data.map((el)=>{
            const isSubDirectory = fs.statSync(`.${req.url}/${el}`).isDirectory();
            const icon = isSubDirectory ? "&#128193;" : "&#128196;";
            res.write(`<a href=${req.url}/${el}><li>${icon}${el}</li></a>`)
           })
           res.end()
        }
       }else{
           res.end("path not found")
       }
       
 
    }
})

server.listen(3100,()=>{
    console.log("Server is running at port 3100...")
})