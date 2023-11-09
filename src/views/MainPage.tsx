import {useContext} from "react";
import {userDataContext} from "../contexts/userDataContext";
import {PetsComponent} from "../components/PetsComponent/PetsComponent";


export const MainPage = () =>{
    const isLogged = useContext(userDataContext);

    return(
        isLogged?.value ?
            <>
                <br/>
                <h1>Hi {isLogged.value.name}</h1>
                <br/>
                <PetsComponent/>
            </>
            :
            <h1>Log in to have access!</h1>
    )
}