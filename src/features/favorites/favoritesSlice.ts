import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types';

interface FavoritesState {
  items: Movie[];
}

const loadFavoritesFromStorage = (): Movie[] => {
  try {
    const serialized = localStorage.getItem('favorites');
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (e) {
    console.warn("Could not load favorites from localStorage", e);
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === movie.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(movie);
      }
      
      try {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      } catch (e) {
        console.warn("Could not save favorites to localStorage", e);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
