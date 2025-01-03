/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import React from "react"; 

import Chat from "./chat"; 
import styles from './chat.module.scss'
import AddChatModal from "../modal/modal";

import { fetchAuthMe } from "../../redux/slices/auth";
import { fetchChats } from "../../redux/slices/chats";
import axios from '../../axios'

const Chats = () => { 
    
    const [chats, setChats] = React.useState([]); 
    const [me, setMe] = React.useState(null)
    const [availableUsers, setAvailableUsers] = React.useState(null)
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchData = async() => {
            const data = await dispatch(fetchAuthMe())
            setMe(data.payload)
        }
        const fetchUsers = async() => {
            const usersData = await axios.get('/users')
            setAvailableUsers(usersData.data)
        }
        fetchData()
        fetchUsers()
    }, [])

    React.useEffect(() => {
        const fetchChatsData = async (userId) => {
            const data = await dispatch(fetchChats(userId))
            setChats(data.payload)
        }
        if (me) {
            fetchChatsData(me._id)
        }
    }, [me])

    const openModal = () => {
        setModalIsOpen(true);
    };
  
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return ( 
        <div className='container'> 
            <div className={styles.chatHeader}>
                <p>Чаты</p>
                <button className={styles.chatHeader__btn} onClick={openModal}>+</button>
                <AddChatModal 
                    isOpen={modalIsOpen} 
                    onClose={closeModal}
                    availableUsers={availableUsers}
                    />
            </div>
            {chats.map((chat) => ( 
                <Chat
                    key={chat._id}  
                    id={chat._id} 
                    lastMessage={chat.lastMessage}
                    chatName={chat.chatName} 
                    chatUrl={chat.chatUrl}
                    chatParticipants={chat.participants}
                /> 
            ))} 
        </div> 
    ); 
}; 

export default Chats;
