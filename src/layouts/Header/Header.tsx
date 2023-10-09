import { UserProfileInHeader } from "../../components/UserProfileInHeader/UserProfileInHeader";

import './Header.css'
import {Link} from "react-router-dom";

export const Header = () =>{

    return(
        <div className="header">
            <Link to='/'><h1><span className="vet">Vet</span> <span className="manager">Manager</span></h1></Link>
            <UserProfileInHeader/>
        </div>
    )
}