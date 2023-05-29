import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "../../redux/data";

export const getAllMovies = createAsyncThunk(
	"movies/getAllMovies",
	async (thunkAPI) => {
		try {
			// const { data } = await axios.get(
			// 	"https://imdb-api.com/en/API/IMDbList/k_7svrxe8z/ls004285275"
			// );
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
