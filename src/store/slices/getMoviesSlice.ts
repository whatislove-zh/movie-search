import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";

export type PostType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
type ResponseType = {
  Search: PostType[];
  totalResults: string;
  Response: "True" | "False";
  Error: string | undefined;
};

export const loadPosts = createAsyncThunk<
  ResponseType,
  { search?: undefined | string; page?: undefined | number },
  { rejectValue: string }
>(
  "posts/getPosts",
  async function (parametr = { search: "new", page: 1 }, { rejectWithValue }) {
    const { search, page } = parametr;
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=462ed482&s=${search}&page=${page}`
    );

    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  }
);

type initialType = {
  status: "idle" | "rejected" | "loading" | "received";
  error: null | string | undefined;
  list: PostType[];
  qty: string;
};

const initialState: initialType = {
  status: "idle",
  error: null,
  list: [],
  qty: "0",
};

const postsSlice = createSlice({
  name: "@posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "received";
        state.error = null;
        state.list = action.payload.Search;
        state.qty = action.payload.totalResults;
      });
  },
});

export const postsReduser = postsSlice.reducer;

export const selectPostsInfo = (state: RootState) => ({
  status: state.posts.status,
  error: state.posts.error,
  qty: state.posts.qty,
});

export const selectPosts = (state: RootState) => state.posts.list;
