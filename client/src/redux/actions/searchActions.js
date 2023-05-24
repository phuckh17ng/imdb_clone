import axios from "axios";
import * as actionTypes from "../constants/searchConstants";

export const getSearchMovies =
	(searchOption, searchValue) => async (dispatch) => {
		try {
			dispatch({ type: actionTypes.GET_SEARCH_MOVIES_REQUEST });
			let data = {};
			if (searchOption === "All") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchAll/k_7svrxe8z/${searchValue}`
				);
			}
			if (searchOption === "Title") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchTitle/k_7svrxe8z/${searchValue}`
				);
			}
			if (searchOption === "Movie") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchMovie/k_7svrxe8z/${searchValue}`
				);
			}
			if (searchOption === "Series") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchSeries/k_7svrxe8z/${searchValue}`
				);
			}
			if (searchOption === "Episode") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchEpisode/k_7svrxe8z/${searchValue}`
				);
			}
			if (searchOption === "Name") {
				data = await axios.get(
					`https://imdb-api.com/en/API/SearchName/k_7svrxe8z/${searchValue}`
				);
			}
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
