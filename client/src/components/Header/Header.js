import { AppBar, Toolbar, Box} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AdminMenu} from "./AdminMenu/AdminMenu";
import {SelectCinema} from "./SelectCinema/SelectCinema";
import {Logo} from "./Logo/Logo";
import {UserMenu} from "./UserMenu/UserMenu";
import {parseJwt} from "../../utils/ParseJWT";
import {AuthContext} from "../../context/AuthContext";


export const Header = () => {

   const {token, isAuth, role, setRole} = useContext(AuthContext)
    useEffect(() => {
       if (isAuth) {
           setRole(parseJwt(token).role)
       } else {
           setRole(null)
       }
    }, [isAuth])

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{color: "white !important", background:"black"}}
            >
                <Toolbar>
                    <Logo/>
                    <SelectCinema/>
                    {role === 'admin' && <AdminMenu/>}
                    <UserMenu/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}