import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    background: {
        margin: 0,
        height: "500px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: `blur("8px")`,
        backgroundPosition: "center",
        color:"white"
    },
    reservationTitle: {
        marginTop: "100px"
    },
    offset: {
        marginTop: "30px"
    }
});