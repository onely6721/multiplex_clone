import {createContext} from "react";

export const AuthContext = createContext({
    token: null,
    userId: null,
    role: null,
    isAuth: null,

})