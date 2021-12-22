import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {API} from "../../API/api";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useStyles} from "./Styles";


export const MovieStatCard = props => {
    const classes = useStyles()
    return (
        <div className={classes.background}
             style={{
                    backgroundImage: `url(${"http://localhost:5000/resource/images/" 
                    + 
                    props.reservation.movie.image})`
            }}
        >
            <Link to={`/detail/${props.reservation.movie._id}`}>
                <div className="movie-card">
                    <Container>
                        <h1 align="center" style={{ paddingTop:"20%", }}>
                            {props.reservation.movie.title}
                        </h1>
                        <h3 className={classes.reservationCount}>
                            Загальна кількість бронювань: {props.reservation.totalReservations}
                        </h3>
                        <h3 className={classes.cash}>
                            Дохід: {props.reservation.totalCash} грн.
                        </h3>
                    </Container>
                </div>
            </Link>
         </div>
    )
}