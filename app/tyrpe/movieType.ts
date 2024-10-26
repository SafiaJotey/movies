export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }
  export interface MovieListProps {
    [x: string]: any;
    movies: Movie[];
  }

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}