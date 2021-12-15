import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";



export const Logo = () => {
    return (
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color:"white"}}
        >
            <Link
                to="/"
                style={{color: "white"}}
            >
                MXC
            </Link>
        </Typography>
    )
}