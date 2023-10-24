import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';

import {Header} from "./layouts/Header/Header";
import {MainPage} from "./views/MainPage";
import {LoginPage} from "./views/LoginPage";
import {ProfilePage} from "./views/ProfilePage";
import {SettingsPage} from "./views/SettingsPage";

import {userIsLogged} from "./contexts/userDataContext";
import {Fetch} from "./utils/Fetch";

function App() {

    const [logged, setLogged] = useState(false);
    const [rendering,setRendering] = useState(false);

    useEffect(() => {
        setRendering(true);
        (async()=>{

            const res = await Fetch('user/is_logged')
            const data = await res.json()

            setLogged(data.isLogged);
            await setRendering(false);
        })();
    }, [logged]);


  return (
    <div className="App">
        <userIsLogged.Provider value={{value:logged, change:setLogged}}>
            <Header/>
            {!rendering?
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/profile' element={<ProfilePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>
                :
                <h1>...</h1>
            }
        </userIsLogged.Provider>
    </div>
  );
}

export default App;
