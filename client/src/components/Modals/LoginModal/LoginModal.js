import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useContext, useState} from "react";
import {API} from "../../../API/api";
import {AuthContext} from "../../../context/AuthContext";
import {useStyles} from "./Styles";


export const LoginModal = props => {
    const classes = useStyles()
    const [userData, setUserData] = useState({})
    const [error, setError] = useState([])
    const {setToken, setAuth} = useContext(AuthContext)

    const handleInput = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }


    const login = async () => {
        try {
            const formData = new URLSearchParams()
            formData.append('username', userData.login)
            formData.append('password', userData.password)
            const response = await API.post("/users/login",formData )

            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setToken(response.data.token)
                setAuth(true)
                props.close()
            }
        } catch (e) {
            setError(e.response.data.message)
        }

    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal} >
                    <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                        Вхід
                    </Typography>
                    <TextField
                        name="login"
                        id="outlined-basic"
                        label="Ім'я користувача або email"
                        variant="outlined"
                        style={{marginTop: "20px"}}
                        onChange={handleInput}
                    />
                    <TextField
                        name="password"
                        type="password"
                        margin="dense"
                        id="outlined-basic"
                        label="Пароль"
                        variant="outlined"
                        style={{marginTop: "20px"}}
                        onChange={handleInput}
                    />
                    <br/>
                    {error && <div style={{color:"red"}}>{error}</div>}
                  <Button
                      variant="outlined"
                      onClick={login}
                      style={{marginTop: "20px"}}
                  >
                      Увійти
                  </Button>
                </Box>
            </Modal>
        </div>
    );
}