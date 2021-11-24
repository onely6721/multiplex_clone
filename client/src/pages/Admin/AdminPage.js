import {Route, Routes} from "react-router-dom"
import React from "react";
import {AdminMoviesPage} from "./AdminMoviesPage/AdminMoviesPage";
import {AdminCinemasPage} from "./AdminCinemasPage";
import {AdminHallsPage} from "./AdminHallsPage";
import {AdminShowtimesPage} from "./AdminShowtimesPage";
import {AdminReservationsPage} from "./AdminReservationsPage";

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