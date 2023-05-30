import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { data } from "../../redux/data";

export const getAllMovies = createAsyncThunk(
	"movies/getAllMovies",
	async (thunkAPI) => {
		try {
			const { data } = await axios.get(
				"https://imdb-api.com/en/API/IMDbList/k_q2h77cjg/ls004285275"
			);
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

export const getMovieDetails = createAsyncThunk(
	"movies/getMovieDetails",
	async (movieId, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`https://imdb-api.com/en/API/Title/k_q2h77cjg/${movieId}`
			);

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

export const getMovieTrailer = createAsyncThunk(
	"movies/getMovieTrailer",
	async (movieId, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`https://imdb-api.com/en/API/Trailer/k_q2h77cjg/${movieId}`
			);

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
