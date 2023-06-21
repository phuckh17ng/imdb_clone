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
		let seatSelected = [];
		builder
			.addCase(seatPayment.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
			})
			.addCase(seatPayment.fulfilled, (state, action) => {
				// seatSelected = [
				// 	...seatSelected,
				// 	action.payload.seat.map((item) => {
				// 		return item;
				// 	}),
				// ];
				action.payload.seat.map((item) => {
					seatSelected = [...seatSelected, item];
				});
				const seatInfo = {
					seat: seatSelected,
					name: action.payload.name,
					email: action.payload.email,
					phoneNumber: action.payload.phoneNumber,
					movieName: action.payload.movieName,
					movieCinema: action.payload.movieCinema,
					movieDay: action.payload.movieDay,
					movieTime: action.payload.movieTime,
				};
				state.isLoading = false;
				state.isSuccess = true;
				state.seatSelect = seatInfo;
			})
			.addCase(seatPayment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default paymentSlice.reducer;
