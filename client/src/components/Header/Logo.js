import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  logo: {
      '@media (max-width: 500px)': {
          display: "none"
      }
  }
});

export const Logo = () => {
    const classes = useStyles()
    return (
        <Typography
            className={classes.logo}
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