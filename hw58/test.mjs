import { randomBytes } from 'crypto';
import { generateHash, generatePasswordHash, verifyPassword } from './main.mjs';

console.log('--- ЗАПУСК КРИПТОГРАФІЧНИХ ТЕСТІВ ---');

console.log('\n--- Тест 1: Генерація звичайного SHA-256 хешу ---');
const textHash = generateHash('Hello, World!');
console.log(`Хеш для рядка "Hello, World!": ${textHash}`);

console.log('\n--- Тест 2: Генерація безпечного хешу паролю (PBKDF2) ---');
const password = 'superSecret123';
const salt = randomBytes(16).toString('hex');
const storedHash = generatePasswordHash(password, salt);
console.log(`Згенерований хеш паролю: ${storedHash}`);

console.log('\n--- Тест 3: Перевірка паролів (Валідація) ---');
const isCorrect = verifyPassword(password, storedHash, salt);
console.log(`Спроба 1 (Ввіли правильний пароль): ${isCorrect ? 'Пароль вірний. (Успішно)' : 'Пароль невірний.'}`);

const isIncorrect = verifyPassword('wrongPassword123', storedHash, salt);
console.log(`Спроба 2 (Ввели невірний пароль): ${isIncorrect ? 'Пароль вірний.' : 'Пароль невірний. (Успішно відхилено)'}`);
