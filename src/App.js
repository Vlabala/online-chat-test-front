import './App.css';
import io from "socket.io-client";
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/Register/Register";
import Chatroom from "./components/Chatroom/Chatroom";

const socket = io.connect('/');

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Register socket={socket}/>}/>
                <Route path="/chatroom/:id" element={<Chatroom socket={socket}/>}/>
                <Route path="/*" element={<Navigate replace to="/"/>}/>
            </Routes>
        </div>
    );
}

export default App;
