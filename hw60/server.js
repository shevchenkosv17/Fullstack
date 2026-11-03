import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Get root route');
});

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, async () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
  
  const testRoutes = [
    { url: 'http://localhost:3000/', method: 'GET' },
    { url: 'http://localhost:3000/users', method: 'GET' },
    { url: 'http://localhost:3000/users', method: 'POST' },
    { url: 'http://localhost:3000/users/777', method: 'GET' },
    { url: 'http://localhost:3000/users/777', method: 'PUT' },
    { url: 'http://localhost:3000/users/777', method: 'DELETE' },
    { url: 'http://localhost:3000/articles', method: 'GET' },
    { url: 'http://localhost:3000/articles', method: 'POST' },
    { url: 'http://localhost:3000/articles/999', method: 'GET' },
    { url: 'http://localhost:3000/articles/999', method: 'PUT' },
    { url: 'http://localhost:3000/articles/999', method: 'DELETE' }
  ];

  for (const route of testRoutes) {
    try {
      const response = await fetch(route.url, { method: route.method });
      const text = await response.text();
      console.log(`[${route.method}] ${route.url} -> Відповідь: ${text}`);
    } catch (error) {
      console.error(`Помилка запиту [${route.method}] ${route.url}:`, error.message);
    }
  }
});
