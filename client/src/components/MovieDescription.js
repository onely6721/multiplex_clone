import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material"
import moment from "moment";
import {makeStyles} from "@mui/styles"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API} from "../API/api";


const useStyles = makeStyles({
    container : {
        marginTop: 100,
        color:"white"
    },
    poster:{
        boxShadow: "3px 3px 5px 6px #ccc"
    },
    description: {
        color: "silver"
    },

});



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
            <Typography component="h1" align="center">{movie.title}</Typography>
            <Grid container spacing={2}>
                <Grid item  md={3} className={classes.description}>
                    <img src={link} className={classes.poster} alt=""/>
                    <Button variant="outlined" color="primary">Дивись трейлеру</Button>
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
                    <Typography>/</Typography>
                    <Typography>{movie.language}</Typography>
                    <Typography>{movie.duration}</Typography>
                </Grid>
            </Grid>
            <Typography className={classes.description}>{movie.description}</Typography>
        </Container>
    )
}