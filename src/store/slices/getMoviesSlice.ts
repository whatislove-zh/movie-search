import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";

type PostType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
type ResponseType = {
  Search: PostType[];
  totalResults: string;
  Response: "True" | "False"
  Error: string | undefined
}

export const loadPosts = createAsyncThunk<
  ResponseType,
  undefined | string,
  { rejectValue: string }
>("todos/fetchTodos", async function (parametr = "new", { rejectWithValue }) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=462ed482&s=${parametr}`
  );

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  if (data.Response === "True") {
   return data } else {
    throw new Error(data.Error)
   }

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
        state.list = action.payload.Search;
      });
  },
});

export const postsReduser = postsSlice.reducer;

export const selectPostsInfo = (state: RootState) => ({
  status: state.posts.status,
  error: state.posts.error,
});

export const selectPosts = (state: RootState) => state.posts.list;
