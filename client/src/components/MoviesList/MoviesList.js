import {MovieCard} from "../MovieCard/MovieCard";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";

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