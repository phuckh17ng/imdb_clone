import * as actionTypes from "../constants/moviesConstants";

export const getMoviesReducer = (state = { movies: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_MOVIES_REQUEST:
			return {
				loading: true,
				movies: [],
			};
		case actionTypes.GET_MOVIES_SUCCESS:
			return {
				movies: action.payload,
				loading: false,
			};
		case actionTypes.GET_MOVIES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getMovieDetailsReducer = (state = { movie: {} }, action) => {
	switch (action.type) {
		case actionTypes.GET_MOVIE_DETAILS_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.GET_MOVIE_DETAILS_SUCCESS:
			return {
				loading: false,
				movie: action.payload,
			};
		case actionTypes.GET_MOVIE_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.GET_MOVIE_DETAILS_RESET:
			return {
				movie: {},
			};
		default:
			return state;
	}
};

export const getMovieTrailerReducer = (state = { trailer: {} }, action) => {
	switch (action.type) {
		case actionTypes.GET_MOVIE_TRAILER_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.GET_MOVIE_TRAILER_SUCCESS:
			return {
				loading: false,
				trailer: action.payload,
			};
		case actionTypes.GET_MOVIE_TRAILER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
