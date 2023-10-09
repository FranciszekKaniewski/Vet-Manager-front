import {useState} from "react";
import {Link} from "react-router-dom";

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
            <Link to='/profile'><img src="" alt="user-profile-img"/></Link>
            {!user ?
                <div className="user-name">
                    <h3 onClick={showOptions}>Franciszek Kaniewski</h3>
                    {optionsOpened?<ul>
                        <li><Link to='/settings'>⚙ Settings</Link></li>
                        <li><Link to='/profile'>🐾 Profile</Link></li>
                        <li><Link to='/login'>🚪 Logout</Link></li>
                    </ul>:null}
                </div>
                :
                <h3>Login</h3>}
        </div>
    )
}