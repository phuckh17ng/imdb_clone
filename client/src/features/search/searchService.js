import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { searchData, searchMovieData } from "../data";
export const getSearchData = createAsyncThunk(
	"search",
	async ({ searchOption, searchValue }, thunkAPI) => {
		try {
			let data = {};
			if (searchOption === "All") {
				// data = await axios.get(
				// 	`https://imdb-api.com/en/API/SearchAll/k_k3dk7ej7/${searchValue}`
				// );

				data = searchData;
			}
			if (searchOption === "Title") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchTitle/k_k3dk7ej7/${searchValue}`
				);
			}
			if (searchOption === "Movie") {
				// data = await axios.get(
				// 	`https://imdb-api.com/en/API/SearchMovie/k_k3dk7ej7/${searchValue}`
				// );
				data = searchMovieData;
			}
			if (searchOption === "Series") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchSeries/k_k3dk7ej7/${searchValue}`
				);
			}
			if (searchOption === "Episode") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchEpisode/k_k3dk7ej7/${searchValue}`
				);
			}
			if (searchOption === "Name") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchName/k_k3dk7ej7/${searchValue}`
				);
			}
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
