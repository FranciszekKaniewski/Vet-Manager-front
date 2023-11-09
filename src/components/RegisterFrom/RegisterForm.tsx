import {Form} from "../Form/Form";
import {FormEvent, useContext, useState} from "react";
import {Fetch} from "../../utils/Fetch";
import {color, messagesContext} from "../../contexts/messagesContext";

export const RegisterForm = () =>{

    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber]= useState('');
    const [password,setPassword] = useState('');

    const messages = useContext(messagesContext)

    const submitHandler = async (e:FormEvent) =>{
        e.preventDefault()

        const obj = {name,surname,email,phoneNumber,password,role:'user'}
        const res = await Fetch('user/register',"POST",JSON.stringify(obj));

        if(!res || res.status === 500){
            messages?.printMessage(`Something gone wrong, try again latter 😓`,color.red);
        }else if(res.status === 200){
            messages?.printMessage("Legged in!",color.green)
        }else{
            const data = (await res.json());
            messages?.printMessage(`${data.message}`,color.red);
        }
    }


    return(
        <Form
            onSubmitFn={submitHandler}
            array={[
                {name:'Name',type:'text',value:name,changer:setName,required:true},
                {name:'Surname',type:'text',value:surname,changer:setSurname,required:true},
                {name:'E-mail',type:'text',value:email,changer:setEmail,required:true},
                {name:'Phone number',type:'tel',value:phoneNumber,changer:setPhoneNumber, pattern:"[0-9]{9}"},
                {name:'Password',type:'password',value:password,changer:setPassword,required:true},
            ]}
            button={'Sing up'}
        />
    )
}