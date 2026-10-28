const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Временно заменяем этот блок в server.js для проверки:
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sto_db',
    password: '1234567a', // напишите ваш пароль прямо здесь
    port: 5432,
});


// Проверка подключения к базе данных
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Ошибка подключения к PostgreSQL:', err.stack);
    }
    console.log('Успешно подключено к базе данных PostgreSQL!');
    release();
});

// Тестовый маршрут
app.get('/', (req, res) => {
    res.send('Сервер СТО успешно запущен и готов к работе!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер слушает сеть на порту ${PORT}. Доступ по ссылке: http://localhost:${PORT}`);
});
