import {Avatar, AppBar, Toolbar, Typography, IconButton, Menu, Box, Button} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useContext, useEffect, useState} from "react";
import {API} from "../../API/api";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {LoginModal} from "../LoginModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {AdminMenu} from "./AdminMenu";
import {SelectCinema} from "./SelectCinema";
import {Logo} from "./Logo";
import {UserMenu} from "./UserMenu";


export const Header = () => {



    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{color: "white !important", background:"black"}}
            >
                <Toolbar>
                    <Logo/>
                    <SelectCinema/>
                    <AdminMenu/>
                    <UserMenu/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}