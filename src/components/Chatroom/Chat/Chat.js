import React, { useState, useEffect, useRef} from "react";
import { useSelector } from 'react-redux'
import "./Chat.css";

function Chat({chat, socket }) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [thisRoomUsers, setRoomUsers] = useState([]);

    const username = useSelector((state)=> state.auth.name);

    useEffect(() => {
        socket.on("message", (data) => {
            let temp = messages;
            temp.push({
                userId: data.userId,
                name: data.name,
                text: data.text,
                time: data.time,
            });
            setMessages([...temp]);
        });
    }, [socket,messages]);

    useEffect(() => {
        socket.on("thisRoomUsers", (data) => {
            setRoomUsers([...data]);
        });
    }, [socket,thisRoomUsers]);

    const sendData = () => {
        if (text !== "") {
            socket.emit("chat", text);
            setText("");
        }
    };
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    console.log(messages, "mess");

    return (
        <div className="room">
            <div className="chat_name">Чат: {chat}</div>
            <div className="room_users">
                Люди в этой комнате: {thisRoomUsers.join(', ')}
            </div>
            <div className="messages_holder">
                {messages.map((i) => {
                    if (i.name === username) {
                        return (
                            <div className="message mine" key={i.time}>
                                <span>{i.name}</span>
                                <p>{i.text}</p>
                                <div className="time">{new Date(i.time).toLocaleTimeString("ru-RU")}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="message yours" key={i.time}>
                                <span>{i.name}</span>
                                <p>{i.text} </p>
                                <div className="time">{new Date(i.time).toLocaleTimeString("ru-RU")}</div>
                            </div>
                        );
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="send">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendData();
                        }
                    }}/>
                <button onClick={sendData}>Отправить</button>
            </div>
        </div>
    );
}
export default Chat;
