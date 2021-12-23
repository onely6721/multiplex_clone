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
import {DatePicker, DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {API} from "../../../../API/api";




export const ShowtimesDialog = props => {
    const [open, setOpen] = useState(false);
    const [showtime, setShowtime] = useState({...props.showtime})
    const [cinemas, setCinemas] = useState([])
    const [movies, setMovies] = useState([])
    const [halls, setHalls] = useState([])


    const handleChangeCinema = (event) => {
        setShowtime({...showtime, cinemaId: event.target.value})
    };
    const handleChangeMovie = (event) => {
        setShowtime({...showtime, movieId: event.target.value})
    };
    const handleChangeHall = (event) => {
        setShowtime({...showtime, hallId: event.target.value})
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
            const response = await API.get("/halls/byCinema/" + showtime.cinemaId)
            setHalls(response.data)
        }
        getHalls()
    }, [showtime])
    const handleCreate = async () => {

        const formData = new URLSearchParams()
        formData.append('startAt', showtime.startAt)
        formData.append('startDate', showtime.startDate)
        formData.append('endDate', showtime.endDate)
        formData.append('price', showtime.price)
        formData.append('movieId', showtime.movieId)
        formData.append('cinemaId', showtime.cinemaId)
        formData.append('hallId', showtime.hallId)

        if(props.method === "POST") {
            const response = await API.post("/showtimes/",formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }}
            )
            props.create(response.data)
            console.log(response.data)
        }
        if(props.method === "PUT") {
            const response = await API.put("/showtimes/" + props.showtime._id, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }})
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
                {props.method === "POST" ? `Створити` : `Редагувати`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.method === "POST" ? `Створити` : `Редагувати`} Showtime</DialogTitle>
                <DialogContent  style={{padding:"20px"}} >
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Початок о"
                        defaultValue={showtime.startAt}
                        onChange={(e) => setShowtime({...showtime, startAt: e.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="outlined-helperText"
                        label="Ціна за квиток"
                        defaultValue={showtime.price}
                        onChange={(e) => setShowtime({...showtime, price: e.target.value})}
                        fullWidth
                    />
                    <FormControl sx={{ width: 300, marginTop: 3}}>
                        <InputLabel id="demo-multiple-name-label">Фильм</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={showtime.movieId}
                            defaultValue={showtime.movieId}
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
                            value={showtime.cinemaId}
                            defaultValue={showtime.cinemaId}
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
                            value={showtime.hallId}
                            defaultValue={showtime.hallId}
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
                            value={showtime.startDate}
                            onChange={(newValue) => {
                                setShowtime({...showtime, startDate: newValue})
                            }}
                        />
                    </LocalizationProvider>
                    <br/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={showtime.endDate}
                            onChange={(newValue) => {
                                setShowtime({...showtime, endDate: newValue})
                            }}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>{props.method === "POST" ? `Створити` : `Редагувати`}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}