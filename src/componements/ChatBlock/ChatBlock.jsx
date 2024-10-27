import React, { useState, useRef, useEffect } from 'react';
import './ChatBlock.css';
import useAutosizeTextArea from './InputMes';
import user from '../img/user-svgrepo-com.svg';
import groot from '../img/ecology-leaves-svgrepo-com.svg';
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import downloadIcon from '../img/file-zipper-svgrepo-com (1).svg';
import axios from 'axios';

export default function ChatBlock() {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [messages, setMessages] = useState([]);
    const textareaRef = useRef(null);

    useAutosizeTextArea(textareaRef, message);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get('http://192.168.169.1:8000/messages');
            setMessages(response.data);
        };

        fetchMessages();
    }, []); // Загружаем сообщения при первом рендере

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (file) => {
        setFile(file);
        setUploadStatus('Файл загружен');
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadStatus('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() || file) {
            // Сохраняем файлы на сервере
            let fileData = null;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const uploadResponse = await axios.post('http://192.168.169.1:8000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                fileData = uploadResponse.data.filename;
            }

            const newMessage = {
                user: 'Пользователь',
                text: message,
                file: fileData,
                timestamp: new Date().toLocaleTimeString(),
            };

            await axios.post('http://192.168.169.1:8000/messages', newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
            setFile(null);
            setUploadStatus('');
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-block">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-item ${msg.user === 'Пользователь' ? 'sent' : 'received'}`}>
                        <div className="user-info">
                            {msg.user === 'Грут' && (
                                <img src={groot} alt="Avatar Грута" className="user-avatar" />
                            )}
                            {msg.user === 'Пользователь' && (
                                <img src={user} alt="Аватар пользователя" className="user-avatar" />
                            )}
                            <span className={`user-name ${msg.user === 'Пользователь' ? 'sent' : ''}`}>{msg.user}</span>
                        </div>
                        <span>{msg.text}</span>
                        {msg.file && (
                            <div className="file-info">
                                <img src={downloadIcon} alt="Скачать" className="file-icon" />
                                <span className="file-name">{msg.file}</span>
                                <a href={`http://192.168.169.1:8000/uploads/${msg.file}`} download className="download-link">Скачать</a>
                            </div>
                        )}
                        <small>{msg.timestamp}</small>
                    </div>
                ))}
            </div>
            {file && (
                <div className="file-info">
                    <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                    <span>{uploadStatus}</span>
                    <button onClick={handleRemoveFile} className="remove-file-btn">Удалить файл</button>
                </div>
            )}
            <div className="chat-input-container">
                <FileUploadButton onFileChange={handleFileChange} onRemoveFile={handleRemoveFile} />
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Введите сообщение здесь..."
                    className="chat-message-input"
                    onKeyDown={handleEnterPress}
                />
                <form onSubmit={handleSubmit} className="send-form">
                    <button type="submit" className="send-button">Отправить</button>
                </form>
            </div>
        </div>
    );
}
