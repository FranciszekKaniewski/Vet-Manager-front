import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';

import {Header} from "./layouts/Header/Header";
import {MainPage} from "./views/MainPage";
import {LoginPage} from "./views/LoginPage";
import {ProfilePage} from "./views/ProfilePage";
import {SettingsPage} from "./views/SettingsPage";

import {clientUser, userDataContext} from "./contexts/userDataContext";
import {Fetch} from "./utils/Fetch";

function App() {

    const [userData, setUserData] = useState<clientUser|null>(null);

    useEffect(() => {
        (async()=>{
            const res = await Fetch('user/info')
            const data = await res.json();
            setUserData(data);
        })()
    }, []);


  return (
    <div className="App">
        <userDataContext.Provider value={{value:userData, setUser:setUserData}}>
            <Header/>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/profile' element={<ProfilePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>
        </userDataContext.Provider>
    </div>
  );
}

export default App;
