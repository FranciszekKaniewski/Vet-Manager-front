import React from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';

import {Header} from "./layouts/Header/Header";
import {MainPage} from "./views/MainPage";
import {LoginPage} from "./views/LoginPage";
import {ProfilePage} from "./views/ProfilePage";
import {SettingsPage} from "./views/SettingsPage";


function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
