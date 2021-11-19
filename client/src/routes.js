import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {MovieDetailPage} from "./pages/MovieDetailPage";
import {ReservationPage} from "./pages/ReservationPage";

export const useRoutes = isAuthenticated => {

        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/detail/:id" element={<MovieDetailPage/>}/>
                <Route path="/reservation/:id" element={<ReservationPage/>}/>
            </Routes>
        )


}