import {LoginForm} from "../components/LoginForm/LoginForm";
import {useContext} from "react";
import {userDataContext} from "../contexts/userDataContext";

export const LoginPage = () => {
    const loggedInContext = useContext(userDataContext)

    if(loggedInContext === null) return null;

    return (
        <>
            <h1>Login Page</h1>
            {!loggedInContext.value ? <LoginForm/> : <button>logout</button>}
        </>
    )
}