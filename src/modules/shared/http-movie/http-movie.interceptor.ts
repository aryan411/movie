import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'projects/movies-mf/src/environment';

export const httpMovieInterceptor: HttpInterceptorFn = (req, next) => {
  const movieReq = req.clone({
    url: req.url.startsWith('http')
      ? req.url
      : `${environment.MOVIE_BASE_URL}${req.url}`,
    setHeaders: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.MOVIE_AUTH_TOKEN}`,
    },
  });

  // Pass the modified request to the next handler
  return next(movieReq);
};
