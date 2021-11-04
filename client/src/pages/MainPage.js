
import {MovieSlider} from "../components/MovieSlider";
import {MovieCard} from "../components/MovieCard";


export const MainPage = () => {
    return (
        <div className="App" >
            <MovieCard/>
            <MovieSlider/>
        </div>
    );
}