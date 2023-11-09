import {useContext, useEffect} from "react";
import {messagesContext} from "../../contexts/messagesContext";

import './pop-up.css'

export const PopUp = ({message}:{message:string}) =>{

    const messages = useContext(messagesContext);

    useEffect(()=>{
        setTimeout(()=> {
            remove();
        },3000)
    },[])

    const remove = () =>{
        if(message) messages?.setMessages(prevState => prevState.slice(1));
        message = '';
    }

    const style = {backgroundColor:messages?.color}

    return(
        message?<div onClick={remove} style={style} className="pop-up">
            <p>{message}</p>
        </div>:null
    )
}