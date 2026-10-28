const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const http = require('http');
const { Server } = require('socket.io'); // ИСПРАВЛЕНО ТУТ (строка 5)
require('dotenv').config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);

// Настройка Socket.io для работы в локальной сети
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sto_db',
    password: '1234567a',
    port: 5432,
});

pool.connect((err) => {
    if (err) return console.error('Помилка підключення до БД:', err.stack);
    console.log('Успішно підключено до бази даних PostgreSQL!');
});

app.get('/', (req, res) => {
    res.send('Сервер СТО працює!');
});

app.get('/api/appointments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointments WHERE is_deleted = false');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/appointments', async (req, res) => {
    const { client_name, car_model, start_time, end_time, color } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO appointments (post_id, client_name, car_model, start_time, end_time, color) VALUES (1, $1, $2, $3, $4, $5) RETURNING *',
            [client_name, car_model, start_time, end_time, color || '#3788d8']
        );
        io.emit('appointments_changed'); 
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { start_time, end_time, client_name, car_model, color } = req.body;
    try {
        const result = await pool.query(
            'UPDATE appointments SET start_time = $1, end_time = $2, client_name = $3, car_model = $4, color = $5 WHERE id = $6 RETURNING *',
            [start_time, end_time, client_name, car_model, color, id]
        );
        io.emit('appointments_changed'); 
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE appointments SET is_deleted = true WHERE id = $1', [id]);
        io.emit('appointments_changed');
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

io.on('connection', (socket) => { 
    console.log('Підключився новий ПК менеджера'); 
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
