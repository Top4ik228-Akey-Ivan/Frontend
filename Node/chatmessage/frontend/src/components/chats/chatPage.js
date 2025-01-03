/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";  
import { useParams } from "react-router-dom";  
import React, { useState, useEffect } from "react";  
import { selectIsAuth } from "../../redux/slices/auth";  
import axios from '../../axios';
import io from 'socket.io-client';

import styles from './chat.module.scss'
import send from '../../images/icons/send.png'


const ChatPage = () => {  
    const { chatId } = useParams();  
    const isAuth = useSelector(selectIsAuth);  
    const chatsData = useSelector(state => state.chats.data) || []; 

    const me = useSelector(state => state.auth.data) || {}; 
    const [messages, setMessages] = useState([]); // Состояние для хранения сообщений
    const [messageContent, setMessageContent] = useState(''); // Состояние для хранения текста сообщения

    const curChat = chatsData && chatsData.find(chat => chat._id === chatId);  
    const friend = curChat && curChat.participants.find(participant => participant._id !== me._id); 

    const socket = io('http://localhost:5000'); // Замените на ваш URL сервера 


    // Эффект для загрузки сообщений при монтировании компонента
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/messages/${chatId}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке сообщений:", error);
            }
        };
        fetchMessages();
    }, [chatId]);
    useEffect(() => {
        // Слушаем событие получения сообщения
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Очистка при размонтировании компонента
        return () => {
            socket.off('receiveMessage');
        };
    }, []);
    // Функция для отправки сообщения
    const handleSendMessage = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!messageContent) return; // Проверяем, что поле не пустое

        try {
            const responce = await axios.post('/messages', {
                chatId,
                senderId: me._id,
                content: messageContent,
            });
            await axios.patch(`/chat/${curChat._id}`, 
                {lastMessage: responce.data._id}) //нужно id п не content

            // setMessages([...messages, response.data]); // Добавляем новое сообщение в состояние
            const message = { chatId, senderId: me, content: messageContent }; // Создаем объект сообщения
            socket.emit('sendMessage', message); // Отправляем сообщение на сервер
            setMessageContent(''); // Очищаем поле ввода
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }

    };

    return (  
        <div className={styles.chatPage}>  
            {isAuth ? (          
                <div className="container">  
                    {curChat ? ( 
                        <h1>{curChat.chatName}</h1>
                    ) : ( 
                        <p></p>
                    )}

                    {/* Список сообщений */}
                    <div className="messages">
                        {messages.map((message, index) => {
                            const senderIsMe = message.senderId._id === me._id;
                            return (
                                <div key={index} style={{textAlign: senderIsMe ? 'right': 'left'}}>
                                    <div className={styles.message}>
                                        {/* <strong>{message.senderId.fullName}: </strong> */}
                                        {senderIsMe ? 
                                        (<>                                        
                                            <span className={styles.span}>{message.content}</span>
                                        </>
                                            ) : (
                                            <div className={styles.message__box}>
                                                {friend ? (                                             
                                                    <img className='avatar__img' src={friend.avatarUrl} alt="avatar"/>
                                                ) : (
                                                    <img src='#' alt=""/>
                                                )}
                                                <span className={styles.span}>{message.content}</span>
                                            </div>) }
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Форма для отправки сообщения */}
                    <div className={styles.chatContainer}>
                        <form className={styles.form} onSubmit={handleSendMessage}>
                            <input className={styles.input}
                                type="text" 
                                value={messageContent} 
                                onChange={(e) => setMessageContent(e.target.value)} 
                                placeholder="Введите ваше сообщение..." 
                            />
                            <button className={styles.button} type="submit">
                                <img className={styles.button__img} src={send} alt="send"></img>
                            </button>
                        </form>
                    </div>
                </div>  
            ) : (  
                <p>HUI TAM PLAVAL</p>
            )}  
        </div>  
    );  
}  

export default ChatPage;
