import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies } from "../api/moviesApi";
import { RootState } from "../store";
import { IMovie, IMoviesState } from "../types/movieTypes";


const initialState: IMoviesState = {
  movies: [],
  totalResults: 0,
  status: "idle",
  error: null,
};

interface FetchMoviesPayload {
  page: number;
  search: string;
  type: string;
  year: string;
}

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, search, type, year }: FetchMoviesPayload, { rejectWithValue }) => {
    try {
      const response = await fetchMovies(page, search, type, year);
      return response;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action: PayloadAction<{Search:IMovie[],totalResults:number}>) => {
        state.status = "succeeded";
        console.log("action.payload :>> ", action.payload);
        state.movies = action.payload.Search;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Convert the payload to string
      });
  },
});

export const selectAllMovies = (state: RootState) => state.movies;
export default moviesSlice.reducer;
