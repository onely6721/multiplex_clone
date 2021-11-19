import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {API} from "../API/api";
import { makeStyles } from "@mui/styles"

import Container from "@mui/material/Container";
const useStyles = makeStyles({
    title: {
        position: "absolute",
        top: "40%",
        left: "30%",
        color: "white",
    },
    movieImage: {
        '&:hover': {
            background:` rgba("0, 0, 0, 0.5")`,
        }
    }


});
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}



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
                                <div key={movie._id}>
                                    <img
                                        className={classes.movieImage} src={`http://localhost:5000/resource/images/${movie.image}`}
                                         alt=""
                                    />
                                    <Link
                                        to={`/detail/${movie._id}`}
                                        className={classes.title}
                                    >
                                        {movie.title}
                                    </Link>
                                </div>
                            )
                        })}
                    </Slider>
                </Container>

            </div>
        );
}