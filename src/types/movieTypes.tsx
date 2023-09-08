export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IMoviesState {
  movies: IMovie[];
  totalResults: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IMovieDetail extends IMovie{
  Director: string;
  Writer: string;
  Actors:string;
  Plot: string;
  Language: string;
  Awards: string;
  Type: string;
  Runtime: string;
}
