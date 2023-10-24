import {createContext} from "react";

export const userIsLogged = createContext <{value:boolean, change:(value: boolean) => void} | null>(null);