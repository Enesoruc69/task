import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, PaginatedResponse, MovieDetails } from '../../types';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      if (TMDB_API_KEY) {
        headers.set('Authorization', `Bearer ${TMDB_API_KEY}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<PaginatedResponse<Movie>, void>({
      query: () => `trending/movie/day`,
    }),
    getPopularMovies: builder.query<PaginatedResponse<Movie>, number | void>({
      query: (page = 1) => `movie/popular?page=${page}`,
    }),
    getTopRatedMovies: builder.query<PaginatedResponse<Movie>, number | void>({
      query: (page = 1) => `movie/top_rated?page=${page}`,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
