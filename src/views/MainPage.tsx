import {useContext} from "react";
import {userDataContext} from "../contexts/userDataContext";


export const MainPage = () =>{
    const isLogged = useContext(userDataContext);

    if(isLogged===null) return null;

    return(
        isLogged.value ? <h1>Witam {isLogged.value.name}</h1> : <h1>Loguj</h1>
    )
}