import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import multer from 'multer'; //Импортируем multer

// Получаем имя текущего модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Middleware для парсинга JSON
app.use(express.json());

// Настройка multer для обработки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }); // Определяем переменную upload с конфигурацией multer

// Открытие базы данных SQLite
const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

// Инициализация базы данных
async function initDb() {
    const db = await dbPromise;

    // Создаем таблицы, если их нет
    await db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            text TEXT,
            timestamp TEXT,
            file TEXT
        )
    `);
}

// Инициализация базы данных
initDb().catch(console.error);

// Route для получения сообщений
app.get('/messages', async (req, res) => {
    const db = await dbPromise;
    const messages = await db.all('SELECT * FROM messages ORDER BY id DESC');

    res.json(messages);
});

// Route для отправки сообщения
app.post('/messages', async (req, res) => {
    const { user, text, file } = req.body;
    const timestamp = new Date().toLocaleTimeString();

    const db = await dbPromise;
    await db.run('INSERT INTO messages (user, text, timestamp, file) VALUES (?, ?, ?, ?)', [user, text, timestamp, file]);

    res.status(201).json({ message: 'Сообщение успешно отправлено' });
});

// Route для загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Пожалуйста, выберите файл.');
    }

    res.json({
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        path: '/uploads/' + req.file.filename
    });
});

// Route для скачивания файла
app.get('/downloads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, filename);
});

// Запуск сервера
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
