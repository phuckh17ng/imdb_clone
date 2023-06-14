import { createSlice } from "@reduxjs/toolkit";
import { getShowingMovieSeat } from "./ticketService";

const initialState = {
	seat: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getShowingMovieSeat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getShowingMovieSeat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.seat = action.payload;
			})
			.addCase(getShowingMovieSeat.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default ticketSlice.reducer;
