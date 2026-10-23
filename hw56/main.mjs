console.log('#55. JavaScript homework example file');

/*
 * #1
 */

const asyncOperationDemo = (callback) => {
  console.log('Перший виклик');

  process.nextTick(() => {
    console.log('Виконано nextTick');
    if (typeof callback === 'function') {
      callback('nextTick');
    }
  });

  setImmediate(() => {
    console.log('Виконано setImmediate');
    if (typeof callback === 'function') {
      callback('setImmediate');
    }
  });

  setTimeout(() => {
    console.log('Виконано setTimeout');
    if (typeof callback === 'function') {
      callback('setTimeout');
    }
  }, 0);

  console.log('Останній виклик');
};

asyncOperationDemo((operation) => {
  console.log(`Завершено виконання: ${operation}`);
});

export { asyncOperationDemo };
