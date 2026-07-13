// 1.
function sumArray(numbers) {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
const exampleArray = [1, 2, 3, 4, 5];
const sum = sumArray(exampleArray);
console.log('Сума елементів масиву:', sum);



// 2.

function doubleArrayElements(numbers) {
  return numbers.map(number => number * 2);
}
const exampleArray1 = [1, 2, 3, 4, 5];
const doubledArray = doubleArrayElements(exampleArray1);
console.log('Подвоєні елементи масиву:', doubledArray);

// 3.
class SkillsManager {
  constructor() {
    this.skills = [];
  }
  addSkill(skill) {
    if (typeof skill === 'string' && skill.trim().length >= 2) {
      this.skills.push(skill);
      return skill;
    }
    return null;
  }
  getAllSkills() {
    return this.skills;
  }
}
const skillsManager = new SkillsManager();
console.log(skillsManager.addSkill('JavaScript'));
console.log(skillsManager.addSkill('CSS'));
console.log(skillsManager.getAllSkills());



// 4.
function DateCalculator(initialDate) {
  this.date = new Date(initialDate);
  this.addDays = function (days) {
    this.date.setDate(this.date.getDate() + days);
  };
  this.subtractDays = function (days) {
    this.date.setDate(this.date.getDate() - days);
  };
  this.getResult = function () {
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const day = String(this.date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
}
const dateCalculator = new DateCalculator('2023-01-01');
dateCalculator.addDays(5);
console.log(dateCalculator.getResult());
dateCalculator.subtractDays(3);
console.log(dateCalculator.getResult()); 
