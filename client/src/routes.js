import React, {useContext} from 'react'
import {
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {MovieDetailPage} from "./pages/MovieDetailPage";
import {ReservationPage} from "./pages/ReservationPage";
import {AuthContext} from "./context/AuthContext";
import {ShowReservationPage} from "./pages/ShowReservationPage";
import {AdminPage} from "./pages/Admin/AdminPage";
import {AdminMoviesPage} from "./pages/Admin/AdminMoviesPage/AdminMoviesPage";
import {AdminCinemasPage} from "./pages/Admin/AdminCinemasPage/AdminCinemasPage";
import {AdminHallsPage} from "./pages/Admin/AdminHallsPage/AdminHallsPage"
import {AdminShowtimesPage} from "./pages/Admin/AdminShowtimePage/AdminShowtimesPage";
import {AdminReservationsPage} from "./pages/Admin/AdminReservationPage/AdminReservationsPage";

export const useRoutes = isAuthenticated => {

        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/admin" element={<AdminPage/>}>
                    <Route path="films" element={<AdminMoviesPage/>}/>
                    <Route path="cinemas" element={<AdminCinemasPage/>}/>
                    <Route path="halls" element={<AdminHallsPage/>}/>
                    <Route path="showtimes" element={<AdminShowtimesPage/>}/>
                    <Route path="reservations" element={<AdminReservationsPage/>}/>
                </Route>
                <Route path="/detail/:id" element={<MovieDetailPage/>}/>
                <Route path="/reservation/:id" element={<ReservationPage/>}/>
                <Route path="*" element={<Navigate to ="/" />}/>
                {isAuthenticated &&  <Route path="/profile" element={<ShowReservationPage/>}/>}

            </Routes>
        )


}