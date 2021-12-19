import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    modal: {
        textAlign: "center",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white !important',
        color:"black",
        border: '2px solid #000',
        boxShadow: 24,
        padding: "10px",
        p: 4,
    }

});