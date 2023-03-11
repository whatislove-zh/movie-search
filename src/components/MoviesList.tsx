import { loadPosts, selectPosts } from "@/store/slices/getMoviesSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { selectPostsInfo } from "@/store/slices/getMoviesSlice";
import React from "react";
import { useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { Typography, Grid } from "@mui/material";
import { clearMovie } from "@/store/slices/getDetailSlice";

export const MoviesList: React.FC = () => {
  const { status, error } = useAppSelector(selectPostsInfo);
  const movies = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(clearMovie());
  }, []);

  return (
    <>
      {status === "loading" && <Typography>Loading...</Typography>}
      {error && <Typography>Something go wrong, try it later....</Typography>}
      {status === "received" && (
        <Grid container spacing={7}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <Typography>I don't know this movie</Typography>
          )}
        </Grid>
      )}
    </>
  );
};
