import {FormEvent, useContext, useState} from "react";
import {Fetch} from "../../utils/Fetch";
import {Form} from "../Form/Form";

import {userDataContext} from "../../contexts/userDataContext";
import {color, messagesContext} from "../../contexts/messagesContext";

export const LoginForm = () => {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const userData = useContext(userDataContext);
    const messages = useContext(messagesContext);


    const submitFunction = async (e:FormEvent) =>{
        e.preventDefault();

        const res = await Fetch('user/login',"POST",JSON.stringify({email,password}))

        if(!res || res.status === 500){
            messages?.printMessage(`Something gone wrong, try again latter 😓`,color.red);
        }else if(res.status === 200){
            const res = await Fetch('user/info',"GET");

            if(!res || res.status===500){
                messages?.printMessage(`Something gone wrong, try again latter 😓`,color.red);
            }else if(res.status===200){
                const data = await res.json();
                userData?.setUser(data);
                messages?.printMessage("Legged in!",color.green);

                setEmail("");
                setPassword("");
            }else{
                const data = await res.json();
                messages?.printMessage(data.message,color.red);
            }
        }else{
            const data = await res.json();
            messages?.printMessage(`${data.message}`,color.red);
        }
    }

    return(
        <>
        <Form
            onSubmitFn={submitFunction}
            array={[
                {name:'E-mail',type:'text',value:email,changer:setEmail},
                {name:'Password',type:'password',value:password,changer:setPassword},
            ]}
            button={'Log in'}
        />
        </>
    )
}