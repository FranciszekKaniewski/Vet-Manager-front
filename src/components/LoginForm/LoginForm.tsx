import {FormEvent, useContext, useState} from "react";
import {userIsLogged} from "../../contexts/userDataContext";

export const LoginForm = () => {

    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const loggedInContext = useContext(userIsLogged)

    if(loggedInContext === null) return null;

    const submitFunction = async (e:FormEvent) =>{
        e.preventDefault();

        const res = await fetch('http://localhost:3001/user/login', {
                method:"Post",
                mode:"cors",
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:login,password:password}),
            }
        )
        loggedInContext.change(res.status === 200);

        setLogin("");
        setPassword("");
    }

    return(
        <form className="login">
            <label>
                <p>TomwwS@gmail.com</p>
                <input onChange={(e)=>setLogin(e.target.value)} value={login} type="text" className="login"/>
            </label>
            <label>
                <p>Password123</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="login"/>
            </label>
            <br/>
            <button onClick={submitFunction}>Login</button>
        </form>
    )
}