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
import { getMovieSearchReducer } from "./reducers/searchReducers";
import {
	addToWatchlistReducer,
	watchlistReducer,
} from "./reducers/watchlistReducers";

let reducers = combineReducers({
	getMovies: getMoviesReducer,
	getMovieDetails: getMovieDetailsReducer,
	getMovieTrailer: getMovieTrailerReducer,
	watchlist: watchlistReducer,
	addToWatchlist: addToWatchlistReducer,
	moviesSearch: getMovieSearchReducer,
});
const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
