import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    hall: {
        display: "grid",
        gridColumnGap: "30px",
        gridRowGap:"10px",
        padding: "50px",
        '@media (max-width: 800px)': {
            width: "100%",
            overflow: "scroll",
            padding: 10
        }

    },
    movieTitle: {
        color: "orange"
    },
    reservationCheckout: {
        padding: "10px"
    },
    buttonCheckout: {
        color:"red",
        borderColor: "red !important",
    }

});