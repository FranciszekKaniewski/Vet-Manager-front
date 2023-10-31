import {createContext} from "react";
import {User} from "types"

export type clientUser = Omit<User,"password">;


export const userDataContext = createContext <{value:clientUser|null, setUser:(value: clientUser|null) => void} | null>(null);