import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel,
    MenuItem, OutlinedInput, Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {API} from "../../../../API/api";




export const UsersDialog = props => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(props.user)
    const roles = ['user', 'admin']
    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    };
    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleCreate = async () => {
        try {
            const formData = new URLSearchParams()
            formData.append('username', user.username)
            formData.append('email', user.email)
            formData.append('firstName', user.firstName)
            formData.append('secondName', user.secondName)
            formData.append('role', user.role)

            const response = await API.put("/users/" + props.user._id,formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }})

            props.update(response.data)
            console.log(response.data)
            setOpen(false);
        } catch (e) {
            console.log(e.message)
        }


    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Редагувати
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Користувач</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        name="username"
                        margin="dense"
                        id="outlined-helperText"
                        label="Логін"
                        defaultValue={user.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="email"
                        margin="dense"
                        id="outlined-helperText"
                        label="E-mail"
                        defaultValue={user.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="firstName"
                        margin="dense"
                        id="outlined-helperText"
                        label="Ім'я"
                        defaultValue={user.firstName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="secondName"
                        margin="dense"
                        id="outlined-helperText"
                        label="Ім'я"
                        defaultValue={user.secondName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Роль</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            name="role"
                            id="demo-multiple-name"
                            value={user.role}
                            defaultValue={user.role}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {roles.map((role) => (
                                <MenuItem
                                    key={role}
                                    value={role}
                                >
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cкасувати</Button>
                    <Button onClick={handleCreate}>Редагувати</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}