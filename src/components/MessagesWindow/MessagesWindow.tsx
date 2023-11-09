import React, {useContext} from "react";
import {messagesContext} from "../../contexts/messagesContext";
import {PopUp} from "../PopUp/PopUp";

export const MessagesWindow = () => {

    const messages= useContext(messagesContext)


    const view = messages?.value.map((e,i)=> <PopUp key={i} message={e} />)

    return(
        <div className="pop-up">
            {view}
        </div>
    )
}