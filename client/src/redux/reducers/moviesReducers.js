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
