import React, {useEffect, useRef, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Fetch} from "./utils/Fetch";

import {Header} from "./layouts/Header/Header";
import {MainPage} from "./views/MainPage";
import {LoginPage} from "./views/LoginPage";
import {ProfilePage} from "./views/ProfilePage";
import {SettingsPage} from "./views/SettingsPage";
import {MessagesWindow} from "./components/MessagesWindow/MessagesWindow";

import {clientUser, userDataContext} from "./contexts/userDataContext";
import {color, messagesContext} from './contexts/messagesContext';

import './App.css';

function App() {

    const [userData, setUserData] = useState<clientUser|null>(null);
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<string[]>([]);
    const [messageColor,setMessageColor] = useState<color>(color.gray)

    const fetched = useRef(false);
    useEffect(() => {
        if(fetched.current){
            (async () => {
                // setLoading(true);

                const res = await Fetch('user/info',"GET");

                if (!res || res.status === 500) {
                    printMessage(`You are logged out!`);
                } else if (res.status === 200) {
                    printMessage(`You are logged in!`);
                    const data = await res.json();
                    setUserData(data);
                }else{
                    const data = await res.json()
                    printMessage(data.message);
                }

                // setLoading(false);
            })()
        }
        return () => {
            fetched.current = true
        }
    }, []);

    const printMessage = (message:string,colorChange?:color) =>{
        setMessages(prevState => [message,...prevState]);
        setMessageColor(colorChange ? colorChange : color.gray);
    }

  return (
    <div className="App">
        <userDataContext.Provider value={{value:userData, setUser:setUserData, isLoading:loading, setLoading:setLoading}}>
          <messagesContext.Provider value={{value:messages,setMessages:setMessages,color:messageColor,printMessage:printMessage}}>
            <Header/>
            {!loading ?
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/profile' element={<ProfilePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>
                :
                <h1>Loading ...</h1>
            }
            <MessagesWindow />
          </messagesContext.Provider>
        </userDataContext.Provider>
    </div>
  );
}

export default App;
