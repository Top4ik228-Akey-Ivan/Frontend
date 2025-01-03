// import chatImg from '../../images/IMG_20231021_134804.jpg'
import styles from './chat.module.scss'

import { Navigate } from 'react-router-dom';
import React from 'react';


const Chat = ({chatName, id, lastMessage, chatUrl, chatParticipants}) => {

    const [redirectTo, setRedirectTo] = React.useState(null);

    const handleClick = (chatId) => { 

        setRedirectTo(chatId)
    }; 

    if (redirectTo !== null) { 
        return <Navigate to={`/chats/${redirectTo}`} />; 
    } 

    return (
        <div className={styles.chat} onClick={() => handleClick(id)}>
            <img className={styles.chatImg} src={chatUrl} alt="" />
            <div>
                <h4>{chatName}</h4>
                <p>{
                    chatParticipants.find((item) =>  item._id === lastMessage.senderId).fullName
                }: {
                    lastMessage ? lastMessage.content : ''}</p>
            </div>
        </div>
    );
}
 
export default Chat;