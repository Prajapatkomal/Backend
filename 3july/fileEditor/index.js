const fs = require("fs");

// console.log(process.argv)

const action =  process.argv[2]
const fileName = process.argv[3]
const newContent =  process.argv[4]


switch(action){
    case 'read' : readfile(fileName)
    break;
    case 'delete' : deletefile(fileName)
    break;
    case 'create' : createfile(fileName)
    break;
    case 'append' : appenddata(fileName,newContent)
    break;
    case 'rename' : renamefile(fileName,newContent)
    break;
    case 'list' : list(fileName)
    break;
 default : console.log("invalid action")
}





function readfile(){
    fs.readFile(fileName,"utf-8",(err,data)=>{
    if(err){
        console.log(`Error in reading file: ${err}`)
    }else{console.log(`file data :${data}`)}
})
}

function deletefile(){
    fs.unlink(fileName, (err) => {
        if (err) {
          console.log(`Error in delating file: ${err}`);
        } else {
          console.log(" file deleted");
        }
      });
}


function createfile(){
fs.writeFile(fileName, "new file here", (err) => {
  if (err) {
    console.log(`Error in creating file: ${err}`);
  } else {
    console.log("new file created");
  }
})
}

// here we replaced position of newContent and fileName in parameter 
// because we are passing content as fileName and fileName as content
// in argument, by replacing  them here we get actual fileName and content
 
function appenddata(newContent,fileName){
  fs.appendFile(fileName, `\n${newContent}`, (err) => {
      if (err) {
          console.log(`Error in appending file: ${err}`);
      } else {
          console.log(`Content appended to the file '${fileName}'`);
      }
  });
}

function renamefile(fileName,newFileName){
    fs.rename(fileName, newFileName, (err) => {
        if (err) {
          console.log(`Error renaming file: ${err}`);
        } else {
          console.log("file is renamed");
        }
      });
}


function list(){
    fs.readdir(".",(err,files) => {
        if (err) {
          console.log(`Error listing files: ${err}`);
        } else {
          console.log(`file list : ${files}`);
        }
      });
}

