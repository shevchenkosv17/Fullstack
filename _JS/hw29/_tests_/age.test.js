const ageClassification = require('../age.js');


test('null', () => {
  expect(ageClassification(-1)).toBe(null);
});
test('null', () => {
  expect(ageClassification(0)).toBe(null);
});
test('Дитинство', () => {
  expect(ageClassification(1)).toBe('Дитинство');
});
test('Дитинство', () => {
  expect(ageClassification(24)).toBe('Дитинство');
});
test('Молодість', () => {
  expect(ageClassification(24.01)).toBe('Молодість')
});
test('Молодість', () => {
  expect(ageClassification(44)).toBe('Молодість');
});
test('Зрілість', () => {
  expect(ageClassification(44.01)).toBe('Зрілість');
});
test('Зрілість', () => {
expect(ageClassification(65)).toBe('Зрілість');
});
test('Старість', () => {
  expect(ageClassification(65.01)).toBe('Старість');
});
test('Старість', () => {
  expect(ageClassification(75)).toBe('Старість');
});
test('Довголіття', () => {
  expect(ageClassification(75.01)).toBe('Довголіття');
});
test('Довголіття', () => {
  expect(ageClassification(90)).toBe('Довголіття');
});
test('Рекорд', () => {
  expect(ageClassification(90.01)).toBe('Рекорд');
});
test('Рекорд', () => {
  expect(ageClassification(122)).toBe('Рекорд');
});
test('null', () => {
  expect(ageClassification(122.01)).toBe(null);
});
test('null', () => {
  expect(ageClassification(150)).toBe(null);
});














// console.log('    -1 :', ageClassification(-1)) 
// console.log('     0 :', ageClassification(0)) 
// console.log('     1 :', ageClassification(1)) 
// console.log('    24 :', ageClassification(24)) 
// console.log(' 24.01 :', ageClassification(24.01)) 
// console.log('    44 :', ageClassification(44)) 
// console.log(' 44.01 :', ageClassification(44.01)) 
// console.log('    65 :', ageClassification(65)) 
// console.log('  65.1 :', ageClassification(65.1))
// console.log('    75 :', ageClassification(75)) 
// console.log(' 75.01 :', ageClassification(75.01)) 
// console.log('    90 :', ageClassification(90)) 
// console.log(' 90.01 :', ageClassification(90.01)) 
// console.log('   122 :', ageClassification(122)) 
// console.log('122.01 :', ageClassification(122.01))
// console.log('   150 :', ageClassification(150)) 
