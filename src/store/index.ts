import { configureStore } from "@reduxjs/toolkit";
import { movieReduser } from "./slices/getDetailSlice";
import { postsReduser } from "./slices/getMoviesSlice";

const store = configureStore({
  reducer: { posts: postsReduser, movieDetails: movieReduser },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
