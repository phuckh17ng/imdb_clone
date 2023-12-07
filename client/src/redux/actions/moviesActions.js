import axios from "axios";
import * as actionTypes from "../constants/moviesConstants";
import { data } from "../data";

export const getMovies = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_MOVIES_REQUEST });
		// const { data } = await axios.get(
		// 	"https://imdb-api.com/en/API/IMDbList/k_hokq6b87/ls004285275"
		// );

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
			`https://imdb-api.com/en/API/Title/k_7svrxe8z/${id}`
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

export const getMovieTrailer = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_MOVIE_TRAILER_REQUEST });

		const { data } = await axios.get(
			`https://imdb-api.com/en/API/Trailer/k_7svrxe8z/${id}`
		);

		dispatch({
			type: actionTypes.GET_MOVIE_TRAILER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_MOVIE_TRAILER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
