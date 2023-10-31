import {useContext, useState} from "react";
import {Link} from "react-router-dom";

import './UserProfileInHeader.css'
import {userDataContext} from "../../contexts/userDataContext";
import {Fetch} from "../../utils/Fetch";

export const UserProfileInHeader = () =>{

    const [optionsOpened,setOptionsOpened]= useState(false);
    const userData = useContext(userDataContext)

    if(userData===null) return null;

    const showOptions = () =>{
        setOptionsOpened(prevState => !prevState)
    }

    const logout = async () =>{
        await Fetch('user/logout',"POST")
        userData.setUser(null);
    }

    return(
        <div className="user">
            <Link to={userData.value?'/profile':'/login'}><img src="" alt="user-profile-img"/></Link>
            {userData.value ?
                <div className="user-name">
                    <h3 onClick={showOptions}>{userData.value.name} {userData.value.surname}</h3>
                    {optionsOpened?<ul>
                        <li><Link to='/settings'>⚙ Settings</Link></li>
                        <li><Link to='/profile'>🐾 Profile</Link></li>
                        <li onClick={logout}>🚪 Logout</li>
                    </ul>:null}
                </div>
                :
                <div className="user-name"><Link to={"/login"}><h3>Login</h3></Link></div>
            }
        </div>
    )
}