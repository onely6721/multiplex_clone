import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useContext, useState} from "react";
import {API} from "../API/api";
import {AuthContext} from "../context/AuthContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    color:"black",
    border: '2px solid #000',
    boxShadow: 24,
    padding: "10px",
    p: 4,
};

export const LoginModal = props => {
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const {setToken, setAuth} = useContext(AuthContext)

    const handleLogin = e => {
        setName(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const login = async () => {
        try {
            const formData = new URLSearchParams()
            formData.append('username', name)
            formData.append('password', password)
            const response = await API.post("/users/login",formData )
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setToken(response.data.token)
                setAuth(true)
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            props.close()
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
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Login Form
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Login"
                        variant="outlined"
                        style={{padding: "10px"}}
                        onChange={handleLogin}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        style={{padding: "10px"}}
                        onChange={handlePassword}
                    />
                    <br/>
                  <Button
                      variant="outlined"
                      onClick={login}
                  >
                      Submit
                  </Button>
                </Box>
            </Modal>
        </div>
    );
}