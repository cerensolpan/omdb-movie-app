import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { IMovie } from "../types/movieTypes";
import '../style/Table.scss'

interface ITableComponentProps {
  movies: IMovie[];
}

function TableComponent({ movies }: ITableComponentProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">IMDb ID</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies?.map((movie: IMovie) => (
            <TableRow
              key={movie.imdbID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  width="25%"
                  height="25%"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </TableCell>

              <TableCell align="right">{movie.Title}</TableCell>

              <TableCell align="right">{movie.Year}</TableCell>

              <TableCell align="right">{movie.imdbID}</TableCell>
              <TableCell align="right">
                <Button className="custom-button" variant="contained">
                  <Link className="custom-link" to={`/movie/${movie.imdbID}`}>Movie Detail</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
