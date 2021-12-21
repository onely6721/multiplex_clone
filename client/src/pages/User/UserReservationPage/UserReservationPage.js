
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import moment from "moment";
import {API} from "../../../API/api";





export const UserReservationPage = () => {

    const [reservations, setReservations] = useState([])

    useEffect(() => {
       const getReservations = async () => {
             const response = await API.get("/reservations/me",
                 {
                     headers: {
                         "Authorization": `Bearer ${localStorage.getItem('token')}`,
                     }
                 })
             setReservations(response.data)
           console.log(response.data)
       }
       getReservations()
    },[])

    const deleteReservation = async (id) => {
        await API.delete("/reservations/"+id, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        setReservations(
            reservations.filter((reservation) => {
                if (reservation._id !== id)
                    return reservation
            })
        )
    }

    return (
        <div style={{marginTop: "80px", color:"white"}}>
            <Container>
                <h2 align="center" style={{padding:"30px"}}>Бронь</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie Title</TableCell>
                                <TableCell align="right">Cinema</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Start At</TableCell>
                                <TableCell align="right">Row</TableCell>
                                <TableCell align="right">Column</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation._id}>
                                    <TableCell component="th" scope="row">
                                        {reservation.showtime.movieId.title}
                                    </TableCell>
                                    <TableCell align="right">{reservation.showtime.cinemaId.name}</TableCell>
                                    <TableCell align="right">{moment(reservation.startDate).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{reservation.showtime.startAt}</TableCell>
                                    <TableCell align="right">{reservation.row}</TableCell>
                                    <TableCell align="right">{reservation.column}</TableCell>
                                    <TableCell align="right">{reservation.showtime.price}</TableCell>

                                    <TableCell align="right">
                                        <Button
                                            variant={"outlined"}
                                            style={{color:"red", borderColor:"red"}}
                                            onClick={async (e) => {
                                                await deleteReservation(reservation._id)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>

        </div>

    );
}