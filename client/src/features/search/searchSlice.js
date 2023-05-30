import { createSlice } from "@reduxjs/toolkit";
import { getSearchData } from "./searchService";

const initialState = {
	searchData: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSearchData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.searchData = action.payload;
			})
			.addCase(getSearchData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default searchSlice.reducer;
