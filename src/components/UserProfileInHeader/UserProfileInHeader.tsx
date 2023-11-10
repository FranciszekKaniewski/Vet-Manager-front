import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Fetch} from "../../utils/Fetch";

import {userDataContext} from "../../contexts/userDataContext";
import {color, messagesContext} from "../../contexts/messagesContext";

import './UserProfileInHeader.css'

export const UserProfileInHeader = () =>{

    const [optionsOpened,setOptionsOpened]= useState(false);
    const userData = useContext(userDataContext);
    const messages = useContext(messagesContext);

    const showOptions = () =>{
        setOptionsOpened(prevState => !prevState)
    }

    const logout = async () =>{
        userData?.setLoading(true);

        const res = await Fetch('user/logout',"POST")

        if(!res||res.status===500){
            messages?.printMessage(`Something gone wrong, try again latter 😓`,color.red);
        }else if(res.status===200){
            messages?.printMessage(`Logged out!`,color.green);
            userData?.setUser(null);
        }else{
            messages?.printMessage(`Something gone wrong, try again latter 😓`,color.red);
        }

        userData?.setLoading(false);
    }

    if(userData?.isLoading) return <h1>Loading ...</h1>

    return(
        <div className="user">
            <Link to={userData?.value?'/profile':'/login'}><img src="" alt="user-profile-img"/></Link>
            {userData?.value ?
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