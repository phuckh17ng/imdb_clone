import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies, getMovieDetails, getMovieTrailer } from "./movieService";
const initialState = {
	movies: [],
	movieDetails: {},
	movieTrailer: {},
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
			})

			.addCase(getMovieDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMovieDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.movieDetails = action.payload;
			})
			.addCase(getMovieDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(getMovieTrailer.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMovieTrailer.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.movieTrailer = action.payload;
			})
			.addCase(getMovieTrailer.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default moviesSlice.reducer;
