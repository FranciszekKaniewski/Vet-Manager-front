import {LoginForm} from "../components/LoginForm/LoginForm";
import {RegisterForm} from "../components/RegisterFrom/RegisterForm"
import {useContext, useState} from "react";
import {userDataContext} from "../contexts/userDataContext";

export const LoginPage = () => {
    const [button,setButton] = useState('Sing up')
    const loggedInContext = useContext(userDataContext)

    if(loggedInContext === null) return null;

    const buttonHandler = ()=>{
        button === 'Sing up' ? setButton('Log in'):setButton('Sing up');
    }

    return (
        <>
            <h1>Login Page</h1>
            {!loggedInContext.value ?
                <>
                    {button === 'Sing up' ?
                        <LoginForm/>
                        :
                        <RegisterForm/>
                    }
                    <br/>
                <button onClick={buttonHandler}>{button}</button>
                </>
                :
                <button>logout</button>}
        </>
    )
}