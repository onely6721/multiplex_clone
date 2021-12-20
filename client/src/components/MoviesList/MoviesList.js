import {MovieCard} from "../MovieCard/MovieCard";
import {Grid} from "@mui/material";


export const MoviesList = props => {

    return (
        <Grid container spacing={2}>
            {props.movies.map((movie, index) => {
                return (
                        <Grid item  md={4} >
                            <MovieCard movie={movie}/>
                        </Grid>
                )
            })}
        </Grid>

    );
}