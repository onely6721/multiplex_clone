import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useContext, useState} from "react";
import {API} from "../../../API/api";
import {AuthContext} from "../../../context/AuthContext";
import  {useStyles} from "./Styles";


export const RegistrationModal = props => {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState(null)
    const {setToken, setAuth} = useContext(AuthContext)
    const classes = useStyles()
    const handleInput = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }


    const registration = async () => {
        try {
            if(userData.password !== userData.password2) {
                setError("Пароли не совпадают")
                return
            }
            const formData = new URLSearchParams()
            formData.append('username', userData.username)
            formData.append('email', userData.email)
            formData.append('password', userData.password)
            const response = await API.post("/users/registration",formData )
            if (response.status) {
                console.log(response.data)
                alert("Успешная регистрация")
            }
            props.close()
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
                <Box  className={classes.modal} >
                    <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                        Реєстрація
                    </Typography>
                    <TextField
                        name = "username"
                        id="outlined-basic"
                        label="Ім'я користувача або email"
                        variant="outlined"
                        style={{marginTop: "20px"}}
                        onChange={handleInput}
                    />
                    <TextField
                        name = "email"
                        type="email"
                        id="outlined-basic"
                        label="E-mail"
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
                    <TextField
                        name="password2"
                        type="password"
                        margin="dense"
                        id="outlined-basic"
                        label="Подтвердите пароль"
                        variant="outlined"
                        style={{marginTop: "20px"}}
                        onChange={handleInput}
                    />
                    <br/>
                    {error && <div style={{color:"red"}}>{error}</div>}
                    <Button
                        variant="outlined"
                        onClick={registration}
                        style={{marginTop: "20px"}}
                    >
                        Зарегиструватися
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}