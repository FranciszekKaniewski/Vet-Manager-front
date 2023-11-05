import {FormEvent, useContext, useState} from "react";
import {userDataContext} from "../../contexts/userDataContext";
import {Fetch} from "../../utils/Fetch";
import {Form} from "../../utils/Form";

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
        <>
        <Form
            onSubmitFn={submitFunction}
            array={[
                {name:'Login',type:'text',value:email,changer:setEmail},
                {name:'Password',type:'password',value:password,changer:setPassword},
            ]}
            button={'Log in'}
        />
        </>
    )
}