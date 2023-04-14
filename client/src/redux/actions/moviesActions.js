import axios from "axios";
import * as actionTypes from "../constants/moviesConstants";

export const getMovies = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_MOVIES_REQUEST });

		const { data } = await axios.get(
			"https://imdb-api.com/en/API/IMDbList/k_zt02vio8/ls004285275"
		);

		console.log(data);
		dispatch({
			type: actionTypes.GET_MOVIES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_MOVIES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getMovieDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_MOVIE_DETAILS_REQUEST });

		const { data } = await axios.get(
			`https://imdb-api.com/en/API/Title/k_zt02vio8/${id}`
		);

		dispatch({
			type: actionTypes.GET_MOVIE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_MOVIE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};