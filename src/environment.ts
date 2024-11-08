export const environment = {
  prod: false,
  MOVIE_AUTH_TOKEN:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWM4MGIyOWFhZmY2MDI4OTZkMDdiMDhmOTk2ZTMyNSIsIm5iZiI6MTczMTAxMzIwNy42OTI4ODAyLCJzdWIiOiI2NzJkMjkyZTU5OWRhMjg5ODA5NTdiYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tmEPVKUR5ziWHvvmSfI9ra43KQmbD9XOYpT3P-t4hJ0',
  MOVIE_BASE_URL: 'https://api.themoviedb.org/3',
  MOVIE_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',
  GET_TRENDING_MOVIES_BY_WEEK: '/trending/movie/week',
  DISCOVER_MOVIES: '/discover/movie',
  GET_MOVIE_GENRE: '/genre/movie/list',
  GET_SEARCHED_MOVIES: '/search/movie',
  FALLBACK_IMAGE: 'https://picsum.photos/1080/1080',
};
