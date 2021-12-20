import React from 'react'
import {
    Routes,
    Route,
    Navigate,

} from "react-router-dom";
import {MainPage} from "./pages/Public/MainPage/MainPage";
import {MovieDetailPage} from "./pages/Public/MovieDetailPage/MovieDetailPage";
import {ReservationPage} from "./pages/Public/ReservationPage/ReservationPage";
import {UserReservationPage} from "./pages/User/UserReservationPage/UserReservationPage";
import {AdminPage} from "./pages/Admin/AdminPage";
import {AdminMoviesPage} from "./pages/Admin/AdminMoviesPage/AdminMoviesPage";
import {AdminCinemasPage} from "./pages/Admin/AdminCinemasPage/AdminCinemasPage";
import {AdminHallsPage} from "./pages/Admin/AdminHallsPage/AdminHallsPage"
import {AdminShowtimesPage} from "./pages/Admin/AdminShowtimePage/AdminShowtimesPage";
import {AdminReservationsPage} from "./pages/Admin/AdminReservationPage/AdminReservationsPage";
import {MoviesPage} from "./pages/Public/MoviesPage/MoviesPage";

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
                <Route path="/movies" element={<MoviesPage/>}/>
                <Route path="*" element={<Navigate to ="/" />}/>
                {isAuthenticated &&  <Route path="/profile" element={<UserReservationPage/>}/>}

            </Routes>
        )


}