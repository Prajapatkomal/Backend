const express = require("express");
const morgan = require("morgan");
const fs=require("fs");
const path=require("path");
const server = express();
const port = 8080;
const accessLogStream=fs.createWriteStream(path.join(__dirname,'src/access.log'),{flags:'a'})
server.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url', { stream: accessLogStream }))

server.get("/", (req, res) => {
  res.status(200).send("Success");
});

server.get("/get-users", (req, res) => {
  res.status(200).send("Success");
});

server.post("/add-users", (req, res) => {
  res.status(201).send("Successfull added");
});

server.put("/user/:id", (req, res) => {
    res.status(201).send("Successfully updated");
  });

  server.delete("/user/:id", (req, res) => {
    res.status(201).send("Successfully deleted");
  });


server.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});