import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    background: {
        margin: 0,
        height: "auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: `blur("8px")`,
        backgroundPosition: "center",
        color:"white"
    },
    description: {
        marginTop: "30px",
        maxWidth: "50%",
        maxHeight: "200px",
        display: "-webkit-box",
        "-webkit-line-clamp": 5,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        color: "#cfd6e1",
        fontWeight: "400",
        lineHeight: "1.5",
        fontSize: "1rem",
        '@media (max-width: 500px)': {
            maxWidth: "100%",
        }
    },
    author: {
        paddingTop: "20px",
        color: "blue",
    },
    durability: {
        marginTop:"10px",
        padding: "5px",
        color: "silver",
        border: "1px solid rgba(255,255,255,0.13)",
        width: "60px",
    },

});