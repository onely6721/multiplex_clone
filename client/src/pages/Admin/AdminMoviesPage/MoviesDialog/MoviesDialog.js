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
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {API} from "../../../../API/api";

const names = [
    'Комедія',
    'Драма',
    'Фантастика',
];

export const MoviesDialog = props => {
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState(props.movie)
    const [genre, setGenre] = useState(props.movie.genre);
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
        formData.append('title', movie.title)
        formData.append('description', movie.description)
        formData.append('ratingIMDB', movie.ratingIMDB)
        formData.append('releaseDate', movie.releaseDate)
        formData.append('endDate', movie.endDate)
        formData.append('language', movie.language)
        if(file)
            formData.append('image', file)
        else
            formData.append('image', props.movie.image)
        formData.append('duration', movie.duration)
        formData.append('director', movie.director)
        formData.append('cast', movie.cast)
        genre.map((g) => {
            formData.append('genre', g)
        })

        if(props.method === "POST") {
            const response = await API.post("/movies/",formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }

            })
            props.create(response.data)
            console.log(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/movies/" + props.movie._id,formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
            <Button onClick={handleClickOpen}>
                {props.method === "POST" ? `Створити` : `Редагувати`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.method === "POST" ? `Створити` : `Редагувати`} Movie</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Название"
                        defaultValue={movie.title}
                        onChange={(e) => setMovie({...movie, title: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Описание"
                        defaultValue={movie.description}
                        onChange={(e) => setMovie({...movie, description: e.target.value })}
                        fullWidth

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Рейтинг IMDB"
                        defaultValue={movie.ratingIMDB}
                        onChange={(e) => setMovie({...movie, ratingIMDB: e.target.value })}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Режиссер"
                        defaultValue={movie.director}
                        onChange={(e) => setMovie({...movie, director: e.target.value })}
                        style={{marginLeft: "20px"}}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Бюджет"
                        onChange={(e) => setMovie({...movie, cast: e.target.value })}
                        defaultValue={movie.cast}

                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Длительность"
                        onChange={(e) => setMovie({...movie, duration: e.target.value })}
                        defaultValue={movie.duration}
                        style={{marginLeft: "20px"}}
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Язык"
                        defaultValue={movie.language}
                        onChange={(e) => setMovie({...movie, language: e.target.value })}
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
                            value={movie.releaseDate}
                            onChange={(newValue) => {
                               setMovie({...movie, releaseDate: newValue})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <br/>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата окончания"
                            value={movie.endDate}
                            onChange={(newValue) => {
                                setMovie({...movie, endDate: newValue})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Скасувати</Button>
                    <Button onClick={handleCreate}>{props.method === "POST" ? `Створити` : `Редагувати`}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}