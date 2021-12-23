import {Route, Routes} from "react-router-dom"
import React, {useContext, useEffect, useState} from "react";
import {AdminMoviesPage} from "./AdminMoviesPage/AdminMoviesPage";
import {AdminCinemasPage} from "./AdminCinemasPage/AdminCinemasPage";
import {AdminHallsPage} from "./AdminHallsPage/AdminHallsPage";
import {AdminShowtimesPage} from "./AdminShowtimePage/AdminShowtimesPage";
import {AdminReservationsPage} from "./AdminReservationPage/AdminReservationsPage";
import {AuthContext} from "../../context/AuthContext";
import {parseJwt} from "../../utils/ParseJWT";
import {AdminStatsPage} from "./AdminStatsPage/AdminStatsPage";
import {AdminUsersPage} from "./AdminUsersPage/AdminUsersPage";

export const AdminPage = () => {

    const [role, setRole] = useState(null)
    const {isAuth} = useContext(AuthContext)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const jwtPayload =  parseJwt(token)
            console.log(jwtPayload)
            setRole(jwtPayload.role)
        } else {
            setRole(null)
        }
    }, [isAuth])

    if (role === 'admin')
        return (
                <Routes>
                    <Route path="/stats" element={<AdminStatsPage/>}/>
                    <Route path="/films" element={<AdminMoviesPage/>}/>
                    <Route path="/cinemas" element={<AdminCinemasPage/>}/>
                    <Route path="/halls" element={<AdminHallsPage/>}/>
                    <Route path="/showtimes" element={<AdminShowtimesPage/>}/>
                    <Route path="/reservations" element={<AdminReservationsPage/>}/>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                </Routes>

        )
    else
        return (
            <div align='center'>
                <h1>Нету доступа!</h1>
                <h1>Нету доступа!</h1>
                <h1>Нету доступа!</h1>
                <h1>Нету доступа!</h1>
                <h1>Нету доступа!</h1>
                <h1>Нету доступа!</h1>
            </div>
        )

}