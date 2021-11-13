import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Avatar, Divider, ListItemIcon, Menu} from "@mui/material";
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
    const test = false
    const [cinemas, setCinemas] = useState([])
    const [cinema, setCinema] = useState()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=> {
        const getCinemas = async () => {
            const selectedCinemas = await API.get("/cinemas/")
            setCinemas(selectedCinemas.data)
        }
        getCinemas()
    }, [])

    useEffect(() => {
        const selectedCinema = localStorage.getItem("cinema")
        if (selectedCinema)
            setCinema(selectedCinema)
        else
            setCinema("")

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
                        <Link to="/" style={{color: "white"}}>
                            Multiplex Clone
                        </Link>
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120}}>
                        <InputLabel htmlFor="grouped-select" style={{color:"white"}}>Кинотеатр</InputLabel>
                        <Select
                            defaultValue={cinema}
                            id="grouped-select"
                            label="Grouping"
                            style={{color:"white"}}
                            onChange={(e) => handleSelect(e)}
                        >

                            <ListSubheader >Чернигов</ListSubheader>
                            {cinemas.map((cinema, index) => {
                                if(cinema.city == "Chernihiv")
                                    return (
                                        <MenuItem key={cinema._id} value={cinema._id}>
                                        {cinema.name}
                                     </MenuItem>
                                    )
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
                        <Avatar sx={{ width: 32, height: 32 }}   onClick={handleClick}>?</Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}

                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgColor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {test
                            ?
                                <MenuItem>  Profile </MenuItem>
                            :
                                <>
                                    <MenuItem> Login </MenuItem>
                                    <MenuItem>  Registration </MenuItem>
                                </>

                        }

                        <Divider />
                        <MenuItem>
                            Add another account
                        </MenuItem>
                        <MenuItem>
                            Settings
                        </MenuItem>
                        <MenuItem>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}