import { configureStore } from "@reduxjs/toolkit";
import { movieReduser } from "./slices/getDetailSlice";
import { postsReduser } from "./slices/getMoviesSlice";
import { controlsReducer } from "./slices/controlsSlice";

const store = configureStore({
  reducer: {
    posts: postsReduser,
    movieDetails: movieReduser,
    controls: controlsReducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
