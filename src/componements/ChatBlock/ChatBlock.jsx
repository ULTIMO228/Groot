import React, { useState, useRef } from 'react';
import './ChatBlock.css'
import useAutosizeTextArea from  './InputMes'
import logo from '../img/clip-svgrepo-com.svg'
import FileUploadButton from "../FileUploadButton/FileUploadButton";
// Импортируем пользовательский хук

export default function ChatBlock() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    useAutosizeTextArea(textareaRef, message); // Добавляем эту строку

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Сообщение отправлено:', message);
            setMessage('');
        }
    };

    return (
        <div className="chat-block">
            <div className="chat-input-container">
                    <FileUploadButton />
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Введите сообщение здесь..."
                    className="chat-message-input"
                />
                <form onSubmit={handleSubmit} className="send-form">
                    <button type="submit" className="send-button">send</button>
                </form>
            </div>
        </div>
    );
}