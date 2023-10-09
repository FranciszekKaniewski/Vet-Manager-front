import { UserProfileInHeader } from "../../components/UserProfileInHeader/UserProfileInHeader";

import './Header.css'

export const Header = () =>{

    return(
        <div className="header">
            <h1><span className="vet">Vet</span> <span className="manager">Manager</span></h1>
            <UserProfileInHeader/>
        </div>
    )
}