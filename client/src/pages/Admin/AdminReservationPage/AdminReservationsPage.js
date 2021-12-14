import {useEffect, useState} from "react";
import {API} from "../../../API/api";
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import {TablePaginationActions} from "../TablePaginationActions";
import {ReservationDialog} from "./ReservationsDialog";

const nullReservation = {
    showtime: "61a2323b94e07675d9110d14",
    row: null,
    column: null,
    owner: null
}

export const AdminReservationsPage = () => {
    const [reservations, setReservations] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (reservation) => {
        setReservations(
            reservations.filter((item) => {
                if(item._id !== reservation._id)
                    return item
            }))
        await API.delete("/reservations/"+reservation._id)
    }

    const handleCreate = async (reservation) => {
        const user = await API.get("/users/"+reservation.owner)
        setReservations([...reservations, {...reservation, userName: user.data.username}])
    }

    const handleUpdate = async (reservation) => {
        const newReservations =  await Promise.all(
            reservations.map(async (item, index) => {
                if (item._id === reservation._id){
                    const user = await API.get("/users/"+reservation.owner)
                    return {
                        ...reservation,
                        userName: user.data.username
                    }
                }
                return  item
            })
        )
        setReservations([...newReservations])

    }

    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await API.get("/reservations")
                const tempReservations = await Promise.all(response.data.map(async (reservation, index) => {
                    const user = await API.get("/users/"+reservation.owner)
                    return {
                        ...reservation,
                        userName: user.data.username
                    }
                }))
                setReservations(tempReservations)
            } catch (e) {
                console.log(e.message)
            }
        }
        getReservations()
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div style={{color:"white", marginTop:"100px"}}>
            <h1 align="center">Halls</h1>
            <ReservationDialog
                create={handleCreate}
                reservation={nullReservation}
                method="POST"
            />
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ShowtimeId</TableCell>
                                <TableCell align="right">ряд</TableCell>
                                <TableCell align="right">місце</TableCell>
                                <TableCell align="right">Власник</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : reservations
                            ).map((reservation) => (
                                <TableRow key={reservation._id}>
                                    <TableCell align="right">{reservation.showtime}</TableCell>
                                    <TableCell align="right">{reservation.row}</TableCell>
                                    <TableCell align="right">{reservation.column}</TableCell>
                                    <TableCell align="right">{reservation.userName}</TableCell>
                                    <TableCell align="right">
                                        <ReservationDialog
                                            update={handleUpdate}
                                            create={handleCreate}
                                            reservation={reservation}
                                            method="PUT"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(reservation)}
                                        >
                                            Delete
                                        </Button><
                                    /TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={reservations.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}