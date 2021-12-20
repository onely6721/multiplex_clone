import {MoviesList} from "../../../components/MoviesList/MoviesList";
import {useEffect, useState} from "react";
import {API} from "../../../API/api";

export const MoviesPage = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const getMovies = async () => {
            const response = await API.get("/movies")
            setMovies(response.data)
        }
        getMovies()
    }, [])

    return (
        <div>
            <MoviesList movies={movies}/>
        </div>

    );
}