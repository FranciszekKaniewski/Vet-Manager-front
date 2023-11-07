import {useContext} from "react";
import {userDataContext} from "../contexts/userDataContext";
import {PetsComponent} from "../components/PetsComponent/PetsComponent";


export const MainPage = () =>{
    const isLogged = useContext(userDataContext);

    if(isLogged===null) return <h2>loading...</h2>;

    return(
        isLogged.value ?
            <>
                <br/>
                <h1>Hi {isLogged.value.name}</h1>
                <br/>
                <PetsComponent/>
            </>
            :
            <h1>Zaloguj się!</h1>
    )
}