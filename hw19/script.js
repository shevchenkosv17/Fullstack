// BigInt
function sumBigIntegers(numStr1, numStr2) {
  
  return BigInt(numStr1) + BigInt(numStr2);
}

console.log(sumBigIntegers('9007199254740991', '9007199254740991')); 

// greet
function greetByName(msg, name) {
   
  var msg = 'Hi';
  var name = 'Serhii';
  var result = msg +' ' + name;
  return result;}
console.log(greetByName());


// Math
function getRandomInt(min, max) {
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 10));  
console.log(getRandomInt(40, 50));  
console.log(getRandomInt(1, 100)); 




