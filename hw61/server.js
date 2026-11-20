import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { logRequests } from './middlewares/loggerMiddleware.js';
import { sessionManager } from './middlewares/sessionMiddleware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(sessionManager);

app.get('/', logRequests, (req, res) => {
  res.send('Get root route');
});

app.use('/users', logRequests, userRoutes);
app.use('/articles', logRequests, articleRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);

  const authHeaders = {
    'Authorization': 'Basic dXNlcjpwYXNz',
    'Content-Type': 'application/json'
  };

  const articleHeaders = {
    'x-user-role': 'admin',
    'Content-Type': 'application/json'
  };

  const userPayload = JSON.stringify({
    username: 'testuser',
    password: 'password123'
  });

  const testRoutes = [
    { url: 'http://localhost:3000/', method: 'GET' },
    { url: 'http://localhost:3000/users', method: 'GET', headers: authHeaders },
    { url: 'http://localhost:3000/users', method: 'POST', headers: authHeaders, body: userPayload },
    { url: 'http://localhost:3000/users/777', method: 'GET', headers: authHeaders },
    { url: 'http://localhost:3000/users/777', method: 'PUT', headers: authHeaders, body: userPayload },
    { url: 'http://localhost:3000/users/777', method: 'DELETE', headers: authHeaders },
    { url: 'http://localhost:3000/articles', method: 'GET', headers: articleHeaders },
    { url: 'http://localhost:3000/articles', method: 'POST', headers: articleHeaders },
    { url: 'http://localhost:3000/articles/999', method: 'GET', headers: articleHeaders },
    { url: 'http://localhost:3000/articles/999', method: 'PUT', headers: articleHeaders },
    { url: 'http://localhost:3000/articles/999', method: 'DELETE', headers: articleHeaders }
  ];

  for (const route of testRoutes) {
    try {
      const response = await fetch(route.url, {
        method: route.method,
        headers: route.headers,
        body: route.body
      });
      const text = await response.text();
      console.log(`[${route.method}] ${route.url} (${response.status}) -> Відповідь: ${text}`);
    } catch (error) {
      console.error(`Помилка запиту [${route.method}] ${route.url}:`, error.message);
    }
  }
});
