import { TextField } from "@mui/material";
import React from "react";
import { debounce } from "lodash";
import { useAppDispatch } from "@/store/hook";
import { loadPosts } from "@/store/slices/getMoviesSlice";
import { setPage, setSearch } from "@/store/slices/controlsSlice";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchChangeHelper = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

      if (e.target.value !== "") {
        dispatch(loadPosts({ search: e.target.value }));
        dispatch(setSearch(e.target.value));
        dispatch(setPage(1))
      }
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
