import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@mui/material";

import { fetchMovieDetails } from "../api/movieApi";
import { IMovieDetail } from "../types/movieTypes";

import "../style/MovieDetail.scss";
import "../style/Table.scss";
import LoadingCircle from "../components/LoadingCircle";

function MovieDetail() {
  const { id } = useParams<{ id: string | undefined }>();
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <div className="movie-detail-button">
        <Button className="custom-button" size="medium" variant="contained">
          <Link className="custom-link" to={`/`}>
            Back to Movies
          </Link>
        </Button>
      </div>
      {loading ? (
        <LoadingCircle />
      ) : movie ? (
        <div className="movie-detail">
          <div className="movie-content">
            <div className="movie-header">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h1 className="movie-title">{movie.Title}</h1>
                <p className="movie-year">
                  <span className="director-label">Year: </span>
                  {movie.Year}
                </p>
                <p className="movie-runtime">
                  <span className="director-label">Runtime: </span>
                  {movie.Runtime}
                </p>
                <p className="movie-director">
                  <span className="director-label">Director: </span>{" "}
                  {movie.Director}
                </p>
                <p className="movie-writer">
                  <span className="director-label">Writer: </span>{" "}
                  {movie.Writer}
                </p>
                <p className="movie-actors">
                  <span className="director-label">Actors: </span>
                  {movie.Actors}
                </p>
                <p className="movie-awards">
                  <span className="director-label">Awards: </span>{" "}
                  {movie.Awards}
                </p>
                <p className="movie-type">
                  <span className="director-label">Type: </span> {movie.Type}
                </p>
                <div className="movie-description">
                  <h2>Description</h2>
                  <p className="movie-plot">{movie.Plot}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="movie-empty">Movie Detail is not found.</div>
      )}
    </div>
  );
}

export default MovieDetail;
