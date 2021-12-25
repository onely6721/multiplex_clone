import {MovieSlider} from "../../../components/MovieSlider/MovieSlider";
import {MovieCard} from "../../../components/MovieCard/MovieCard";
import {useEffect, useState} from "react";
import {API} from "../../../API/api";


export const MainPage = () => {
    const [movie, setMovie] = useState({})

    useEffect(()=> {
        const getRandomMovie = async () => {
            try {
                const randomMovie = await API.get("/movies/random")
                setMovie(randomMovie.data[0])
            } catch (e) {
                console.log(e.message)
            }

        }
        getRandomMovie()
    },[])

    return (
        <div className="App" >
            {movie
                ?
                <>
                    <MovieCard movie={movie} link={movie}/>
                    <MovieSlider/>
                </>
                :
                    <h1>No films yet</h1>
            }

        </div>
    );
}