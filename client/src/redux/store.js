import { composeWithDevTools } from "@redux-devtools/extension";
import {
	applyMiddleware,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducers from "../features/auth/authSlice";
import moviesReducers from "../features/movie/movieSlice";
import searchReducer from "../features/search/searchSlice";
import userReducers from "../features/user/userSlice";
import watchlistReducers from "../features/watchlist/watchlistSlice";

let reducers = combineReducers({
	//RTK
	movies: moviesReducers,
	watchlist: watchlistReducers,
	user: userReducers,
	auth: authReducers,
	search: searchReducer,
});
const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
