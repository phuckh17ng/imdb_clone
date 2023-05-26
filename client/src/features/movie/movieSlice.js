import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "./movieService";

const initialState = {
	movies: [],
	watchlist: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllMovies.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.movies = action.payload;
			})
			.addCase(getAllMovies.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default moviesSlice.reducer;
