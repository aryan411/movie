import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpMovieInterceptor } from './http-movie/http-movie.interceptor';
import { MovieService } from './services/movie.service';

@NgModule({
  declarations: [],
  imports: [CommonModule,HttpClientModule],
  providers: [provideHttpClient(withInterceptors([httpMovieInterceptor])),MovieService],
})
export class SharedModule {}
