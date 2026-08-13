import { Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';

export const Header = () => {
  const favoritesCount = useAppSelector(state => state.favorites.items.length);

  return (
    <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur-md border-b border-slate-700 transition-all shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-sky-400">
            TMDB
          </span>
        </Link>
        
        <Link 
          to="/favorites" 
          className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors relative group font-semibold"
        >
          <span className="text-sm font-bold uppercase tracking-wider hidden sm:block">Favorites</span>
          <div className="relative">
            <Heart className="w-5 h-5 group-hover:text-red-400 transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-slate-800 shadow-sm">
                {favoritesCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};
