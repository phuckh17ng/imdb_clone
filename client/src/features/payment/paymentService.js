import { createAsyncThunk } from "@reduxjs/toolkit";
import { seatPaymentFunc } from "../../firebase/firebaseFunctions";

export const seatPayment = createAsyncThunk(
	"payment",
	async ({ form }, thunkAPI) => {
		try {
			let data = {};
			await seatPaymentFunc(form);
			// return form;
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
