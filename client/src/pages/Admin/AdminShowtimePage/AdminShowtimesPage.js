import {useEffect, useState} from "react";
import {API} from "../../../API/api";
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import moment from "moment";
import {TablePaginationActions} from "../TablePaginationActions";
import {ShowtimesDialog} from "./ShowtimesDialog";


const nullShowtime = {
    cinemaId: null,
    hallId: null,
    movieId: null,
    price: null,
    startDate: null,
    endDate: null,
    startAt: null,
}

export const AdminShowtimesPage = () => {
    const [showtimes, setShowtimes] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (showtime) => {
        setShowtimes(
            showtimes.filter((item) => {
                if(item._id != showtime._id)
                    return item
        }))
        await API.delete("/showtimes/"+showtime._id)
    }

    const handleCreate = async (showtime) => {
        const cinema = await API.get("/cinemas/"+showtime.cinemaId)
        const movie = await API.get("/movies/"+showtime.movieId)
        const hall = await API.get("/halls/"+showtime.hallId)
        const newShowtime = {
            ...showtime,
            cinemaName: cinema.data.name,
            movieName: movie.data.title,
            hallName: hall.data.name,
        }
        setShowtimes([...showtimes, newShowtime])
    }

    const handleUpdate = async (showtime) => {

        const newShowtimes =  await Promise.all(
            showtimes.map(async (item, index) => {
                if (item._id == showtime._id){
                    const cinema = await API.get("/cinemas/"+showtime.cinemaId)
                    const movie = await API.get("/movies/"+showtime.movieId)
                    const hall = await API.get("/halls/"+showtime.hallId)
                    return {
                        ...showtime,
                        cinemaName: cinema.data.name,
                        movieName: movie.data.title,
                        hallName: hall.data.name,
                    }
                }
                return  item
            })
        )
        setShowtimes([...newShowtimes])
    }

    useEffect(() => {
        const getShowtimes = async () => {
            try {
                const response = await API.get("/showtimes")
                const tempShowtimes = await Promise.all(response.data.map(async (showtime, index) => {
                    const cinema = await API.get("/cinemas/"+showtime.cinemaId)
                    const movie = await API.get("/movies/"+showtime.movieId)
                    const hall = await API.get("/halls/"+showtime.hallId)
                    return {
                        ...showtime,
                        cinemaName: cinema.data.name,
                        movieName: movie.data.title,
                        hallName: hall.data.name,
                    }
                }))
                console.log(tempShowtimes)
                setShowtimes(tempShowtimes)
            } catch (e) {
                console.log(e)
            }
        }
        getShowtimes()
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div style={{color:"white", marginTop:"100px"}}>
            <h1 align="center">Halls</h1>
            <ShowtimesDialog  create={handleCreate} showtime={nullShowtime} method="POST"/>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Фильм</TableCell>
                                <TableCell align="right">Кинотеатр</TableCell>
                                <TableCell align="right">Зал</TableCell>
                                <TableCell align="right">Дата сеанса</TableCell>
                                <TableCell align="right">Конец сеанса</TableCell>
                                <TableCell align="right">Початок </TableCell>
                                <TableCell align="right">Цена за бІлет </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? showtimes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : showtimes
                            ).map((showtime) => (
                                <TableRow key={showtime._id}>
                                    <TableCell align="right">{showtime.movieName}</TableCell>
                                    <TableCell align="right">{showtime.cinemaName}</TableCell>
                                    <TableCell align="right">{showtime.hallName}</TableCell>
                                    <TableCell align="right">{showtime.startDate}</TableCell>
                                    <TableCell align="right">{showtime.endDate}</TableCell>
                                    <TableCell align="right">{showtime.startAt}</TableCell>
                                    <TableCell align="right">{showtime.price}</TableCell>
                                    <TableCell align="right">
                                        <ShowtimesDialog update={handleUpdate} showtime={showtime} method="PUT"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(showtime)}
                                        >
                                            Delete
                                        </Button><
                                    /TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={showtimes.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}