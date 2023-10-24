import {LoginForm} from "../components/LoginForm/LoginForm";
import {useContext} from "react";
import {userIsLogged} from "../contexts/userDataContext";

export const LoginPage = () => {
    const loggedInContext = useContext(userIsLogged)

    if(loggedInContext === null) return null;

    return (
        <>
            <h1>Login Page</h1>
            {!loggedInContext.value ? <LoginForm/> : <button>logout</button>}
        </>
    )
}