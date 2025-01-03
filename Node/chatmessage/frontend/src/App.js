/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/header";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { Registration } from "./pages/registration";
import Chats from "./components/chats/chats";
import { fetchChats } from "./redux/slices/chats";
import ChatPage from "./components/chats/chatPage";
import Profile from "./pages/profile/profile";

function App() {
  const dispatch = useDispatch()
  const me = useSelector(state => state.auth.data)
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  React.useEffect(() => {
    if (me!==null) {
      dispatch(fetchChats(me._id))
    }    
  }, [me])
    return (
      <>
        <BrowserRouter>   
        <Header/>
          <Routes> 
            <Route path="/" element={isAuth ? <Navigate to="/chats"/> : <Navigate to="/login"/>} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Registration/>}/>
            <Route path="chats" element={<Chats/>}/>
            <Route path="chats/:chatId" element={<ChatPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default App;
