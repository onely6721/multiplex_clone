import generateArray from "../tools/GenerateArray";
import {Button, Container, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {API} from "../API/api";
import {useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Seat} from "../components/Seat";
import {Drawer} from "@mui/material";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles({
    hall: {
        display: "grid",
        gridColumnGap: "30px",
        gridRowGap:"10px",
        padding: "50px",
    },
    movieTitle: {
        color: "orange"
    },
    reservationCheckout: {
      padding: "10px"
    },
    buttonCheckout: {
        color:"red",
        borderColor: "red !important",
    }

});

export const ReservationPage = props => {
    const id = useParams().id
    const {isAuth} = useContext(AuthContext)
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [showtime, setShowtime] = useState({})
    const [reservations, setReservations] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])


    const addReservation = (e,row, column) => {
        const candidate = reservations.find((reservation) =>  {
            if (reservation.row === row && reservation.column === column)
                return reservation
        })
        if (candidate) {
            setReservations(reservations.filter(reservation => {
                if (reservation.row !== row || reservation.column !== column)
                    return reservation
                }
            ))
        } else {
            setReservations([
                ...reservations,
                {
                    row,
                    column
                }
            ])
        }

    }

    useEffect(() => {
        const getShowtime = async () => {
            const response = await API.get("/showtimes/"+id)
            setShowtime(response.data)
            const arrRows = generateArray(1,response.data.rows + 1,1)
            const arrColumns = generateArray(1,response.data.columns + 1,1)
            setRows(arrRows)
            setColumns(arrColumns)
        }
        getShowtime()
    },[])

    useEffect(() => {
        const getReservedSeats = async () => {
            const response = await  API.get("/reservations/forShowtime/" + id)
            setReservedSeats(response.data)
            console.log(response.data)
        }

        getReservedSeats()
    }, [])

    return (
        <Container style={{marginTop:"100px"}}>

            <h1 className={classes.movieTitle}>{showtime.movieTitle}</h1>
            <Typography>Кинотеатр: {showtime.cinemaName}</Typography>
            <Typography>Зал: {showtime.hallName}</Typography>
            <Typography>Початок: {showtime.startAt}</Typography>
            <Typography>Квиток коштує: {showtime.price} грн.</Typography>
            <h2 align="center">Кінозал</h2>
            <div
                style={{
                    gridTemplateColumns: `repeat(${showtime.rows}, 1fr)`,
                }}
                className={classes.hall}
            >
                {rows.map((row, index) => {
                    return(
                        columns.map((column, index2) => {
                            const candidate = reservedSeats.find((reservation) =>  {
                                if (reservation.row === row && reservation.column === column)
                                    return reservation
                            })
                            if (candidate) {
                                return (
                                    <Seat
                                        disabled={true}
                                        column={column}
                                    >
                                    </Seat>
                                )
                            } else {
                                return (
                                    <Seat
                                        customClick={e => addReservation(e, row, column)}
                                        disabled={false}
                                        column={column}
                                    >
                                    </Seat>
                                )
                            }
                        }))
                })}
            </div>
            <div className="div" align="center">
                <Button
                    variant="outlined"
                    className={classes.buttonCheckout}
                    onClick={() => setOpen(!open)}
                >
                    Купить
                </Button>
            </div>
        <Drawer
            open={open}
            onClick={() => setOpen(!open)}
            anchor="bottom"
        >
            <div className={classes.reservationCheckout}>
                <h1>Квитки:</h1>
                {reservations.map ((reservation) => {
                    return (
                        <div style={{
                            borderRadius: "3px",
                            border: "1px solid",
                            borderColor: "#23bbf7",
                            padding: "10px",
                            marginTop:"10px",
                        }} >
                            <Typography>Ряд: {reservation.row} Місце: {reservation.column}</Typography>
                            <h4>Ціна: {showtime.price} грн</h4>
                        </div>
                    )
                })}
                <h1 align="center">Всього до сплати: {showtime.price*reservations.length} грн</h1>
                <div align="center">
                    <Button
                        variant="outlined"
                        className={classes.buttonCheckout}
                        onClick={() => {
                            if(!isAuth)
                                return
                            if(reservations.length === 0)
                                return
                            reservations.map(async (reservation, i) => {
                                const formData = new URLSearchParams()
                                formData.append('row', reservation.row)
                                formData.append('column', reservation.column)
                                formData.append('showtime', id)
                                const response = await API.post("/reservations/create",formData, {
                                     headers: {
                                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                      }
                                })
                            })
                        }}
                    >
                        Замовити
                    </Button>
                </div>
            </div>


        </Drawer>
        </Container>


    );
}