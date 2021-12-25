import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {API} from "../../API/api";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useStyles} from "./Styles";
import {Card, CardContent} from "@mui/material";


export const MovieStatCard = props => {
    const classes = useStyles()
    return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{ fontSize: 28 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {props.reservation.movie.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Count reservations: {props.reservation.totalReservations}
                    </Typography>
                    <Typography color="text.secondary">
                        Earning: {props.reservation.totalCash}$
                    </Typography>
                </CardContent>
            </Card>

    )
}