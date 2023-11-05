import {Form} from "../../utils/Form";
import {FormEvent, useState} from "react";
import {Fetch} from "../../utils/Fetch";

export const RegisterForm = () =>{

    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber]= useState('');
    const [password,setPassword] = useState('');

    const submitHandler = async (e:FormEvent) =>{
        e.preventDefault()
        const obj = {name,surname,email,phoneNumber,password,role:'user'}
        const res = await Fetch('user/register',"POST",JSON.stringify(obj));
        console.log(res);
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