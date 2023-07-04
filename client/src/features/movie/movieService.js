import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "../../redux/data";
import { movieDetailsData, movieTrailerData } from "../data";
export const getAllMovies = createAsyncThunk(
	"movies/getAllMovies",
	async (thunkAPI) => {
		try {
			// const { data } = await axios.get(
			// 	"https://imdb-api.com/en/API/IMDbList/k_k3dk7ej7/ls004285275"
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

export const getMovieDetails = createAsyncThunk(
	"movies/getMovieDetails",
	async (movieId, thunkAPI) => {
		try {
			// const { data } = await axios.get(
			// 	`https://imdb-api.com/en/API/Title/k_k3dk7ej7/${movieId}`
			// );

			return movieDetailsData;
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
			// const { data } = await axios.get(
			// 	`https://imdb-api.com/en/API/Trailer/k_k3dk7ej7/${movieId}`
			// );

			return movieTrailerData;
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
