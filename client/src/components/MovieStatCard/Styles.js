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
   reservationCount: {
        marginTop: '30px',
        color: "orange"
   },
    cash: {
        marginTop: '30px',
        color: "green"
    }
});