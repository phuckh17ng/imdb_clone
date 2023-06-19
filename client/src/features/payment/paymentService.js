import { createAsyncThunk } from "@reduxjs/toolkit";
import { seatPaymentFunc } from "../../firebase/firebaseFunctions";

export const seatPayment = createAsyncThunk(
	"payment",
	async ({ form, name, cinema, day, time }, thunkAPI) => {
		try {
			console.log(name, cinema, day, time);
			let data = {};
			await seatPaymentFunc(form, name, cinema, day, time);
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
