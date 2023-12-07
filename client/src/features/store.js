import { composeWithDevTools } from "@redux-devtools/extension";
import {
	applyMiddleware,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import adminReducers from "./admin/adminSlice";
import authReducers from "./auth/authSlice";
import moviesReducers from "./movie/movieSlice";
import paymentReducers from "./payment/paymentSlice";
import searchReducer from "./search/searchSlice";
import showReducers from "./show/showSlice";
import ticketReducers from "./ticket/ticketSlice";
import userReducers from "./user/userSlice";
import watchlistReducers from "./watchlist/watchlistSlice";
let reducers = combineReducers({
	//RTK
	movies: moviesReducers,
	watchlist: watchlistReducers,
	user: userReducers,
	auth: authReducers,
	search: searchReducer,
	show: showReducers,
	ticket: ticketReducers,
	payment: paymentReducers,
	admin: adminReducers,
});
const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
