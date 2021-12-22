import React, {useContext, useEffect, useState} from "react";
import {API} from "../../../API/api";
import {useStyles} from "./Styles";
import {Container, Grid} from "@mui/material";
import {MovieStatCard} from "../../../components/MovieStatCard/MovieStatCard";

export const AdminStatsPage = () => {
    const [reservations, setReservations] = useState([])
    const [totalCount, setTotalCount] = useState([])
    const [userCount, setUserCount] = useState({})
    const classes = useStyles()

    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await API.get("/stats/reservations")
                setReservations(response.data.reservations)
                setTotalCount(response.data.totalCount)
            } catch (e) {
                console.log(e.message)
            }
        }
        getReservations()
    }, [])

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const response = await API.get("/stats/totalUsers")
                setUserCount(response.data)
            } catch (e) {
                console.log(e.message)
            }
        }
        getUserCount()
    }, [])
    return (

         <Container >
             <h1  className={classes.reservationTitle}>Загальна кількість бронювань: {totalCount}</h1>
             <h1> Статистика по фільмам:</h1>
             <Grid container spacing={2}>
                 {reservations.map((reservation, index) => {
                     return (
                         <Grid item xs={4} >
                             <MovieStatCard reservation={reservation}/>
                         </Grid>
                     )
                 })}
             </Grid>
            <h1>Загальна кількість користувачів: {userCount.totalUsers}</h1>
            <h1>Загальна кількість користувачів: {userCount.usersPerMonth}</h1>
            <h1>Загальна кількість користувачів: {userCount.usersPerWeek}</h1>
         </Container>

    )


}