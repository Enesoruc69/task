import { MovieCard } from '../common/MovieCard';
import type { Movie } from '../../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-slate-200 mb-6 px-6">{title}</h2>
      <div className="flex overflow-x-auto gap-5 pb-6 px-6 snap-x scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px] w-[200px] flex-shrink-0 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
