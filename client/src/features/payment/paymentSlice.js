import { createSlice } from "@reduxjs/toolkit";
import { seatPayment } from "./paymentService";

const initialState = {
	seatSelect: [],
	isError: false,
	isSuccess: false,
	isLoading: true,
	message: "",
};

export const paymentSlice = createSlice({
	name: "payment",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(seatPayment.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
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
			});
	},
});

export default paymentSlice.reducer;
