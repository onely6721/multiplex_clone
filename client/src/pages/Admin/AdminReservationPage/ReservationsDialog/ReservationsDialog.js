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




export const ReservationDialog = props => {
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(props.reservation.row)
    const [column, setColumn] = useState(props.reservation.column)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(props.reservation.owner)
    const handleChange = (event) => {
        setUser(event.target.value)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };


    useEffect(() => {
        const getUsers = async () => {
            const response = await API.get("/users")
            setUsers(response.data)
        }
        getUsers()

    }, [])

    const handleCreate = async () => {

        const formData = new URLSearchParams()
        formData.append('row', row)
        formData.append('column', column)
        formData.append('owner', user)

        if(props.method === "POST") {
            const response = await API.post("/reservations/",formData)
            props.create(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/reservations/" + props.reservation._id,formData)
            console.log(response.data)
            props.update(response.data)


        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                {props.method === "POST" ? `Create` : `Edit`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.method === "POST" ? `Create` : `Edit`} Hall</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="row"
                        defaultValue={row}
                        onChange={(e) => setRow(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="column"
                        defaultValue={column}
                        onChange={(e) => setColumn(e.target.value)}
                        fullWidth
                    />

                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Город</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={user}
                            defaultValue={user}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {users.map((user) => (
                                <MenuItem
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>{props.method === "POST" ? `Create` : `Edit`}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}