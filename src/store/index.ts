import { configureStore } from "@reduxjs/toolkit";
import { movieReduser } from "./slices/getDetailSlice";
import { postsReduser } from "./slices/getMoviesSlice";
import { controlsReducer } from "./slices/controlsSlice";
import { favoriteReducer } from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    posts: postsReduser,
    movieDetails: movieReduser,
    controls: controlsReducer,
    favorite: favoriteReducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
