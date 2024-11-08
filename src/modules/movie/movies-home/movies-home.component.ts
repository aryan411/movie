import { Component, HostListener } from '@angular/core';
import { APIResponse, Genre, Movie, SortBy } from '../../shared/models/movie';
import { MovieService } from '../../shared/services/movie.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrl: './movies-home.component.css',
})
export class MoviesHomeComponent {
  isLoading: boolean = false; // Flag for loading state
  error: string | undefined; // To store error message
  hadMoreMovies: boolean = true; // Flag for whether there are more movies to load
  movieList: Movie[] = []; // Store the list of movies
  currentPage: number = 1;
  genres: Genre[] = []; // Store genres dynamically
  years: number[] = Array.from(
    { length: 25 },
    (_, i) => new Date().getFullYear() - i
  );
  sortOptions: { value: SortBy; label: string }[] = [
    { value: 'popularity.desc', label: 'Sort by Popularity' },
    { value: 'release_date.desc', label: 'Sort by Release Date' },
    { value: 'vote_average.desc', label: 'Sort by Rating' },
  ];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchGenres(); // Fetch genres when the component initializes
    this.fetchTrendingMovies(); // Fetch movies initially
    this.subscribeToFormChanges();
  }

  fetchTrendingMovies(): void {
    this.isLoading = true;
    this.error = undefined;

    // Call the service to get the trending movies
    this.movieService.getTrendingMovies(this.currentPage).subscribe({
      next: (response: APIResponse<Movie>) => {
        this.currentPage == 1
          ? (this.movieList = response.results)
          : this.movieList.push(...response.results); // Store the movie list
        this.hadMoreMovies = response.page < response.total_pages; // Check if more movies are available
        this.currentPage = response.page + 1;
        this.isLoading = false; // Stop loading
      },
      error: () => {
        this.error = 'Failed to load movies'; // Set error message
        this.isLoading = false; // Stop loading
      },
    });
  }
  // Fetch genres dynamically
  fetchGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.genres; // Update the genres list
      },
      error: () => {
        this.error = 'Failed to load genres'; // Handle error
      },
    });
  }

  loadMore(): void {
    // For now, just call the same method to simulate loading more movies
    if (this.hadMoreMovies) {
      if (this.searchForm.value.search && this.searchForm.value.search !== '') {
        this.fetchSearchedMovies();
      }
      this.fetchTrendingMovies();
    }
  }

  filterForm = new FormGroup({
    genreId: new FormControl<Genre['id'] | null>(null),
    year: new FormControl<number | null>(null),
    sortBy: new FormControl<SortBy | null>(null),
  });

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  // Subscribes to form changes to trigger the discover API call
  subscribeToFormChanges(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.searchForm.setValue({ search: '' });
      this.currentPage = 1;
      this.fetchFilteredMovies();
    });
  }

  fetchFilteredMovies(): void {
    this.isLoading = true;
    this.error = undefined;

    const { genreId, year, sortBy } = this.filterForm.value;

    // Call the service to get the trending movies
    this.movieService
      .discoverMovies(year, genreId, sortBy, this.currentPage)
      .subscribe({
        next: (response: APIResponse<Movie>) => {
          this.currentPage == 1
            ? (this.movieList = response.results)
            : this.movieList.push(...response.results); // Store the movie list
          this.hadMoreMovies = response.page < response.total_pages; // Check if more movies are available
          this.currentPage = response.page + 1;
          this.isLoading = false; // Stop loading
        },
        error: () => {
          this.error = 'Failed to load movies'; // Set error message
          this.isLoading = false; // Stop loading
        },
      });
  }

  fetchSearchedMovies(): void {
    this.isLoading = true;
    this.error = undefined;

    const { search } = this.searchForm.value;

    if (!search || search == '') return;
    // Call the service to get the trending movies

    this.movieService.getSearchedMovies(search, this.currentPage).subscribe({
      next: (response: APIResponse<Movie>) => {
        this.movieList.push(...response.results); // Store the movie list
        this.hadMoreMovies = response.page < response.total_pages; // Check if more movies are available
        this.currentPage = response.page + 1;
        this.isLoading = false; // Stop loading
      },
      error: () => {
        this.error = 'Failed to load movies'; // Set error message
        this.isLoading = false; // Stop loading
      },
    });
  }

  onSubmit(type: number): void {
    this.currentPage = 1; // Reset the page to 1 when a new search is submitted
    this.movieList = []; // Clear the previous list of movies
    if (!this.searchForm.value.search || this.searchForm.value.search == '')
      this.fetchTrendingMovies;
    type == 1 ? this.fetchSearchedMovies() : this.fetchSearchedMovies(); // Fetch filtered movies
  }

  showScrollToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button if scrolled down 300px
    this.showScrollToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
