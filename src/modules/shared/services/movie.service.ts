import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, GenreResponse, Movie, SortBy } from '../models/movie';
import { environment } from 'projects/movies-mf/src/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTrendingMovies(
    page: number = 1,
    language: string = 'en-US'
  ): Observable<APIResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('language', language);
    return this.http.get<APIResponse<Movie>>(
      environment.GET_TRENDING_MOVIES_BY_WEEK,
      { params }
    );
  }

  discoverMovies(
    releaseYear: number | null = null,
    genreId: number | null = null,
    sortBy: SortBy = null,
    page: number = 1,
    language: string = 'en-US'
  ): Observable<APIResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('language', language);

    // // If search query is provided, add it to the parameters
    // if (query) {
    //   params = params.set('query', query);
    // }

    // Add filter by release year if provided
    if (releaseYear) {
      params = params.set('year', releaseYear.toString());
    }

    // Add filter by genre if provided
    if (genreId) {
      params = params.set('with_genres', genreId.toString());
    }

    // Add sorting option if provided
    if (sortBy) {
      params = params.set('sort_by', sortBy);
    }

    // Make the HTTP request to discover movies
    return this.http.get<APIResponse<Movie>>(`${environment.DISCOVER_MOVIES}`, {
      params,
    });
  }

  getSearchedMovies(
    searchText: string,
    page: number = 1,
    language: string = 'en-US'
  ): Observable<APIResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('query', searchText)
      .set('language', language);
    return this.http.get<APIResponse<Movie>>(
      `${environment.GET_SEARCHED_MOVIES}`,
      {
        params,
      }
    );
  }

  getGenres(language: string = 'en-US'): Observable<GenreResponse> {
    const params = new HttpParams().set('language', language);
    return this.http.get<GenreResponse>(`${environment.GET_MOVIE_GENRE}`, {
      params,
    });
  }
}
