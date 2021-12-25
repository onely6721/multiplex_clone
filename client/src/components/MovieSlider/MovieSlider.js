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
import {MovieCard} from "../MovieCard/MovieCard";


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
                    <h1 style={{color:"white", marginBottom:"30px"}}>Shows</h1>
                    <Slider {...settings}>
                        {movies.map((movie, index) => {
                            return (
                                <MovieCard  height="400px" other={false} movie={movie}/>
                            )
                        })}
                    </Slider>
                </Container>
            </div>
        );
}