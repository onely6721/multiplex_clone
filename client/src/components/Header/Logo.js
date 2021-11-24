import {Typography} from "@mui/material";
import {Link} from "react-router-dom";


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
                Multiplex Clone
            </Link>
        </Typography>
    )
}