import { createSlice } from "@reduxjs/toolkit";
import {
	addMovieBanner,
	addShowingMovie,
	getShowingMovie,
	getShowingMovies,
} from "./showService";

const initialState = {
	showingMovie: [],
	details: {},
	banner: "",
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const showSlice = createSlice({
	name: "show",
	initialState,
	reducers: {
		getShowingMovieDetails: (state, action) => {
			const movieDetailsArr = state.showingMovie.filter((item) => {
				return item.movieId === action.payload;
			});
			state.details = movieDetailsArr[0];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getShowingMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getShowingMovies.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.showingMovie = action.payload;
			})
			.addCase(getShowingMovies.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getShowingMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getShowingMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.showingMovie = action.payload;
			})
			.addCase(getShowingMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addShowingMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addShowingMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(addShowingMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addMovieBanner.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addMovieBanner.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.banner = action.payload;
			})
			.addCase(addMovieBanner.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});
export const { getShowingMovieDetails } = showSlice.actions;
export default showSlice.reducer;
