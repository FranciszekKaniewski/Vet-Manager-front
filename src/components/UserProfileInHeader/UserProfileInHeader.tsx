import {useContext, useState} from "react";
import {Link} from "react-router-dom";

import './UserProfileInHeader.css'
import {userIsLogged} from "../../contexts/userDataContext";
import {Fetch} from "../../utils/Fetch";

export const UserProfileInHeader = () =>{

    const [optionsOpened,setOptionsOpened]= useState(false);
    const loggedInContext = useContext(userIsLogged)

    if(loggedInContext===null) return null;

    const showOptions = () =>{
        setOptionsOpened(prevState => !prevState)
    }

    const logout = async () =>{
        await Fetch('user/logout',"POST")
        loggedInContext.change(false);
    }

    return(
        <div className="user">
            <Link to={loggedInContext.value?'/profile':'/login'}><img src="" alt="user-profile-img"/></Link>
            {loggedInContext.value ?
                <div className="user-name">
                    <h3 onClick={showOptions}>Franciszek Kaniewski</h3>
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