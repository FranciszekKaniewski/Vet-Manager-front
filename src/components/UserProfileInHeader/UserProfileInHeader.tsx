import {useState} from "react";

import './UserProfileInHeader.css'

export const UserProfileInHeader = () =>{

    const [user,setUser]= useState(0);

    return(
        <div className="user">
            <img src="" alt="user-profile-img"/>
            {!user ? <h3>Franciszek Kaniewski</h3>:<h3>Login</h3>}
        </div>
    )
}