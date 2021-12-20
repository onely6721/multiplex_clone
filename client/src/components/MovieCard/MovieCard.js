import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {API} from "../../API/api";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useStyles} from "./Styles";


export const MovieCard = props => {
    const classes = useStyles()

    return (
        <div className={classes.background} style={{
            backgroundImage: `url(${"http://localhost:5000/resource/images/" + props.movie.image})`,
        }}>
            <Link to={`/detail/${props.movie._id}`}>
            <div className="movie-card">
                <Container>
                    <h1 style={{ paddingTop:"20%", }}>
                        {props.movie.title}
                    </h1>
                    <Typography className={classes.description}>
                        {props.movie.description}
                    </Typography>
                    <Typography className={classes.author}>
                        {props.movie.director}
                    </Typography>
                    <Box className={classes.durability}>
                        {props.movie.duration}
                    </Box>
                </Container>
            </div>
            </Link>
         </div>
    )
}