import { createAsyncThunk } from "@reduxjs/toolkit";
import { addShowingMovieSeat } from "../../firebase/firebaseFunctions";

export const getShowingMovieSeat = createAsyncThunk(
	"ticket/getAllSeat",
	async ({ cinema, day, time }, thunkAPI) => {
		try {
			let data = {};
			await addShowingMovieSeat(cinema, day, time).then((item) => {
				console.log(item);
				data = item;
			});
			console.log(data);
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
