import {useEffect, useState} from "react";
import {API} from "../../../API/api";
import {HallsDialog} from "./HallsDialog";
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


const nullHall = {
    rows: null,
    columns: null,
    cinema: null,
    name: null
}

export const AdminHallsPage = () => {
    const [halls, setHalls] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (hall) => {
        setHalls(
            halls.filter((item) => {
                if(item._id != hall._id)
                    return item
        }))
        await API.delete("/halls/"+hall._id)
    }

    const handleCreate = async (hall) => {
        const cinema = await API.get("/cinemas/"+hall.cinema)
        setHalls([...halls, {...hall, cinemaName: cinema.data.name}])
    }

    const handleUpdate = async (hall) => {

        const newHalls =  await Promise.all(
            halls.map(async (item, index) => {
                if (item._id == hall._id){
                    const cinema = await  API.get("/cinemas/"+hall.cinema)
                    return {
                        ...hall,
                        cinemaName: cinema.data.name
                    }
                }
                return  item
            })
        )
        setHalls([...newHalls])
    }

    useEffect(() => {
        const getHalls = async () => {
            try {
                const response = await API.get("/halls")
                const tempHalls = await Promise.all(response.data.map(async (hall, index) => {
                   const cinema = await API.get("/cinemas/"+hall.cinema)
                   return {
                       ...hall,
                       cinemaName: cinema.data.name
                   }
                }))
                console.log(tempHalls)
                setHalls(tempHalls)
            } catch (e) {
                console.log(e.message)
            }
        }
        getHalls()
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
            <HallsDialog  create={handleCreate} hall={nullHall} method="POST"/>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Название</TableCell>
                                <TableCell align="right">Кинотеатр</TableCell>
                                <TableCell align="right">Рядов</TableCell>
                                <TableCell align="right">Мест</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? halls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : halls
                            ).map((hall) => (
                                <TableRow key={hall._id}>
                                    <TableCell align="right">{hall.name}</TableCell>
                                    <TableCell align="right">{hall.cinemaName}</TableCell>
                                    <TableCell align="right">{hall.rows}</TableCell>
                                    <TableCell align="right">{hall.columns}</TableCell>
                                    <TableCell align="right">
                                        <HallsDialog  update={handleUpdate} hall={hall} method="PUT"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(hall)}
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
                                    count={halls.length}
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