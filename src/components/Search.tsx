import { TextField } from "@mui/material";
import React from "react";
import { debounce } from "lodash";
import { useAppDispatch } from "@/store/hook";
import { loadPosts } from "@/store/slices/getMoviesSlice";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchChangeHelper = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch(loadPosts(e.target.value));
    },
    1000
  );

  return (
    <>
      <TextField
        onChange={(e) => searchChangeHelper(e)}
        fullWidth
        variant="filled"
        label="Search..."
        sx={{ m: "40px" }}
      />
    </>
  );
};
