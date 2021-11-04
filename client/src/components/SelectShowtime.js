import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {InputLabel, Select} from "@material-ui/core";
import Container from "@mui/material/Container";

export const SelectShowtime = () => {
    return(
        <Container>
            <Box sx={{ minWidth: 120 }}>
                <FormControl  sx={{ m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label" style={{color:"white"}}>Выберите дату</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Выберите день"
                        style={{color:"white"}}
                    >
                        <MenuItem style={{minWidth:"100%"}} value={1}>{moment().format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={2}>{moment().add(1, 'd').format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={3}>{moment().add(2, 'd').format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={4}>{moment().add(3, 'd').format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={5}>{moment().add(4, 'd').format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={6}>{moment().add(5, 'd').format("DD-MM-YYYY")}</MenuItem>
                        <MenuItem style={{minWidth:"100%"}} value={7}>{moment().add(6, 'd').format("DD-MM-YYYY")}</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Container>


    )
}