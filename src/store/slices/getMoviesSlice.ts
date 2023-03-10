import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";

type PostType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
};

export const loadPosts = createAsyncThunk<
  PostType[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch("https://www.omdbapi.com/?apikey=462ed482&s=new");

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();

  return data.Search;
});

type initialType = {
  status: "idle" | "rejected" | "loading" | "received";
  error: null | string | {};
  list: PostType[];
};

const initialState: initialType = {
  status: "idle",
  error: null,
  list: [],
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
        state.error = action.payload || action.error;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "received";
        state.error = null;
        state.list = action.payload;
      });
  },
});

export const postsReduser = postsSlice.reducer;

export const selectPostsInfo = (state: RootState) => ({
  status: state.posts.status,
  error: state.posts.error,
  qty: state.posts.list.length,
});

export const selectPosts = (state: RootState) => state.posts.list;
