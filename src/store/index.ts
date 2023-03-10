import { configureStore } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/getMoviesSlice";

const store = configureStore({
  reducer: { posts: postsReduser },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
