import React, { useState } from "react";

const MessageSender = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (message.trim()) {
            setMessages([...messages, message]); // Добавляем сообщение в массив
            setMessage(""); // Очищаем поле ввода
        }
    };

    return (
        <div className="message-sender">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Введите ваше сообщение"
                    required
                />
                <button type="submit">Отправить</button>
            </form>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message-item">
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageSender;