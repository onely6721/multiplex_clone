import React, {useContext, useEffect, useState} from "react";
import {API} from "../../../API/api";
import {useStyles} from "./Styles";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import {MovieStatCard} from "../../../components/MovieStatCard/MovieStatCard";

export const AdminStatsPage = () => {
    const [reservations, setReservations] = useState([])
    const [totalCount, setTotalCount] = useState([])
    const [totalCash, setTotalCash] = useState(0)
    const [userCount, setUserCount] = useState({})
    const classes = useStyles()

    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await API.get("/stats/reservations")
                let counter = 0
                response.data.reservations.forEach((reservation) => {
                    counter += reservation.totalCash * reservation.totalReservations
                })
                setTotalCash(counter)
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
             <h1
                 align="center"
                 className={classes.reservationTitle}
             >
                 Stats
             </h1>
             <Grid className={classes.offset} container spacing={2}>
                 <Grid item xs={12} md={4}>
                     <Card sx={{ minWidth: 275 }}>
                         <CardContent>
                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                 Total users
                             </Typography>
                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 {userCount.totalUsers}
                             </Typography>
                         </CardContent>
                     </Card>
                 </Grid>
                 <Grid  item xs={12} md={4}>
                     <Card sx={{ minWidth: 275 }}>
                         <CardContent>
                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Users per month
                             </Typography>
                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 {userCount.usersPerMonth}
                             </Typography>
                         </CardContent>
                     </Card>
                 </Grid>
                 <Grid  item xs={12} md={4}>
                     <Card sx={{ minWidth: 275 }}>
                         <CardContent>
                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                 Users per week
                             </Typography>
                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 {userCount.usersPerWeek}
                             </Typography>
                         </CardContent>
                     </Card>
                 </Grid>
                 <Grid  item xs={12} md={4}>
                     <Card sx={{ minWidth: 275 }}>
                         <CardContent>
                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                 Total reservations
                             </Typography>
                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 {totalCount}
                             </Typography>
                         </CardContent>
                     </Card>
                 </Grid>
                 <Grid  item xs={12} md={4}>
                     <Card sx={{ minWidth: 275 }}>
                         <CardContent>
                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                 Earning
                             </Typography>
                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 {totalCash}$
                             </Typography>
                         </CardContent>
                     </Card>
                 </Grid>
             </Grid>
             <h1 className={classes.offset} align="center"> Movies</h1>
             <Grid container spacing={2} className={classes.offset}>
                 {reservations.map((reservation, index) => {
                     return (
                         <Grid item xs={12} md={4} >
                             <MovieStatCard reservation={reservation}/>
                         </Grid>
                     )
                 })}
             </Grid>
         </Container>

    )


}