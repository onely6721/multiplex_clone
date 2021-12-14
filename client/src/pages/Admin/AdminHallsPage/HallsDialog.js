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
import {API} from "../../../API/api";




export const HallsDialog = props => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(props.hall.name)
    const [rows, setRows] = useState(props.hall.rows)
    const [columns, setColumns] = useState(props.hall.columns)
    const [cinema, setCinema] = useState(props.hall.cinema)
    const [cinemas, setCinemas] = useState([])
    const handleChange = (event) => {
        setCinema(event.target.value)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };


    useEffect(() => {
        const getCinemas = async () => {
            const response = await API.get("/cinemas")
            setCinemas(response.data)
        }
        getCinemas()

    }, [])

    const handleCreate = async () => {

        const formData = new URLSearchParams()
        formData.append('name', name)
        formData.append('rows', rows)
        formData.append('columns', columns)
        formData.append('cinema', cinema)

        if(props.method === "POST") {
            const response = await API.post("/halls/",formData)
            console.log(response.data)
            props.create(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/halls/" + props.hall._id,formData)
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
                        label="Название"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="rows"
                        defaultValue={rows}
                        onChange={(e) => setRows(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="columns"
                        defaultValue={columns}
                        onChange={(e) => setColumns(e.target.value)}
                        fullWidth
                    />

                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Город</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={cinema}
                            defaultValue={cinema}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {cinemas.map((cinema) => (
                                <MenuItem
                                    key={cinema._id}
                                    value={cinema._id}
                                >
                                    {cinema.name}
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