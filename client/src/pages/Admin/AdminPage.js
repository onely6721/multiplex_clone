import {Route, Routes} from "react-router-dom"
import React from "react";
import {AdminMoviesPage} from "./AdminMoviesPage/AdminMoviesPage";
import {AdminCinemasPage} from "./AdminCinemasPage/AdminCinemasPage";
import {AdminHallsPage} from "./AdminHallsPage/AdminHallsPage";
import {AdminShowtimesPage} from "./AdminShowtimePage/AdminShowtimesPage";
import {AdminReservationsPage} from "./AdminReservationPage/AdminReservationsPage";

export const AdminPage = () => {
    return (
            <Routes>
                <Route path="/films" element={<AdminMoviesPage/>}/>
                <Route path="/cinemas" element={<AdminCinemasPage/>}/>
                <Route path="/halls" element={<AdminHallsPage/>}/>
                <Route path="/showtimes" element={<AdminShowtimesPage/>}/>
                <Route path="/reservations" element={<AdminReservationsPage/>}/>
            </Routes>

    );
}