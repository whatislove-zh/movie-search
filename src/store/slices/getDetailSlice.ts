import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";

export interface MovieT {
  Title: string | undefined;
  Year: string | undefined;
  Rated: string | undefined;
  Released: string | undefined;
  Runtime: string | undefined;
  Genre: string | undefined;
  Director: string | undefined;
  Writer: string | undefined;
  Actors: string | undefined;
  Plot: string | undefined;
  Language: string | undefined;
  Country: string | undefined;
  Awards: string | undefined;
  Poster: string | undefined;
  Ratings?: RatingsEntity[] | null | undefined;
  Metascore: string | undefined;
  imdbRating: string | undefined;
  imdbVotes: string | undefined;
  imdbID: string | undefined;
  Type: string | undefined;
  DVD: string | undefined;
  BoxOffice: string | undefined;
  Production: string | undefined;
  Website: string | undefined;
  Response: "True" | "False";
  Error: string | undefined;
}
export interface RatingsEntity {
  Source: string;
  Value: string;
}

export const loadMovie = createAsyncThunk<
  MovieT,
  string,
  { rejectValue: string }
>("movie/getMovie", async function (parametr, { rejectWithValue }) {
  const response: Response = await fetch(
    `https://www.omdbapi.com/?apikey=462ed482&i=${parametr}`
  );

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data: MovieT = await response.json();
  if (data.Response === "True") {
    return data;
  } else {
    throw new Error(data.Error);
  }
});

type initial = {
  status: "idle" | "rejected" | "loading" | "received";
  error: null | string | {};
  movieInfo: MovieT | null;
};

const initialState: initial = {
  status: "idle",
  error: null,
  movieInfo: null,
};

const movieSlice = createSlice({
  name: "@movie",
  initialState,
  reducers: {
    clearMovie: (state) => {
      state.status = "idle";
      state.error = null;
      state.movieInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadMovie.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error;
      })
      .addCase(loadMovie.fulfilled, (state, action) => {
        state.status = "received";
        state.error = null;
        state.movieInfo = action.payload;
      });
  },
});

export const {clearMovie} = movieSlice.actions
export const movieReduser = movieSlice.reducer;

export const selectMovieStatus = (state: RootState) => ({
  status: state.movieDetails.status,
  error: state.movieDetails.error,
});

export const selectMovie = (state: RootState) => state.movieDetails.movieInfo;
export const selectTitle = (state: RootState) =>
  state.movieDetails.movieInfo?.Title;
