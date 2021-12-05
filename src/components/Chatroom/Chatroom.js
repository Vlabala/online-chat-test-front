import Chat from "./Chat/Chat";
import {useParams} from "react-router-dom";
import { useSelector } from 'react-redux'

import "./Chatroom.css";
import Register from "../Register/Register";

const Chatroom = props =>  {
    const params = useParams(),
        selectedChatID = +params.id,
        authenticated = useSelector((state) => state.auth.authenticated);

    let render;
    if(authenticated){
        render = (
            <div className="ChatRoom">
                <Chat
                    chat={selectedChatID}
                    socket={props.socket}
                />
            </div>
        );
    }else{
        render = (<Register chatID={selectedChatID.toString()} socket={props.socket}/>);
    }
    return (render);
}

export default Chatroom;