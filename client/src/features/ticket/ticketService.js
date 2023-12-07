import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addShowingMovieSeat,
	seatPaymentFunc,
} from "../../firebase/firebaseFunctions";

export const getShowingMovieSeat = createAsyncThunk(
	"ticket/getAllSeat",
	async ({ name, cinema, day, time }, thunkAPI) => {
		try {
			let data = {};
			await addShowingMovieSeat(name, cinema, day, time).then((item) => {
				data = item;
			});
			return data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const seatPayment = createAsyncThunk(
	"ticket/payment",
	async ({ form }, thunkAPI) => {
		try {
			await seatPaymentFunc(form);
			return form;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
