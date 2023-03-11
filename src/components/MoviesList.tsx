import { loadPosts, selectPosts } from "@/store/slices/getMoviesSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { selectPostsInfo } from "@/store/slices/getMoviesSlice";
import React from "react";
import { useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { Typography, Grid } from "@mui/material";

export const MoviesList: React.FC = () => {
  const { status, error } = useAppSelector(selectPostsInfo);
  const movies = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.controls.search);
  const page = useAppSelector((state) => state.controls.page);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts({ search: search, page: page }));
    }
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" && (
        <Typography sx={{ minHeight: "60vh" }}>Loading...</Typography>
      )}
      {error && (
        <Typography sx={{ minHeight: "60vh" }}>
          Something go wrong, try it later....
        </Typography>
      )}
      {status === "received" && (
        <Grid container spacing={7} sx={{ minHeight: "60vh" }}>
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
