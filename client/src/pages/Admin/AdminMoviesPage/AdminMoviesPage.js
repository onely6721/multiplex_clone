import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, useTheme
} from "@mui/material";

import {useEffect, useState} from "react";
import moment from "moment";
import {API} from "../../../API/api";
import {MoviesDialog} from "./MoviesDialog/MoviesDialog";
import {TablePaginationActions} from "../TablePaginationActions";
const nullMovie = {
    title: null,
    genre: [],
    ratingIMDB: null,
    director: null,
    duration: null,
    releaseDate: null,
    endDate: null,
    description: null,
    language: null,
    cast: null,
}

export const AdminMoviesPage = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (movie) => {
        setMovies(
            movies.filter((item) => {
            if(item._id !== movie._id)
                return item
        }))
        await API.delete("/movies/"+movie._id)
    }

    const handleCreate = async (movie) => {
        setMovies([...movies, movie])
    }

    const handleUpdate = async (movie) => {

          const newMovies = movies.map((item, index) => {
              if (item._id === movie._id) {
                  return movie
              }
              return  item
          })
         setMovies([...newMovies])
    }
    useEffect(() => {
       const getMovies = async () => {
           try {
               const response = await API.get("/movies")
               setMovies(response.data)
           } catch (e) {
                console.log(e.message)
           }
       }
       getMovies()
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
            <h1 align="center">Films
                <MoviesDialog create={handleCreate} method="POST" movie={nullMovie}/>
            </h1>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Language</TableCell>
                                <TableCell align="right">Director</TableCell>
                                <TableCell align="right">Rating IMDB</TableCell>
                                <TableCell align="right">Release Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : movies
                            ).map((movie) => (
                                <TableRow key={movie._id}>
                                    <TableCell component="th" scope="row">
                                        {movie.title}
                                    </TableCell>
                                    <TableCell align="right">{movie.language}</TableCell>
                                    <TableCell align="right">{movie.director}</TableCell>
                                    <TableCell align="right">{movie.ratingIMDB}</TableCell>
                                    <TableCell align="right">{moment(movie.releaseDate).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{moment(movie.endDate).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{movie.duration}</TableCell>
                                    <TableCell align="right">
                                        <MoviesDialog update={handleUpdate} movie={movie} method="PUT"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            style={{color: "red"}}
                                            onClick={() => handleDelete(movie)}
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
                                    count={movies.length}
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