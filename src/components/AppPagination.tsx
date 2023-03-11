import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setPage } from "@/store/slices/controlsSlice";
import { loadPosts, selectPostsInfo } from "@/store/slices/getMoviesSlice";
import { Pagination } from "@mui/material";

export const AppPagination: React.FC = () => {
  const { qty } = useAppSelector(selectPostsInfo);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.controls.search);
  const page = useAppSelector((state) => state.controls.page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
    dispatch(loadPosts({ search: search, page: value }));
  };
  return (
    <>
      <Pagination
        color="primary"
        count={Math.ceil(Number(qty) / 10)}
        page={page}
        onChange={handleChange}
        sx={{ my: "50px" }}
      />
    </>
  );
};
