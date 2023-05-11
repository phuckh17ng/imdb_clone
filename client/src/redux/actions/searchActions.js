import axios from "axios";
import * as actionTypes from "../constants/searchConstants";

export const getSearchMovies =
	(searchOption, searchValue) => async (dispatch) => {
		try {
			dispatch({ type: actionTypes.GET_SEARCH_MOVIES_REQUEST });
			let data = {};
			if (searchOption === "All") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchAll/key/${searchValue}`
				);
			}
			if (searchOption === "Title") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchTitle/key/${searchValue}`
				);
			}
			if (searchOption === "Movie") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchMovie/key/${searchValue}`
				);
			}
			if (searchOption === "Series") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchSeries/key/${searchValue}`
				);
			}
			if (searchOption === "Episode") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchEpisode/key/${searchValue}`
				);
			}
			if (searchOption === "Name") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchName/key/${searchValue}`
				);
			}

			console.log(data);
			dispatch({
				type: actionTypes.GET_SEARCH_MOVIES_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.GET_SEARCH_MOVIES_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
