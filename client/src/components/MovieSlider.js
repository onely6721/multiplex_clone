import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {API} from "../API/api";
import { makeStyles } from "@mui/styles"
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

const useStyles = makeStyles({
    title: {
        position: "absolute",
        top: "40%",
        color: "white",
    },
    movieImage: {
        '&:hover': {
            background:` rgba("0, 0, 0, 0.5")`,
        }
    },
    slide: {
        zIndex: -1000,
    },


});
const settings = {
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    adaptiveHeight: true,
    dots: true,

    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1250,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 1
            }
        }
    ]
};



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