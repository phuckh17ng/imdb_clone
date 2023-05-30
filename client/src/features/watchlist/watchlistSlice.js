import { createSlice } from "@reduxjs/toolkit";
import {
	addToWatchlist,
	deleteFromWatchlist,
	getUserWatchlist,
} from "./watchlistService";

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
	reducers: { resetWatchlist: () => initialState },
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

			.addCase(addToWatchlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				for (var i = 0; i < state.watchlist.length; i++) {
					if (state.watchlist[i].movieId === action.payload.movieId) {
						return;
					}
				}
				state.watchlist = [...state.watchlist, action.payload];
			})
			.addCase(addToWatchlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(deleteFromWatchlist.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteFromWatchlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.watchlist = state.watchlist.filter((item) => {
					return item.watchlistId !== action.payload;
				});
			})
			.addCase(deleteFromWatchlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default watchlistSlice.reducer;
export const { resetWatchlist } = watchlistSlice.actions;
