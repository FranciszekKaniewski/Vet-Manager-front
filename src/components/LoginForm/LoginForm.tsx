import {FormEvent, useContext, useState} from "react";
import {userDataContext} from "../../contexts/userDataContext";
import {Fetch} from "../../utils/Fetch";

export const LoginForm = () => {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const userData = useContext(userDataContext)

    if(userData === null) return null;

    const submitFunction = async (e:FormEvent) =>{
        e.preventDefault();

        await Fetch('user/login',"POST",JSON.stringify({email,password}))
        const res = await Fetch('user/info',"GET");
        const data = await res.json();
        userData.setUser(data);

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