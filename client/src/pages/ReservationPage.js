import generateArray from "../tools/GenerateArray";
import {Button, Container} from "@mui/material";


export const ReservationPage = () => {
    const rows = generateArray(1,11,1)
    const columns = generateArray(1,11,1)
    return (
        <Container>
            <div style={{
                marginTop:"100px",
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gridColumnGap: "10px",
                gridRowGap:"10px"
            }}>

                {rows.map((item, index) => {
                    return(
                        columns.map((item2, index2) => {
                            return (
                                <Button variant="outlined">{item2}</Button>
                            )
                        })
                    )
                })}
            </div>
        </Container>


    );
}