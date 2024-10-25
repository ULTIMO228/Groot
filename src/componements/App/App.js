import React from 'react';
import './App.css';
import NavPanel from "../Nav-panel/NavPanel";
import ChatBlock from "../ChatBlock/ChatBlock";

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