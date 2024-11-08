import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Input() isLoading?: boolean;
  @Output() fetchMoviesEmit = new EventEmitter();
  @Output() loadMoreEmit = new EventEmitter();
  @Input() error?: string;
  @Input() movieList: Movie[] = [];
  @Input() hasMoreMovies?: boolean;

  fetchMovies() {
    this.fetchMoviesEmit.emit();
  }
  onMovieSelect(event: any) {
    console.log('Movie selected');
  }
  loadMore() {
    this.loadMoreEmit.emit();
  }
}
