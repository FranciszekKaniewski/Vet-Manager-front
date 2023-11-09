import React, {createContext} from "react";

export enum color { red='var(--red-color)',green='var(--light-green-color)',gray='var(--light-gray-color)' }

export const messagesContext =
    createContext <{
        value:string[],
        setMessages:React.Dispatch<React.SetStateAction<string[]>>,
        color:color,
        printMessage:(message:string,color?:color)=>void,
    } | null >(null);