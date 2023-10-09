import {useState} from "react";

import './UserProfileInHeader.css'

export const UserProfileInHeader = () =>{

    const [user,setUser]= useState(0);
    const [optionsOpened,setOptionsOpened]= useState(false);

    const showOptions = () =>{
        setOptionsOpened(prevState => !prevState)
        console.log(optionsOpened)
    }

    return(
        <div className="user">
            <img src="" alt="user-profile-img"/>
            {!user ?
                <div className="user-name">
                    <h3 onClick={showOptions}>Franciszek Kaniewski</h3>
                    {optionsOpened?<ul>
                        <li>⚙ Settings</li>
                        <li>🐾 Profile</li>
                        <li>🚪 Logout</li>
                    </ul>:null}
                </div>
                :
                <h3>Login</h3>}
        </div>
    )
}