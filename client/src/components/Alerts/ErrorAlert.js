import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

export const ErrorAlert = props => {
    const [open, setOpen] = useState(true)
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}