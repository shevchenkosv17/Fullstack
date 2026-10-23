import http from 'http';
import url from 'url';
import { 
  encodeToBase64, 
  encodeToHex, 
  safeDecodeFromBase64, 
  safeDecodeFromHex 
} from './index.js';

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  const parsedUrl = url.parse(req.url, true);
  const textToEncode = parsedUrl.query.text || '';
  const textToDecode = parsedUrl.query.decodeText || '';
  const action = parsedUrl.query.action || '';

  let resultTitle = 'Очікування дій...';
  let resultValue = '';
  let errorClass = '';

  try {
    if (action === 'base64') {
      resultTitle = 'Результат кодування у Base64:';
      resultValue = encodeToBase64(textToEncode);
    } else if (action === 'hex') {
      resultTitle = 'Результат кодування у Hex:';
      resultValue = encodeToHex(textToEncode);
    } else if (action === 'decode_base64') {
      resultTitle = 'Результат безпечного декодування з Base64:';
      resultValue = safeDecodeFromBase64(textToDecode);
    } else if (action === 'decode_hex') {
      resultTitle = 'Результат безпечного декодування з Hex:';
      resultValue = safeDecodeFromHex(textToDecode);
    }
  } catch (error) {
    resultTitle = 'Помилка валідації!';
    resultValue = `❌ ${error.message}`;
    errorClass = 'color: red; font-weight: bold;';
  }

  res.end(`
    <html>
      <head>
        <title>Node.js Encoder/Decoder</title>
        <style>
          body { font-family: sans-serif; margin: 40px; background: #f9f9f9; }
          .container { max-width: 600px; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          input[type="text"] { width: 100%; padding: 10px; font-size: 16px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
          button { padding: 10px 15px; font-size: 14px; margin-right: 5px; cursor: pointer; border: none; border-radius: 4px; background: #007bff; color: white; }
          button.secondary { background: #28a745; }
          .result-box { background: #eee; padding: 15px; margin-top: 20px; border-radius: 5px; min-height: 50px; font-family: monospace; word-break: break-all; }
          hr { margin: 30px 0; border: 0; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Кодування та безпечне декодування</h1>
          
          <form method="GET" action="/">
            <label><b>Введіть текст для кодування:</b></label>
            <input type="text" name="text" value="${textToEncode}" placeholder="Наприклад: john@email.com:123" required>
            <button type="submit" name="action" value="base64">Кодувати в Base64</button>
            <button type="submit" name="action" value="hex">Кодувати в Hex</button>
          </form>

          <hr>

          <form method="GET" action="/">
            <label><b>Введіть рядок для безпечного декодування:</b></label>
            <input type="text" name="decodeText" value="${textToDecode}" placeholder="Вставте Base64 або Hex рядок" required>
            <button type="submit" name="action" value="decode_base64" class="secondary">Декодувати з Base64</button>
            <button type="submit" name="action" value="decode_hex" class="secondary">Декодувати з Hex</button>
          </form>

          <div class="result-box">
            <div style="font-size: 14px; color: #555; margin-bottom: 5px;"><b>${resultTitle}</b></div>
            <div style="${errorClass}">${resultValue}</div>
          </div>
        </div>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Сервер для ДЗ 54 запущено!`);
  console.log(`🔗 Відкрийте браузер за посиланням: http://localhost:${PORT}`);
});
