import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { debounce } from "lodash";
import { useAppDispatch } from "@/store/hook";
import { loadPosts } from "@/store/slices/getMoviesSlice";
import { setPage, setSearch } from "@/store/slices/controlsSlice";
import { useRouter } from "next/router";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchChangeHelper = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value !== "") {
        dispatch(loadPosts({ search: e.target.value }));
        dispatch(setSearch(e.target.value));
        dispatch(setPage(1));
      }
    },
    1000
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/favorite");
  };

  return (
    <Box>
      <TextField
        onChange={(e) => searchChangeHelper(e)}
        fullWidth
        variant="filled"
        label="Search..."
        sx={{ m: "40px" }}
      />
      <Button variant="outlined" onClick={(e) => handleClick(e)}>
        Favorite movies
      </Button>
    </Box>
  );
};
