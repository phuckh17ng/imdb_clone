import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist, getUserWatchlist } from "./watchlistService";

const initialState = {
	watchlist: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const watchlistSlice = createSlice({
	name: "watchlist",
	initialState,
	reducers: {
		// addToWatchlist: (state, action) => {
		// 	state.watchlist = [action.payload];
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserWatchlist.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserWatchlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.watchlist = action.payload;
			})
			.addCase(getUserWatchlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addToWatchlist.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToWatchlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.watchlist = [action.payload];
			})
			.addCase(addToWatchlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default watchlistSlice.reducer;
