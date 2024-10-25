const {useState} = require("@types/react");
const [messages, setMessages] = useState([
    { text: 'Привет!', sender: 'Анастасия', timestamp: '10:00' },
    { text: 'Здравствуй!', sender: 'Михаил', timestamp: '10:02' }
]);
