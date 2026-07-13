/*
 * #1
 *
 * Створіть змінні зі значеннями.
 */

// ім'я змінної: myNum, значення: 10
let d = 10;
console.log(d);
// ім'я змінної: myStr, значення: 'some string'
let text = 'Hello JS';
console.log(text);
// ім'я змінної: myBool, значення: true
let solution = true;
console.log(solution);
// ім'я змінної: myArr, значення: 1, 2, 3, 4, 5
let Arr = [1, 2, 3, 4, 5];
console.log(Arr);
// ім'я змінної: myObj, значення: first: 'First Name', last: 'Last Name'
let myObj = {
    first: 'Serhii',
    last: 'Shevchenko'
};
console.log(myObj);

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * 
 * Результат збережіть у змінній decimal2.
 */

// decimal2
let nom = 12.1456;
let decimal2 = nom.toFixed(2);
console.log(decimal2);


/*
 * #3
 *
 * Створіть змінну myBigInt і запишіть в неї число 123n (BigInt).
 * 
 * Потім збільште його на 1 та запищіть в цю ж саму змінну.
 */

// myBigInt
let myBigInt = 123n;
myBigInt += 1n;
console.log(myBigInt);  