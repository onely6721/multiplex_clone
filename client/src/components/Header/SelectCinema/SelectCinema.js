import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {API} from "../../../API/api";


export const SelectCinema = props => {
    const cities = ['Chernihiv', 'Kiev', 'Lviv', 'Odessa', 'Kharkiv']
    const [cinemas, setCinemas] = useState([])


    useEffect(()=> {
        const getCinemas = async () => {
            const selectedCinemas = await API.get("/cinemas/")
            setCinemas(selectedCinemas.data)
        }
        getCinemas()
    }, [])


    const handleSelect = (e) => {
        localStorage.setItem("cinema", e.target.value)
    }


    return (
        <FormControl sx={{ m: 1,  minWidth: 120}}>
            <InputLabel
                htmlFor="grouped-select"
                style={{color:"white"}}
            >
                Cinema
            </InputLabel>
            <Select
                id="grouped-select"
                label="Grouping"
                defaultValue={localStorage.getItem("cinema")}
                style={{color:"white"}}
                onChange={handleSelect}
            >

                {cities.map((city, i) => {
                    return [
                        <ListSubheader>{city}</ListSubheader>,
                        cinemas.filter((cinema,index) => {
                            if(cinema.city === city)
                                return (
                                  cinema
                                )
                        }).map((cinema, index) => {
                            return (
                                <MenuItem
                                    key={cinema._id}
                                    value={cinema._id}
                                >
                                    {cinema.name}
                                </MenuItem>
                            )
                        })
                    ]
                })}
            </Select>
        </FormControl>
    )
}