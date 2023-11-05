import {useContext} from "react";
import {userDataContext} from "../contexts/userDataContext";
import {PetInfo} from "../components/PetInfo/PetInfo";


export const MainPage = () =>{
    const isLogged = useContext(userDataContext);

    if(isLogged===null) return <h2>loading...</h2>;

    return(
        isLogged.value ? <PetInfo/> : <h1>Zaloguj się!</h1>
    )
}