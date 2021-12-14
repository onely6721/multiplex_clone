import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {API} from "../../API/api";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useStyles} from "./Styles";


export const MovieCard = () => {
    const [movie, setMovie] = useState({})
    const [link, setLink] = useState()
    const classes = useStyles()
    useEffect(()=> {
        const getRandomMovie = async () => {
            const randomMovie = await API.get("/movies/by/random")
            const newLink = "http://localhost:5000/resource/images/" + randomMovie.data.image
            setLink(newLink)
            setMovie(randomMovie.data)
        }
        getRandomMovie()
    },[])


    return (
        <div className={classes.background} style={{
            backgroundImage: `url(${link})`,
        }}>
            <div className="movie-card">
                <Container>
                    <Link to={`/detail/${movie._id}`}>
                        <h1 style={{ paddingTop:"20%", }}>
                            {movie.title}
                        </h1>
                    </Link>
                    <Typography className={classes.description}>
                        {movie.description}
                    </Typography>
                    <Typography className={classes.author}>
                        {movie.director}
                    </Typography>
                    <Box className={classes.durability}>
                        {movie.duration}
                    </Box>
                </Container>
            </div>
        </div>
    )
}