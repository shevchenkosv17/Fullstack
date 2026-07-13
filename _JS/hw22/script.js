// 1.
const counter = (function () {
  let count = 0;
  return function (n) {
    if (n !== undefined) {
      count = n;
    }
    return count++;
  };
})();


console.log(counter())    
console.log(counter())    
console.log(counter(100)) 
console.log(counter())  
console.log(counter())   
console.log(counter(500))
console.log(counter())   
console.log(counter())  
console.log(counter(0))   
console.log(counter())    
console.log(counter())    



// 2.

const counterFactory = (function () {
  let count = 0; 
  return {
       value(n) {
      if (n !== undefined) {
        count = n;
      }
      return count;
    },
    increment() {
      count++;
    },
    decrement() {
      count--;
    }
  };
})();

console.log(counterFactory.value()) 
counterFactory.increment()
counterFactory.increment()
counterFactory.increment()
console.log(counterFactory.value()) 
counterFactory.decrement()
counterFactory.decrement()
console.log(counterFactory.value()) 
console.log(counterFactory.value(100)) 
counterFactory.decrement()
console.log(counterFactory.value())
console.log(counterFactory.value(200)) 
console.log(counterFactory.value()) 


// 3.

const myPrint = (a, b, res) => {
  return `${a}^${b}=${res}`;
};
const myPow = (a, b, callback) => {
    const calcPow = (base, exp) => {
    if (exp === 0) return 1; 
    if (exp < 0) {
      return 1 / calcPow(base, -exp);
    }
    return base * calcPow(base, exp - 1);
  };
  const result = calcPow(a, b);
  return callback(a, b, result);
};

console.log(myPow(3, 4, myPrint)); 
console.log(myPow(2, 3, myPrint));  
console.log(myPow(2, 0, myPrint));   
console.log(myPow(2, -2, myPrint)); 


// 4.
const list = [12, 23, 100, 34, 56, 9, 233];
const myMax = (arr) => { 
  return Math.max.apply(null, arr);
};

console.log(myMax(list)); 

// 5.

const myMul = (a, b) => {
  return a * b;
};
const myDouble = myMul.bind(null, 2);


console.log(myDouble(3)); 
console.log(myDouble(4)); 
console.log(myDouble(5)); 
const myTriple = myMul.bind(null, 3);
console.log(myTriple(3)); 
console.log(myTriple(4)); 
console.log(myTriple(5)); 

