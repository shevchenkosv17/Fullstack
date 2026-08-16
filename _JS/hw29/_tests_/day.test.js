const weekFn = require('../day');


test('Понеділок', () => {
  expect(weekFn(1)).toBe('Понеділок');
});
test('Середа', () => {
  expect(weekFn(3)).toBe('Середа');
});
test('Неділя', () => {
  expect(weekFn(7)).toBe('Неділя');
});
test('null', () => {
  expect(weekFn(9)).toBe(null);
});
test('null', () => {
  expect(weekFn(1.5)).toBe(null);
});
test('null', () => {
  expect(weekFn('2')).toBe(null);
});