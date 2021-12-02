import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
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