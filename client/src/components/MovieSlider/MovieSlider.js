import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {API} from "../../API/api";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";
import {useStyles} from "./Styles";
import {settings} from "./SliderSettings";


export const MovieSlider  = () => {
        const [movies, setMovies] = useState([])
        const classes = useStyles()

        useEffect( () => {
            const getMovies = async () => {
                const tempMovies = await API.get("/movies")
                setMovies(tempMovies.data)
                console.log(tempMovies)
            }
            getMovies()
        },[])

        return (
            <div  style={{
                marginTop:"30px",
            }}>
                <Container>
                    <h1 style={{color:"white", marginBottom:"30px"}}>Сейчас в прокате</h1>
                    <Slider {...settings}>
                        {movies.map((movie, index) => {
                            return(
                                <Link key={movie._id}  to={`/detail/${movie._id}`}>
                                    <img src={`http://localhost:5000/resource/images/${movie.image}`}/>
                                     <Typography   align="center" component="h4"> {movie.title}</Typography>
                                </Link>
                            )
                        })}
                    </Slider>
                </Container>

            </div>
        );
}