import {useParams} from "react-router-dom";
import {MovieDescription} from "../components/MovieDescription";
import {SelectShowtime} from "../components/SelectShowtime";




export const MovieDetailPage = () => {
    const movieId = useParams().id

    return (
        <div>
            <MovieDescription movieId={movieId} />
            <SelectShowtime movieId={movieId}/>
        </div>

    );
}