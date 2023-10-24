import {FormEvent, useContext, useState} from "react";
import {userIsLogged} from "../../contexts/userDataContext";
import {Fetch} from "../../utils/Fetch";

export const LoginForm = () => {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const loggedInContext = useContext(userIsLogged)

    if(loggedInContext === null) return null;

    const submitFunction = async (e:FormEvent) =>{
        e.preventDefault();

        const res = await Fetch('user/login',"POST",JSON.stringify({email,password}))
        loggedInContext.change((await res).status === 200);

        setEmail("");
        setPassword("");
    }

    return(
        <form className="login">
            <label>
                <p>TomwwS@gmail.com</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="login"/>
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