import {useEffect, useState} from "react";
import {API} from "../../../API/api";
import {UsersDialog} from "./UsersDialog/UsersDialog";
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





export const AdminUsersPage = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (user) => {
        setUsers(
            users.filter((item) => {
                if(item._id !== user._id)
                    return item
        }))
        await API.delete("/users/"+users._id)
    }


    const handleUpdate = async (user) => {

        const newUsers = users.map((item, index) => {
                if (item._id === user._id)
                    return user
                return  item
            })

        setUsers([...newUsers])
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await API.get("/users")
                setUsers(response.data)
            } catch (e) {
                console.log(e.message)
            }
        }
        getUsers()
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
            <h1 align="center">Users</h1>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">E-mail</TableCell>
                                <TableCell align="right">First name</TableCell>
                                <TableCell align="right">Second name</TableCell>
                                <TableCell align="right">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : users
                            ).map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.firstName}</TableCell>
                                    <TableCell align="right">{user.secondName}</TableCell>
                                    <TableCell align="right">{user.role}</TableCell>
                                    <TableCell align="right">
                                        <UsersDialog update={handleUpdate} user={user} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(user)}
                                        >
                                            Delete
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={users.length}
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