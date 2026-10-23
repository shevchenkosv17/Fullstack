import http from 'http';
import { writeFileAsync, readFileAsync, deleteFileAsync } from './index.mjs';

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  const htmlInterface = `
    <html>
      <head>
        <title>Node.js File System</title>
        <style>
          body { font-family: sans-serif; margin: 40px; }
          button { padding: 10px 20px; font-size: 16px; margin-right: 10px; cursor: pointer; }
          .log { background: #eee; padding: 15px; margin-top: 20px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Керування файлами через браузер</h1>
        <a href="/write"><button>1. Записати файл</button></a>
        <a href="/read"><button>2. Прочитати файл</button></a>
        <a href="/delete"><button>3. Видалити файл</button></a>
        <a href="/"><button style="background: #ddd;">Очистити</button></a>
  `;

  try {
    if (req.url === '/write') {
      await writeFileAsync('browser-file.txt', 'Цей файл було створено через запит з браузера!');
      res.end(`${htmlInterface}<div class="log">🟢 <b>Статус:</b> Файл успішно записано! (Перевірте папку проекту)</div></body></html>`);
    } 
    
    else if (req.url === '/read') {
      const content = await readFileAsync('browser-file.txt');
      res.end(`${htmlInterface}<div class="log">🔵 <b>Вміст файлу:</b> ${content}</div></body></html>`);
    } 
    
    else if (req.url === '/delete') {
      await deleteFileAsync('browser-file.txt');
      res.end(`${htmlInterface}<div class="log">🔴 <b>Статус:</b> Файл успішно видалено!</div></body></html>`);
    } 
    
    else {
      res.end(`${htmlInterface}<div class="log">Очікування дій... Натисніть кнопку вище.</div></body></html>`);
    }
  } catch (error) {
    let userFriendlyError = 'Помилка при роботі з файлом.';
    if (error.code === 'ENOENT') {
      userFriendlyError = '❌ <b>Помилка:</b> Файл не існує! Спочатку запишіть його.';
    }
    res.end(`${htmlInterface}<div class="log" style="color: red;">${userFriendlyError}</div></body></html>`);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущено! Відкрийте браузер за посиланням: http://localhost:${PORT}`);
});
