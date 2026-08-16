// #1

interface PersonInterface {
  name: string;
  age: number;
  isActive: boolean;
}

function createPerson(name: string, age: number, isActive: boolean): PersonInterface {
  return {
    name,
    age,
    isActive
  };
}

const newPerson = createPerson('Олександр', 31, false);
console.log(newPerson);



// #2
function LogMethodCalls(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: any[]) {
    console.log(`Calling "${propertyName}" with arguments: ${args.join(', ')}`);
    return originalMethod.apply(this, args);
  };

  return propertyDescriptor;
}

class Calculator {
  @LogMethodCalls
  add(a: number, b: number): number {
    return a + b;
  }

  @LogMethodCalls
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calculator = new Calculator();
console.log(calculator.add(2, 3));
console.log(calculator.multiply(3, 4));

// #3
namespace UserProfile {
  export interface ProfileInterface {
    id: string;
    name: string;
    email: string;
  }

  function generateId(): string {
    return Math.random().toString(36).substring(2, 13);
  }

  export function createProfile(name: string, email: string): ProfileInterface {
    return {
      id: generateId(),
      name,
      email
    };
  }
}

const profile = UserProfile.createProfile('John Doe', 'john@example.com');
console.log(profile);
