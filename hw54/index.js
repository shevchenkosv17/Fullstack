console.log('#53. JavaScript homework example file');

/*
 * #1
 */

const isDebugMode = () => {
  const env = process.env.NODE_ENV;
  const isDebug = env === 'development';
  
  console.log(`[Перевірка налагодження] Поточний NODE_ENV: ${env}`);
  console.log(`[Перевірка налагодження] Режим налагодження активний: ${isDebug}`);
  
  return isDebug;
};

/*
 * #2
 */

const encodeToBase64 = (...args) => {
  try {
    const combinedString = args.join(':');
    const encoded = Buffer.from(combinedString, 'utf-8').toString('base64');
    console.log(`[Кодування Base64] Успішно. Вхідні аргументи: [${args}], Результат: ${encoded}`);
    return encoded;
  } catch (error) {
    console.error(`[Кодування Base64] Помилка: ${error.message}`);
    throw error;
  }
};

const encodeToHex = (...args) => {
  try {
    const combinedString = args.join(':');
    const encoded = Buffer.from(combinedString, 'utf-8').toString('hex');
    console.log(`[Кодування Hex] Успішно. Вхідні аргументи: [${args}], Результат: ${encoded}`);
    return encoded;
  } catch (error) {
    console.error(`[Кодування Hex] Помилка: ${error.message}`);
    throw error;
  }
};

const decodeFromBase64 = (base64String) => {
  try {
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
    console.log(`[Декодування Base64] Успішно. Вхідні дані: ${base64String}, Результат: ${decoded}`);
    return decoded;
  } catch (error) {
    console.error(`[Декодування Base64] Помилка: ${error.message}`);
    throw error;
  }
};

const decodeFromHex = (hexString) => {
  try {
    const decoded = Buffer.from(hexString, 'hex').toString('utf-8');
    console.log(`[Декодування Hex] Успішно. Вхідні дані: ${hexString}, Результат: ${decoded}`);
    return decoded;
  } catch (error) {
    console.error(`[Декодування Hex] Помилка: ${error.message}`);
    throw error;
  }
};

/*
 * #3
 */

const safeDecodeFromBase64 = (base64String) => {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  
  if (!base64String || base64String.length % 4 !== 0 || !base64Regex.test(base64String)) {
    throw new Error('Invalid base64 string');
  }

  try {
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
    console.log(`[Безпечне декодування Base64] Успішно. Результат: ${decoded}`);
    return decoded;
  } catch (error) {
    throw new Error('Invalid base64 string');
  }
};

const safeDecodeFromHex = (hexString) => {
  const hexRegex = /^[0-9a-fA-F]+$/;

  if (!hexString || hexString.length % 2 !== 0 || !hexRegex.test(hexString)) {
    throw new Error('Invalid hex string');
  }

  try {
    const decoded = Buffer.from(hexString, 'hex').toString('utf-8');
    console.log(`[Безпечне декодування Hex] Успішно. Результат: ${decoded}`);
    return decoded;
  } catch (error) {
    throw new Error('Invalid hex string');
  }
};

export {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
};
