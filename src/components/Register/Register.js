import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

import {useDispatch} from "react-redux";
import * as actions from '../../store/actions/index';

function Register({ socket,chatID }) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState((chatID===undefined ? "" : chatID));

    const dispatch = useDispatch();

    //Регистрирует имя в state
    const registerName = (name) => {
        dispatch(actions.auth(name));
    };

    //Вызывает функции сохранения имени в state и на бэке
    const sendData = () => {
        if (name !== "" && room !== "") {
            registerName(name);
            socket.emit("joinRoom", { name, room });
        } else {
            alert("Выберите себе псведоним и укажите название комнаты");
            window.location.reload();
        }
    };

    return (
        <div className="Register">
            <label htmlFor="name">Псевдоним</label>
            <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="room">Чат</label>
            <input
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}/>
            <Link to={`/chatroom/${room}`}>
                <button onClick={sendData}>Начать общение</button>
            </Link>
        </div>
    );
}


export default Register;