const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sto_db',
    password: '1234567a',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Помилка підключення до PostgreSQL:', err.stack);
    }
    console.log('Успішно підключено к базі даних PostgreSQL!');
    release();
});

// 1. Тестовий маршрут
app.get('/', (req, res) => {
    res.send('Сервер СТО успішно запущений і готовий до роботи!');
});

// 2. Отримати всі записи для календаря
app.get('/api/appointments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Отримати список постів (витягів/підйомників)
app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Створити новий запис в черзі
app.post('/api/appointments', async (req, res) => {
    const { post_id, client_name, car_model, start_time, end_time, color, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO appointments (post_id, client_name, car_model, start_time, end_time, color, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [post_id, client_name, car_model, start_time, end_time, color || '#3788d8', description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Оновити час або пост при перетягуванні мишкою (Drag-and-Drop)
app.put('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { post_id, start_time, end_time } = req.body;
    
    try {
        const result = await pool.query(
            'UPDATE appointments SET post_id = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *',
            [post_id, start_time, end_time, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Запис не знайдено' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Редагування даних (Імʼя, машина, колір) через контекстне меню
app.patch('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { client_name, car_model, color } = req.body;
    try {
        const result = await pool.query(
            'UPDATE appointments SET client_name = $1, car_model = $2, color = $3 WHERE id = $4 RETURNING *',
            [client_name, car_model, color, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Запис не знайдено' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Видалення запису з черги
app.delete('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
        res.json({ success: true, message: 'Запис успішно видалено' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер слухає мережу на порту ${PORT}. Доступ за посиланням: http://localhost:${PORT}`);
});
