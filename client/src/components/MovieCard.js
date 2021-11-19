import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles"
import {API} from "../API/api";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    background: {
        margin: 0,
        height: "85vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: `blur("8px")`,
        backgroundPosition: "center",
        color:"white"
    },
    description: {
        marginTop: "30px",
        maxWidth: "50%",
        color: "#cfd6e1",
        fontWeight: "400",
        lineHeight: "1.5",
        fontSize: "1rem",
    },
    author: {
        paddingTop: "20px",
        color: "blue",
    },
    durability: {
        marginTop:"10px",
        padding: "5px",
        color: "silver",
        border: "1px solid rgba(255,255,255,0.13)",
        width: "60px",
    },

});

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