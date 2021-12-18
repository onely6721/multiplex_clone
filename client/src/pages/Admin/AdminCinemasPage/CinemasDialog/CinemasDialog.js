import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Input, InputLabel,
    MenuItem, OutlinedInput, Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {API} from "../../../../API/api";

const cities = ["Chernihiv", "Odessa", "Kharkiv", "Lviv", "Kiev"]


export const CinemasDialog = props => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(props.cinema.name)
    const [address, setAddress] = useState(props.cinema.address)
    const [city, setCity] = useState(props.cinema.city)
    const [file, setFile] = useState(null)

    const handleChange = (event) => {
        setCity(event.target.value)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCreate = async () => {

        const formData = new FormData()
        formData.append('name', name)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('image', file)

        if(props.method === "POST") {
            const response = await API.post("/cinemas/",formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            props.create(response.data)
            console.log(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/cinemas/" + props.cinema._id,formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            props.update(response.data)
            console.log(response.data)
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button  onClick={handleClickOpen}>
                {props.method === "POST" ? `Create` : `Edit`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.method === "POST" ? `Create` : `Edit`} Movie</DialogTitle>
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
                        label="Адрес"
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth

                    />
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            name="image"
                            id="contained-button-file"
                            defaultValue={file}
                            onChange={(e) => {
                                setFile(e.target.files[0])
                          }}
                            type="file"
                        />
                    </label>

                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Город</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={city}
                            defaultValue={city}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {cities.map((city) => (
                                <MenuItem
                                    key={city}
                                    value={city}
                                >
                                    {city}
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