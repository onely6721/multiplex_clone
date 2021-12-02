
import {MovieSlider} from "../../components/MovieSlider/MovieSlider";
import {MovieCard} from "../../components/MovieCard/MovieCard";


export const MainPage = () => {
    return (
        <div className="App" >
            <MovieCard/>
            <MovieSlider/>
        </div>
    );
}