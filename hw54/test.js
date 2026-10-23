import {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex
} from './index.js';

console.log('--- ЗАПУСК ТЕСТІВ ---');

isDebugMode();

const base64Str = encodeToBase64('john@email.com', '123', 'extraData');
const hexStr = encodeToHex('john@email.com', '123', 'extraData');

decodeFromBase64(base64Str);
decodeFromHex(hexStr);

safeDecodeFromBase64(base64Str);
safeDecodeFromHex(hexStr);

try {
  console.log('\n[Тест помилки] Передаємо невалідний Base64...');
  safeDecodeFromBase64('НеваліднийРядок!');
} catch (e) {
  console.log(`[Тест помилки] Перехоплено очікувану помилку: ${e.message}`);
}
