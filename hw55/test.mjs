import { writeFileAsync, readFileAsync, deleteFileAsync } from './index.mjs';

const runTests = async () => {
  console.log('--- ЗАПУСК ТЕСТІВ З ФАЙЛАМИ ---');

  const testFile = 'example.txt';

  console.log('\n--- Тест 1: Запис та читання файлу ---');
  await writeFileAsync(testFile, 'Привіт, це тестовий файл для ДЗ 55!');
  await readFileAsync(testFile);

  console.log('\n--- Тест 2: Видалення файлу ---');
  await deleteFileAsync(testFile);

  console.log('\n--- Тест 3: Спроба прочитати відсутній файл ---');
  try {
    await readFileAsync('non-existent.txt');
  } catch (error) {
    console.log('[Перехоплено очікувану помилку читання]');
  }

  console.log('\n--- Тест 4: Спроба видалити відсутній файл ---');
  try {
    await deleteFileAsync('non-existent.txt');
  } catch (error) {
    console.log('[Перехоплено очікувану помилку видалення]');
  }
};

runTests();
