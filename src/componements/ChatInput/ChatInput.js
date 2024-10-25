import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <button type="submit" className="send-button">Send</button>
            <div className="input-container">
                <button className="add-button">+</button>
                <textarea
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="chat-message-input"
                />
            </div>
        </form>
    );
}