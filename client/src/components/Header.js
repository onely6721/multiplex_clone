import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Avatar} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";
import {API} from "../API/api";
import {Link} from "react-router-dom";

export const Header = () => {
    const [cinemas, setCinemas] = useState([])
    useEffect(()=> {
        const getCinemas = async () => {
            const selectedCinemas = await API.get("/cinemas/")
            setCinemas(selectedCinemas.data)
        }
        getCinemas()
    }, [])

    const handleSelect = (e) => {
        localStorage.setItem("cinema", e.target.value)
    }
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{color: "white !important", background:"black"}}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color:"white"}}
                    >
                        <Link to="/">
                            Multiplex Clone
                        </Link>
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120}}>
                        <InputLabel htmlFor="grouped-select" style={{color:"white"}}>Кинотеатр</InputLabel>
                        <Select
                            defaultValue="" i
                            d="grouped-select"
                            label="Grouping"
                            style={{color:"white"}}
                            onChange={(e) => handleSelect(e)}
                        >
                            <ListSubheader >Чернигов</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Chernihiv")
                                    return (<MenuItem
                                        key={cinema._id}
                                        value={cinema._id}
                                        style={{minWidth:"100%"}}
                                    >
                                        {cinema.name}
                                    </MenuItem>)
                            })}
                            <ListSubheader>Киев</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Kiev")
                                    return (<MenuItem value={cinema._id}>{cinema.name}</MenuItem>)
                            })}
                            <ListSubheader>Львов</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Lviv")
                                    return (<MenuItem value={cinema._id}>{cinema.name}</MenuItem>)
                            })}
                            <ListSubheader>Одеса</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Odesa")
                                    return (<MenuItem value={cinema._id}>{cinema.name}</MenuItem>)
                            })}
                            <ListSubheader>Харьков</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Kharkiv")
                                    return (<MenuItem value={cinema._id}>{cinema.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <IconButton  size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>?</Avatar>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
    )
}