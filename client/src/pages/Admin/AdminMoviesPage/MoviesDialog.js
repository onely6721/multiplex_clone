import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, Input, InputLabel,
    MenuItem, OutlinedInput, Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {API} from "../../../API/api";
import {create} from "@mui/material/styles/createTransitions";

const names = [
    'Страшилка',
    'Камедия',
    'Драма',
    'Рофлянка',
    'УУУУ',
    '22',
    '23',
];

export const MoviesDialog = props => {
    const [open, setOpen] = useState(false);
    const [genre, setGenre] = useState(props.movie.genre);
    const [title, setTitle] = useState(props.movie.title)
    const [description, setDescription] = useState(props.movie.description)
    const [language, setLanguage] = useState(props.movie.language)
    const [duration, setDuration] = useState(props.movie.duration)
    const [director, setDirector] = useState(props.movie.director)
    const [rating, setRating] = useState(props.movie.ratingIMDB)
    const [cast, setCast] = useState(props.movie.cast)
    const [startDate, setStartDate] = useState(props.movie.releaseDate);
    const [endDate, setEndDate] = useState(props.movie.endDate);
    const [file, setFile] = useState(null)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setGenre(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCreate = async () => {

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('ratingIMDB', rating)
        formData.append('releaseDate', startDate)
        formData.append('endDate', endDate)
        formData.append('language', language)
        if(file)
            formData.append('image', file)
        else
            formData.append('image', props.movie.image)
        formData.append('duration', duration)
        formData.append('director', director)
        formData.append('cast', cast)
        genre.map((g) => {
            formData.append('genre', g)
        })

        if(props.method === "POST") {
            const response = await API.post("/movies/create",formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }

            })
            props.create(response.data)
            console.log(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/movies/" + props.movie._id,formData, {
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
            <Button variant="outlined" onClick={handleClickOpen}>
                {props.method === "POST" ? `Create` : `Edit`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.method === "POST" ? `Create` : `Edit`} Movie</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Название"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Описание"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Рейтинг IMDB"
                        defaultValue={rating}
                        onChange={(e) => setRating(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Режиссер"
                        defaultValue={director}
                        onChange={(e) => setDirector(e.target.value)}
                        style={{marginLeft: "20px"}}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Бюджет"
                        onChange={(e) => setCast(e.target.value)}
                        defaultValue={cast}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Длительность"
                        onChange={(e) => setDuration(e.target.value)}
                        defaultValue={duration}
                        style={{marginLeft: "20px"}}
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Язык"
                        defaultValue={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <br/>
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
                        <InputLabel id="demo-multiple-name-label">Жанр</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={genre}
                            defaultValue={genre}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата выхода"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <br/>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата окончания"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>{props.method === "POST" ? `Create` : `Edit`}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}