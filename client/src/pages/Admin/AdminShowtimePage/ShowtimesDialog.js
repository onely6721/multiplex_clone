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
import {useEffect, useState} from "react";
import {DatePicker, DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {API} from "../../../API/api";




export const ShowtimesDialog = props => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(props.showtime.startDate )
    const [endDate, setEndDate] = useState(props.showtime.endDate)
    const [cinema, setCinema] = useState(props.showtime.cinemaId )
    const [hall, setHall] = useState(props.showtime.hallId)
    const [movie, setMovie] = useState(props.showtime.movieId )
    const [cinemas, setCinemas] = useState([])
    const [movies, setMovies] = useState([])
    const [halls, setHalls] = useState([])
    const [price, setPrice] = useState(props.showtime.price )
    const [startAt, setStartAt] = useState(props.showtime.startAt)


    const handleChangeCinema = (event) => {
        setCinema(event.target.value)
    };
    const handleChangeMovie = (event) => {
        setMovie(event.target.value)
    };
    const handleChangeHall = (event) => {
        setHall(event.target.value)
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

    useEffect(() => {
        const getMovies = async () => {
            const response = await API.get("/movies")
            setMovies(response.data)
        }
        getMovies()
    }, [])


    useEffect(() => {
        const getHalls = async () => {
            const response = await API.get("/halls/byCinema/" + cinema)
            setHalls(response.data)
        }
        getHalls()
    }, [cinema])
    const handleCreate = async () => {

        const formData = new URLSearchParams()
        formData.append('startAt', startAt)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('price', price)
        formData.append('movieId', movie)
        formData.append('cinemaId', cinema)
        formData.append('hallId', hall)

        if(props.method === "POST") {
            const response = await API.post("/showtimes/create",formData)
            console.log(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/showtimes/" + props.showtime._id, formData)
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
                <DialogTitle>{props.method === "POST" ? `Create` : `Edit`} Showtime</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Початок о"
                        defaultValue={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Ціна за квиток"
                        defaultValue={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                    />
                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Фильм</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={movie}
                            defaultValue={movie}
                            onChange={handleChangeMovie}
                            input={<OutlinedInput label="Name" />}
                        >
                            {movies.map((movie) => (
                                <MenuItem
                                    key={movie._id}
                                    value={movie._id}
                                >
                                    {movie.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Кинотеатр</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={cinema}
                            defaultValue={cinema}
                            onChange={handleChangeCinema}
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
                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Зал</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={hall}
                            defaultValue={hall}
                            onChange={handleChangeHall}
                            input={<OutlinedInput label="Name" />}
                        >
                            {halls.map((hall) => (
                                <MenuItem
                                    key={hall._id}
                                    value={hall._id}
                                >
                                    {hall.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <br/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
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