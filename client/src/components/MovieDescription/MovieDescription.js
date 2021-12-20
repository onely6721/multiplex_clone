import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material"
import moment from "moment";
import {useEffect, useState} from "react";
import {API} from "../../API/api";
import {useStyles} from "./Styles";




export const MovieDescription = props => {
    const classes = useStyles()
    const [movie, setMovie] = useState({})
    const [link, setLink] = useState()
    useEffect(()=> {
        const getMovie = async () => {
            const selectMovie = await API.get("/movies/" + props.movieId)
            setMovie(selectMovie.data)
            setLink("http://localhost:5000/resource/images/" + selectMovie.data.image)
        }
        getMovie()

    },[])

    return (
        <Container className={classes.container}>
            <h2 align="center">{movie.title}</h2>
            <Grid container spacing={2} className={classes.params}>
                <Grid item  md={3} className={classes.description}>
                    <img src={link} className={classes.poster} alt=""/>
                </Grid>
                <Grid item  md={2} >
                    <Typography>Період прокату:</Typography>
                    <Typography>Рейтинг Imdb:</Typography>
                    <Typography>Режисер:</Typography>
                    <Typography>Жанри:</Typography>
                    <Typography>Мова:</Typography>
                    <Typography>Тривалість:</Typography>
                </Grid>
                <Grid item  md={4} className={classes.description}>
                    <Typography>
                        {moment(movie.releaseDate).format("DD-MM-YYYY").toString()}
                        /
                        {moment(movie.endDate).format("DD-MM-YYYY").toString()}
                    </Typography>
                    <Typography>{movie.ratingIMDB}</Typography>
                    <Typography>{movie.director}</Typography>
                    <Typography>{ movie.genre  && movie.genre.map((item) => " " +item)}</Typography>
                    <Typography>{movie.language}</Typography>
                    <Typography>{movie.duration}</Typography>
                </Grid>
            </Grid>
            <br/>
            <Typography className={classes.description}>{movie.description}</Typography>

        </Container>
    )
}