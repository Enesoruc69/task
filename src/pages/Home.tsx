import { useGetTrendingMoviesQuery, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from '../features/api/apiSlice';
import { MovieRow } from '../components/movies/MovieRow';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';


export const Home = () => {
  const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useGetTrendingMoviesQuery();
  const { data: popularData, isLoading: popularLoading, error: popularError } = useGetPopularMoviesQuery();
  const { data: topRatedData, isLoading: topLoading, error: topError } = useGetTopRatedMoviesQuery();

  if (trendingLoading || popularLoading || topLoading) return <Loader />;
  if (trendingError || popularError || topError) return <ErrorState message="An error occurred while loading movies. Please check your API key." />;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="px-6 mb-12 mt-8 lg:mt-10">
        <div className="flex flex-col items-start gap-3">
          <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-sky-400 bg-sky-400/10 rounded-full border border-sky-400/20">
            Movie Database
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight mb-1">
            Find your next watch.
          </h1>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl font-medium leading-relaxed">
            Browse through trending hits, popular blockbusters, and critically acclaimed masterpieces from around the globe.
          </p>
        </div>
      </div>

      {trendingData && <MovieRow title="Trending Now" movies={trendingData.results} />}
      {popularData && <MovieRow title="Popular Movies" movies={popularData.results} />}
      {topRatedData && <MovieRow title="Top Rated" movies={topRatedData.results} />}
    </div>
  );
};
