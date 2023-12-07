import { createSlice } from "@reduxjs/toolkit";
import { getShowingMovieSeat, seatPayment } from "./ticketService";

const initialState = {
	seat: {},
	seatSelect: {},
	isError: false,
	isSuccess: false,
	isLoading: true,
	message: "",
};

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(seatPayment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(seatPayment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.seatSelect = action.payload;
			})
			.addCase(seatPayment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
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
