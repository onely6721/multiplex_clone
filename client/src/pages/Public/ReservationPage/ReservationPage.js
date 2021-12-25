import generateArray from "../../../utils/GenerateArray";
import { Button, Container, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {API} from "../../../API/api";
import {useParams} from "react-router-dom";
import {Seat} from "../../../components/Seat/Seat";
import {Drawer} from "@mui/material";
import {AuthContext} from "../../../context/AuthContext";
import {useStyles} from "./Styles";


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

    const handleConfirm =  async () => {
        try {
            if(!isAuth) {
              alert("No auth")
              return
            }
            if(reservations.length === 0)
                return
            await Promise.all(
                reservations.map(async (reservation, i) => {
                    const formData = new URLSearchParams()
                    formData.append('row', reservation.row)
                    formData.append('column', reservation.column)
                    formData.append('showtime', id)
                    const response = await API.post("/reservations/",formData, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        }
                    })
                    console.log(response.status)
                    setReservedSeats([...reservedSeats, response.data])
                })
            )
            window.location.reload()
        } catch (e) {
           console.log(e.response.data.message)
        }

    }
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
            <Typography>Cinema: {showtime.cinemaName}</Typography>
            <Typography>Hall: {showtime.hallName}</Typography>
            <Typography>Start at: {showtime.startAt}</Typography>
            <Typography>Price: {showtime.price}$.</Typography>
            <h2 align="center">Hall</h2>
            <div
                style={{
                    gridTemplateColumns: `repeat(${showtime.columns}, 1fr)`,
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
                    Reserve
                </Button>
            </div>
        <Drawer
            open={open}
            onClick={() => setOpen(!open)}
            anchor="bottom"
        >
            <div className={classes.reservationCheckout}>
                <h1>Tickets:</h1>
                {reservations.map ((reservation) => {
                    return (
                        <div style={{
                            borderRadius: "3px",
                            border: "1px solid",
                            borderColor: "#23bbf7",
                            padding: "10px",
                            marginTop:"10px",
                        }} >
                            <Typography>Row: {reservation.row} Place: {reservation.column}</Typography>
                            <h4>Price: {showtime.price}$ </h4>
                        </div>
                    )
                })}
                <h1 align="center">Total to pay: {showtime.price*reservations.length}$</h1>
                <div align="center">
                    <Button
                        variant="outlined"
                        className={classes.buttonCheckout}
                        onClick={handleConfirm}
                    >
                        Accept
                    </Button>
                </div>
            </div>


        </Drawer>
        </Container>


    );
}