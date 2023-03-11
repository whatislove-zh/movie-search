import { createSlice } from "@reduxjs/toolkit";

const initialState:{search:string, page:number} = {
    search: "new",
    page:1
}

const controlsSlice = createSlice({
    name:"@search",
    initialState,
    reducers:{
        setSearch: (state, action) => {state.search = action.payload},
        setPage: (state, action) => {state.page = action.payload}
    }
})

export const {setSearch, setPage} = controlsSlice.actions
export const controlsReducer = controlsSlice.reducer