import {useEffect, useState} from "react";
import {API} from "../../../API/api";
import {CinemasDialog} from "./CinemasDialog/CinemasDialog";
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
import moment from "moment";
import {TablePaginationActions} from "../TablePaginationActions";

const nullCinema = {
    name: null,
    address:null,
    file: null,
    city: null,
}

export const AdminCinemasPage = () => {
    const [cinemas, setCinemas] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (cinema) => {
        setCinemas(
            cinemas.filter((item) => {
                if(item._id !== cinema._id)
                    return item
            }))
        await API.delete("/cinemas/"+cinema._id)
    }

    const handleCreate = async (cinema) => {
        setCinemas([...cinemas, cinema])
    }

    const handleUpdate = async (cinema) => {

        const newCinemas = cinemas.map((item, index) => {
            if (item._id === cinema._id) {
                return cinema
            }
            return  item
        })
        setCinemas([...newCinemas])
    }

    useEffect(() => {
        const getCinemas = async () => {
            try {
                const response = await API.get("/cinemas")
                setCinemas(response.data)
            } catch (e) {
                console.log(e.message)
            }
        }
        getCinemas()
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
            <h1 align="center">Cinemas</h1>
            <div align="center">
                <CinemasDialog create={handleCreate}  cinema={nullCinema} method="POST"/>
            </div>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? cinemas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : cinemas
                            ).map((cinema) => (
                                <TableRow key={cinema._id}>
                                    <TableCell align="right">{cinema.name}</TableCell>
                                    <TableCell align="right">{cinema.address}</TableCell>
                                    <TableCell align="right">{cinema.city}</TableCell>
                                    <TableCell align="right">
                                        <CinemasDialog update={handleUpdate} cinema={cinema} method="PUT"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(cinema)}
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
                                    count={cinemas.length}
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