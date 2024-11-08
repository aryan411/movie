import { Component, Input } from '@angular/core';
import { Movie } from '../../shared/models/movie';
import { environment } from 'projects/movies-mf/src/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  getImageUrl(path: string): string {
    return path ? `${environment.MOVIE_IMAGE_BASE_URL}${path}` : environment.FALLBACK_IMAGE;
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return '#22c55e'; // Green
    if (rating >= 6) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  onMoreInfo(movieId: number): void {
    // Implement navigation or modal opening logic here
    console.log('Show more info for movie:', movieId);
  }
}
