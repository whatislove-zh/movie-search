import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import { addMovie, removeMovie } from "@/store/slices/favoriteSlice";

type PropsType = {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  };
  favorite?: boolean;
};

export const MovieCard: React.FC<PropsType> = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const favorite = props.favorite;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push("/" + imdbID);
  };

  const addToFavorite:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
    e.stopPropagation();
    dispatch(addMovie(props.movie));
  };
  const removeFromFav:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
    e.stopPropagation();
    dispatch(removeMovie(imdbID));
  };

 


  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card onClick={handleClick} sx={{ cursor: "pointer", boxShadow: "9" }}>
        <CardMedia
          component="img"
          loading="lazy"
          alt={Title}
          height="350px"
          image={Poster}
          sx={{ cursor: "pointer", objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            {Title} {Year}
          </Typography>
          <Typography variant="h6">{Type}</Typography>
          {favorite ? (
            <Button variant="outlined" onClick={removeFromFav}>
            Remove
          </Button>
          ) : (
            <Button variant="outlined" onClick={addToFavorite}>
              Add to favorite
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
