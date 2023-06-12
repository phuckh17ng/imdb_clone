import { createSlice } from "@reduxjs/toolkit";
import { addShowingMovie } from "./showService";

const initialState = {
	showingMovie: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const showSlice = createSlice({
	name: "show",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(addShowingMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addShowingMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.showingMovie = action.payload;
			})
			.addCase(addShowingMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default showSlice.reducer;
