import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename: './database.db', // Имя файла базы данных
    driver: sqlite3.Database // Драйвер SQLite
});

// Пример функции для получения всех сообщений
export const getMessages = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM messages'); // Замените на вашу логику
};

// Пример функции для добавления нового сообщения
export const addMessage = async (user, text) => {
    const db = await dbPromise;
    await db.run('INSERT INTO messages (user, text) VALUES (?, ?)', [user, text]);
};
