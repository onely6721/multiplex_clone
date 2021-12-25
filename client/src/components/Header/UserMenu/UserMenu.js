import {IconButton, Menu} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import {LoginModal} from "../../Modals/LoginModal/LoginModal";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {RegistrationModal} from "../../Modals/RegistrationModal/RegistrationModal";


const PaperProps = {
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
}


export const UserMenu = props => {
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegistration, setOpenRegistration] = useState(false)
    const {isAuth, setAuth} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                size="small"
                sx={{ ml: 2 }}
            >
                <MoreVertIcon
                    sx={{ width: 32, height: 32, color:"white" }}
                    onClick={handleClick}
                >
                </MoreVertIcon>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={PaperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link
                        style={{color:"black"}}
                        to='/movies'
                    >
                        All films
                    </Link>
                </MenuItem>
                {
                    isAuth
                        ?
                        <>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    style={{color:"black"}}
                                    to='/profile'
                                >
                                    My reservations
                                </Link>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    setAuth(false)
                                    handleClose()
                                }}
                            >
                                Logout
                            </MenuItem>
                        </>
                        :
                        <>
                            <MenuItem
                                onClick={()=> {
                                    handleClose()
                                    setOpenLogin(!openLogin)
                                }}
                            >
                                Login
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    setOpenRegistration(!openRegistration)
                                }}
                            >
                                Registration
                            </MenuItem>
                        </>
                }
            </Menu>
            <LoginModal
                open={openLogin}
                close={() => setOpenLogin(false)}
            />
            <RegistrationModal
                open={openRegistration}
                close={() => setOpenRegistration(false)}
            />

        </>
    )
}