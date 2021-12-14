import { AppBar, Toolbar, Box} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AdminMenu} from "./AdminMenu";
import {SelectCinema} from "./SelectCinema";
import {Logo} from "./Logo";
import {UserMenu} from "./UserMenu";
import {parseJwt} from "../../utils/ParseJWT";
import {AuthContext} from "../../context/AuthContext";


export const Header = () => {

    const [role, setRole] = useState(null)
    const {isAuth} = useContext(AuthContext)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const jwtPayload =  parseJwt(token)
            console.log(jwtPayload)
            setRole(jwtPayload.role)
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