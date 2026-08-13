import { useParams, Link } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../features/api/apiSlice';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { TMDB_IMAGE_ORIGINAL_URL, TMDB_IMAGE_BASE_URL } from '../utils/constants';
import { Star, Clock, Calendar, ArrowLeft, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import type { Movie } from '../types';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(Number(id));
  
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state => 
    movie ? state.favorites.items.some(item => item.id === movie.id) : false
  );

  if (isLoading) return <Loader />;
  if (error || !movie) return <ErrorState message="Movie details not found. Please try again." />;

  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_ORIGINAL_URL}${movie.backdrop_path}` : '';
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  const handleToggleFavorite = () => {
    const movieForFavorite: Movie = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      genre_ids: movie.genres.map(g => g.id),
      popularity: movie.popularity,
      adult: movie.adult,
      video: movie.video,
      original_language: movie.original_language
    };
    dispatch(toggleFavorite(movieForFavorite));
  };

  return (
    <div className="relative -mt-8 pb-12">
      {/* Backdrop Image */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[65vh] -z-10 overflow-hidden">
          <img 
            src={backdropUrl} 
            alt="Backdrop" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 mb-12 transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-700 border border-slate-600">
              <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow pt-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 mb-3 tracking-tight">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-xl text-slate-400 italic mb-8 font-medium">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-300 font-bold">
              <div className="flex items-center gap-1.5 text-slate-100 bg-slate-700 shadow-sm border border-slate-600 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              
              {movie.runtime && (
                <>
                  <div className="flex items-center gap-1.5 bg-slate-700 shadow-sm border border-slate-600 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>{movie.runtime} min</span>
                  </div>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                </>
              )}
              
              <div className="flex items-center gap-1.5 bg-slate-700 shadow-sm border border-slate-600 px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>{movie.release_date?.split('-')[0]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {movie.genres.map(genre => (
                <span key={genre.id} className="px-3 py-1 rounded-full border border-slate-600 bg-slate-700 text-slate-300 text-xs tracking-wider font-semibold uppercase shadow-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-12 max-w-3xl">
              <h3 className="text-lg font-bold text-slate-200 mb-4">
                Overview
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            {/* Favorite Action */}
            <button 
              onClick={handleToggleFavorite}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all border shadow-sm ${
                isFavorite 
                  ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600' 
                  : 'bg-sky-500 text-white border-sky-500 hover:bg-sky-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-400 text-red-400' : ''}`} />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
