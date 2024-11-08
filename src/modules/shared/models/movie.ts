export interface Movie {
  backdrop_path: string; // URL to the backdrop image
  id: number; // Unique movie ID
  title: string; // Movie title
  original_title: string; // Original title in native language
  overview: string; // Short description or plot summary
  poster_path: string; // URL to the poster image
  media_type: string; // Type of media (e.g., "movie")
  adult: boolean; // Flag for adult content
  original_language: string; // Original language (e.g., "ja" for Japanese)
  genre_ids: number[]; // Array of genre IDs (e.g., [16, 18])
  popularity: number; // Popularity score
  release_date: string; // Release date in YYYY-MM-DD format
  video: boolean; // Flag for associated video content
  vote_average: number; // Average vote rating
  vote_count: number; // Total vote count
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type SortBy =
  | 'popularity.desc'
  | 'release_date.desc'
  | 'vote_average.desc'
  | null;

export type Genre = {
  id: number;
  name: string;
};

export interface GenreResponse {
  genres: Genre[];
}
