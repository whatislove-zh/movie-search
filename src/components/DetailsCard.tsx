import { useAppSelector } from "@/store/hook";
import { selectMovie } from "@/store/slices/getDetailSlice";
import { MovieT } from "@/store/slices/getDetailSlice";

import { Card, CardMedia, Box } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useRouter } from "next/router";

export const DetailsCard: React.FC = () => {
  const movie = useAppSelector(selectMovie) as MovieT;

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Country,
    Awards,
    Poster,
    imdbRating,
  } = movie;

  const router = useRouter();

  const isWidthLessSm = useMediaQuery("(min-width:600px)");
  const display = isWidthLessSm ? "flex" : "block";

  return (
    <>
      <Card sx={{ my: "50px", boxShadow: "9" }}>
        <Box sx={{ display: display, justifyContent: "space-evenly" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              loading="lazy"
              alt={Title}
              height="350px"
              image={Poster}
              sx={{ cursor: "pointer", objectFit: "contain", width: "250px" }}
            />
            <Typography>Runtime: {Runtime}</Typography>
          </Box>
          <CardContent sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ mt: "15px" }}>
              {Title} {Year}
            </Typography>
            <Typography variant="body2">imdbRating: {imdbRating}</Typography>

            <Divider sx={{ mb: "10px" }} />
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Released at {Released}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Country: {Country}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Genres: {Genre}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Director: {Director}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Writer: {Writer}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Actors: {Actors}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Rated: {Rated}
            </Typography>
            <Typography variant="body1" sx={{ my: "7.5px" }}>
              Awards: {Awards}
            </Typography>
          </CardContent>
        </Box>
        <CardContent>
          <Typography variant="h5" align="center">
            Plot
          </Typography>
          <Typography variant="body1">{Plot}</Typography>
        </CardContent>
      </Card>
      <Button
        sx={{mb:"30px"}}
        variant="outlined"
        onClick={() => {
          router.push("/");
        }}
      >
        Go Home
      </Button>
    </>
  );
};
