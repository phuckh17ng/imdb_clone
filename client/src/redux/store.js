import { composeWithDevTools } from "@redux-devtools/extension";
import {
	applyMiddleware,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {
	getMovieDetailsReducer,
	getMoviesReducer,
	getMovieTrailerReducer,
} from "./reducers/moviesReducers";

let reducers = combineReducers({
	getMovies: getMoviesReducer,
	getMovieDetails: getMovieDetailsReducer,
	getMovieTrailer: getMovieTrailerReducer,
});

const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
