import {Button} from "@mui/material";
import {useState} from "react";

const green = '#39D1B4'
const blue = "blue"

export const Seat = props => {
    const [selected,setSelected] = useState(false)

    return (
        <div onClick={props.customClick}>
            <Button
                disabled={props.disabled}
                variant="outlined"
                onClick={()=>{setSelected(!selected)}}
                style={{
                    width: "100%",
                    height: "100%",
                    color:
                        props.disabled
                            ?
                            "grey"
                            :
                                selected ? green : "#fcc93d",
                    borderColor:
                        props.disabled
                            ?
                                "grey"
                            :
                                selected ? green : "#fcc93d",
                }}
            >
                {props.column}
            </Button>
        </div>
    )
}