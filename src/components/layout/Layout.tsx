import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Header />
      <main className="flex-grow w-full max-w-5xl mx-auto py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-700 py-10 text-center text-slate-400 text-sm mt-auto">
        <p>&copy; {new Date().getFullYear()} TMDB App. All rights reserved.</p>
      </footer>
    </div>
  );
};
