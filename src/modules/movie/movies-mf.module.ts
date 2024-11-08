import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesMfRoutingModule } from './movies-mf-routing.module';
import { CustomErrorHandler } from 'auth-guards';

@NgModule({
  declarations: [MovieCardComponent, MovieListComponent, MoviesHomeComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MoviesMfRoutingModule,
  ],
  exports: [MoviesHomeComponent],
})
export class MoviesMfModule {}
