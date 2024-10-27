import React from 'react';
import './App.css';
import NavPanel from "../Nav-panel/NavPanel.js";
import ChatBlock from "../ChatBlock/ChatBlock.jsx";

function App() {
    return (
        <div className="App">
            <NavPanel />
            <div className="center-container">
                <ChatBlock />
            </div>
        </div>
    );
}

export default App;