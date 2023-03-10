import { Card, CardMedia, Grid, CardContent, Typography } from "@mui/material";
import React from "react";
import { useRouter } from 'next/router'

type PropsType = {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  };
};

export const MovieCard: React.FC<PropsType> = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const router = useRouter()
  const handleClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    router.push("/"+imdbID)
  }
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card onClick={handleClick} sx={{cursor:"pointer", boxShadow:"9"}}>
        <CardMedia
          component="img"
          loading="lazy"
          alt={Title}
          height="350px"
          image={Poster}
          sx={{ cursor: "pointer", objectFit:"contain" }}
        />
        <CardContent>
          <Typography variant="h5" sx={{fontWeight:"600"}}>{Title} {Year}</Typography>
          <Typography variant="h6">{Type}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
