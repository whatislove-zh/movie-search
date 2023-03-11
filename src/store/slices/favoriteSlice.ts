import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "./getMoviesSlice";

const initialState: { list: PostType[] } = {
  list: [],
};

const favoriteMoviesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const newItemId = action.payload.imdbID;
      const existingItem = state.list.find((item) => item.imdbID === newItemId);

      if (!existingItem) {
        state.list.push(action.payload);
      }
    },
    removeMovie: (state, action) => {
      state.list = state.list.filter((item) => item.imdbID !== action.payload)
    },
    clearFavorite: (state) => {
      state.list = [];
    },
  },
});

export const { addMovie, removeMovie, clearFavorite } = favoriteMoviesSlice.actions;
export const favoriteReducer = favoriteMoviesSlice.reducer;
