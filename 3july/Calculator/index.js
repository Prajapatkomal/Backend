// console.log(process.argv)
const crypto = require('crypto');

const operation = process.argv[2]
let a= Number(process.argv[3])
let b = Number(process.argv[4])


switch(operation){
  case 'sum' :  sum(a,b)
  break;
  case 'sub' :  sub(a,b)
  break;
  case 'mult' :   mult(a,b)
  break;
  case 'devide' :  devide(a,b)
  break;
  case 'sin' :  sin(a)
  break;
  case 'cos' :  cos(a)
  break;
  case 'tan' :  tan(a)
  break;

  case 'random' :  if(!a){
          console.log("Provide length for random number generation.")
  } else{randomNoGen(a)}
  break;

  default : console.log("Invalid Operation")
}



function sum(a,b){
  console.log(a+b)
}

function sub(a,b){
  console.log(a-b)
}


function mult(a,b){
  console.log(a*b)
}

function devide(a,b){
  console.log(a/b)
}


function sin(a) {
  console.log(Math.sin(a));
}

function cos(a) {
  console.log(Math.cos(a));
}

function tan(a) {
  console.log(Math.tan(a));
}





// this is for genrating random number

// Asynchronous
function randomNoGen(){
  crypto.randomBytes(a, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('binary')}`);
})
}