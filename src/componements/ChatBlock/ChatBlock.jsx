import React, { useState, useRef } from 'react';
import './ChatBlock.css';
import useAutosizeTextArea from './InputMes';
import logo from '../img/clip-svgrepo-com.svg';
import user from '../img/user-svgrepo-com.svg';
import groot from '../img/ecology-leaves-svgrepo-com.svg';
import FileUploadButton from "../FileUploadButton/FileUploadButton";

export default function ChatBlock() {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(''); // New state for file upload status
    const [isInputActive, setIsInputActive] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Привет! Я - Groot.', sender: 'Groot', timestamp: new Date().toLocaleTimeString() },
        { text: 'Здравствуй!', sender: 'Пользователь', timestamp: new Date().toLocaleTimeString() }
    ]);
    const textareaRef = useRef(null);

    useAutosizeTextArea(textareaRef, message);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setIsInputActive(true);
    };

    const handleBlur = () => {
        setIsInputActive(false);
    };

    const handleFileChange = (file) => {
        setFile(file);
        setUploadStatus('Файл загружен');
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadStatus('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() || file) {
            const newMessage = {
                text: message,
                sender: 'Пользователь',
                timestamp: new Date().toLocaleTimeString(),
                file: file ? URL.createObjectURL(file) : null
            };
            sendMessage(newMessage);
            setMessage('');
            setFile(null);
            setUploadStatus('');
        }
    };

    const sendMessage = (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return (
        <div className="chat-block">
            <div className="chat-block-information">
                {file && (
                    <div className="file-info">
                        <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                        <span>{uploadStatus}</span>
                        <button onClick={handleRemoveFile} className="remove-file-btn">Удалить файл</button>
                    </div>
                )}
            </div>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-item ${msg.sender === 'Пользователь' ? 'sent' : 'received'}`}>
                        <div className="user-info">
                            {msg.sender === 'Groot' && (
                                <img src={groot} alt="Avatar Грута" className="user-avatar" />
                            )}
                            {msg.sender === 'Пользователь' && (
                                <img src={user} alt="Аватар пользователя" className="user-avatar" />
                            )}
                            <span className={`user-name ${msg.sender === 'Пользователь' ? 'sent' : ''}`}>{msg.sender}</span>
                        </div>
                        <span>{msg.text}</span>
                        {msg.file && <a href={msg.file} download>Скачать файл</a>}
                        <small>{msg.timestamp}</small>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <FileUploadButton onFileChange={handleFileChange} onRemoveFile={handleRemoveFile} />
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Введите сообщение здесь..."
                    className="chat-message-input"
                />
                <form onSubmit={handleSubmit} className="send-form">
                    <button type="submit" className="send-button">Отправить</button>
                </form>
            </div>
        </div>
    );
}
