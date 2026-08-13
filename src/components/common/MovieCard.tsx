import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Movie } from '../../types';
import { TMDB_IMAGE_BASE_URL } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state => 
    state.favorites.items.some(item => item.id === movie.id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    dispatch(toggleFavorite(movie));
  };

  const imageUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Afiş+Yok';

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="group flex flex-col w-full h-full"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-700 mb-3 shadow-md border border-slate-600">
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-slate-800/70 backdrop-blur-md rounded-full shadow-sm"
          aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart 
            className={`w-4 h-4 transition-transform hover:scale-110 drop-shadow-sm ${
              isFavorite ? 'fill-red-400 text-red-400' : 'text-slate-300'
            }`} 
          />
        </button>
      </div>
      
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-slate-100 font-bold text-sm line-clamp-1 group-hover:text-sky-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-xs text-slate-400 gap-2 font-medium">
          <span>
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-slate-300 font-bold">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
