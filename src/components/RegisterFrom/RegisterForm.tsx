import {Form} from "../../utils/Form";
import {useState} from "react";

export const RegisterForm = () =>{

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [phoneNumber,setPhoneNumber]= useState('');
    const [password,setPassword] = useState('');


    return(
        <Form
            onSubmitFn={()=>console.log(email)}
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