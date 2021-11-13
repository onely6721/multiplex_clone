import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {Button, InputLabel, Select} from "@mui/material"
import Container from "@mui/material/Container";
import generateArray from "../tools/GenerateArray"
import {useEffect, useState} from "react";
import {API} from "../API/api";

export const SelectShowtime = props => {
    const [date, setDate] = useState()
    const [showtimes, setShowtimes] = useState([])
    const arr1 = [1,2,3,4,5]
    const arr2 = [1,2,3,4,5]
    const handleChange = e => {
        setDate(e.target.value)
    }

    useEffect(() => {
        const getShowtimes = async () => {
            const cinemaId = localStorage.getItem("cinema")
            const params = new URLSearchParams()
            const startDate = moment(date).format("YYYY-MM-DD")
            console.log(date)
            params.append("movieId", props.movieId)
            params.append("cinemaId", cinemaId)
            params.append("startDate", date)


            const response = await API.get("/showtimes/forMovie", {params})
            console.log(response.data)
            setShowtimes(response.data)
        }
        getShowtimes()
    }, date)
    const dates = generateArray(0,7,1)


    return(
        <Container>
            <Box sx={{ minWidth: 120 }}>
                <FormControl  sx={{  minWidth: 120}}>
                    <InputLabel id="select-label" style={{color:"white"}}>Выберите дату</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Выберите день"
                        value={date}
                        onChange={handleChange}
                        style={{color:"white"}}
                    >
                        {dates.map((item,i) => {
                            return (
                                <MenuItem
                                    style={{minWidth:"100%"}}
                                    value={moment().add(i, 'd').format("YYYY-MM-DD")}
                                >
                                    {moment().add(i, 'd').format("YYYY-MM-DD")}
                                </MenuItem>
                            )
                        }).sort()}
                    </Select>
                </FormControl>
                {showtimes.map((showtime, index) => {
                    const dateNow = moment()
                    const dateShowtime = moment(showtime.startDate)
                    if(dateShowtime > dateNow)
                        return (
                            <Button>{showtime.startAt}</Button>
                        )

                }).reverse()}
            </Box>

            <br/>
            <p>rofliki</p>
            <div>
            </div>
        </Container>
    )
}