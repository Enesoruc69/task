import { useAppSelector } from '../app/hooks';
import { MovieCard } from '../components/common/MovieCard';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <HeartCrack className="w-12 h-12 text-slate-600 mb-6" />
        <h2 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">No favorite movies yet</h2>
        <p className="text-slate-400 mb-10 max-w-sm text-sm font-medium">
          Add movies you love by clicking the heart icon to easily find them later.
        </p>
        <Link 
          to="/" 
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm tracking-wide shadow-md"
        >
          Discover Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">My Favorites</h1>
          <p className="text-sm font-medium text-slate-400 mt-2">{favorites.length} movies</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
