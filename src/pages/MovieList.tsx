import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers";

import Table from "../components/Table";
import "../style/MovieList.scss";
import Pagination from "../components/Pagination";
import { fetchMoviesAsync, selectAllMovies } from "../reducer/moviesSlice";
import LoadingCircle from "../components/LoadingCircle";

function MovieList() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { movies, totalResults, status } = useSelector(selectAllMovies);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("Pokemon");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    dispatch(
      fetchMoviesAsync({ page: page, search: search, type: type, year: year })
    );
  }, [dispatch, page, search, type, year]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        <h1 className="movie-header">Movie List</h1>

        <div className="movie-filters">
          <TextField
            label="Search by Movie Name"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: "25ch" }}
          />

          <DatePicker
            views={["year"]}
            onChange={(newValue: any) => {
              setYear(newValue.$y);
            }}
            sx={{ mx: 2, width: "25ch" }}
          />
          <TextField
            select
            label="Filter by Movie Type"
            variant="outlined"
            value={type}
            onChange={handleTypeChange}
            sx={{ width: "25ch" }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="game">Game</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </TextField>
        </div>
        {status === "loading" ? (
          <LoadingCircle />
        ) : movies ? (
          <Table movies={movies} />
        ) : (
          <div className="movie-empty">There is no movie.</div>
        )}

        <div className="pagination-container">
          <Pagination
            totalResults={totalResults}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieList;
