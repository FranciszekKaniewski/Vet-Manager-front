import React, {createContext} from "react";
import {User} from "types"

export type clientUser = Omit<User,"password">;


export const userDataContext = createContext <{value:clientUser|null, setUser:React.Dispatch<React.SetStateAction<clientUser|null>>, isLoading:boolean, setLoading:React.Dispatch<React.SetStateAction<boolean>>} | null>(null);