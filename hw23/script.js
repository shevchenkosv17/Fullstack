// 1.
class CalorieCalculator {
  constructor() {
    this.products = new Map();
  }
  addProduct(productName, calories) {
    this.products.set(productName, calories);
  }
  getProductCalories(productName) {
    if (this.products.has(productName)) {
      return this.products.get(productName);
    }
    return 'Product not found';
  }
  removeProduct(productName) {
    this.products.delete(productName);
  }
}
const calorieCalculator = new CalorieCalculator();
calorieCalculator.addProduct('Apple', 52);
calorieCalculator.addProduct('Banana', 89);
console.log(calorieCalculator.getProductCalories('Apple'));
console.log(calorieCalculator.getProductCalories('Banana'));
calorieCalculator.removeProduct('Apple');
console.log(calorieCalculator.getProductCalories('Apple'));




// 2.

class UniqueUsernames {
  constructor() {
    this.usernames = new Set();
  }
  addUser(username) {
    this.usernames.add(username);
  }
  exists(username) {
    return this.usernames.has(username);
  }
  count() {
    return this.usernames.size;
  }
}
const uniqueUsernames = new UniqueUsernames();
uniqueUsernames.addUser('john_doe');
uniqueUsernames.addUser('jane_doe');
uniqueUsernames.addUser('john_doe'); 
console.log(`Існує 'john_doe': ${uniqueUsernames.exists('john_doe')}`);
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`); 
