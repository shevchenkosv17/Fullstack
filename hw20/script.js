// 1.
let firstName = 'Serhii';
let lastName = 'Shevchenko';
let age = 32;
const userObj = { firstName, lastName, age }
console.log(userObj)
// 2.
firstName = 'Serhii';
lastName = 'Shevchenko';
var fullName = firstName + ' ' + lastName;
console.log(fullName);
// 3.
function defUpperStr(str) {
  return (str || 'Default text').toUpperCase();
}
let mytext = 'my text';
console.log(defUpperStr(mytext));
console.log(defUpperStr());
// 4.
function evenFn(n) {
  let result = [];
  for (let i = 0; i <= n; i++) {
    if (i % 2 === 0 && i !== 0) {
      result.push(i);
    }
  }
  return result;
}
console.log(evenFn(10));
console.log(evenFn(15));
console.log(evenFn(20));
// 5.
function weekFn(n) {
  let result;
  switch (n) {
    case 1:
      result = "Понеділок";
      break;
    case 2:
      result = "Вівторок";
      break;
    case 3:
      result = "Середа";
      break;
    case 4:
      result = "Четвер";
      break;
    case 5:
      result = "П\'ятниця";
      break;
    case 6:
      result = "Субота";
      break;
    case 7:
      result = "Неділя";
      break;

    default:
      result = null;
  }
  return result;
}
console.log(weekFn(4));
console.log(weekFn(1.5));
console.log(weekFn('2'));
// 6.
function ageClassification(n) {
  return n <= 0 ? null :
    n <= 24 ? 'Дитинство' :
      n <= 44 ? 'Молодість' :
        n <= 65 ? 'Зрілість' :
          n <= 75 ? 'Старість' :
            n <= 90 ? 'Довголіття' :
              n <= 122 ? 'Рекорд' : null;
}
console.log('    -1 :', ageClassification(-1))
console.log('     0 :', ageClassification(0))
console.log('     1 :', ageClassification(1))
console.log('    24 :', ageClassification(24))
console.log(' 24.01 :', ageClassification(24.01))
console.log('    44 :', ageClassification(44))
console.log(' 44.01 :', ageClassification(44.01))
console.log('    65 :', ageClassification(65))
console.log('  65.1 :', ageClassification(65.1))
console.log('    75 :', ageClassification(75))
console.log(' 75.01 :', ageClassification(75.01))
console.log('    90 :', ageClassification(90))
console.log(' 90.01 :', ageClassification(90.01))
console.log('   122 :', ageClassification(122))
console.log('122.01 :', ageClassification(122.01))
console.log('   150 :', ageClassification(150))
// 7.
function oddFn(n) {
  let result = [];
  let i = 1;
  while (i <= n) {
    result.push(i);
    i += 2;
  }
  return result;
}
console.log(oddFn(10));
console.log(oddFn(15));
console.log(oddFn(20));
// 8.
function mainFunc(a, b, cb) {
  if (typeof cb !== 'function') {
    return false;
  }
  return cb(a, b);
}
function cbRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cbPow(num, pow) {
  return Math.pow(num, pow);
}
function cbAdd(a, b) {
  return a + b;
}
console.log(mainFunc(2, 5, cbRandom));
console.log(mainFunc(10, 30, cbRandom));
console.log(mainFunc(2, 5, cbPow));
console.log(mainFunc(2, 5, cbAdd));
console.log(mainFunc(2, 5, 'not a func'));
