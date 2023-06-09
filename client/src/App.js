import "./App.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseConfig";

import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";

import HomePage from "./pages/HomePage";
import IMDbForgotPassword from "./pages/IMDbForgotPassword";
import IMDbSignInPage from "./pages/IMDbSignInPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import WatchlistPage from "./pages/WatchlistPage";

import { getAllMovies } from "./features/movie/movieService";
import { getUserData } from "./features/user/userService";
import { getUserWatchlist } from "./features/watchlist/watchlistService";
import NowShowingPage from "./pages/NowShowingPage";

function App() {
	const [user] = useAuthState(auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user?.uid === undefined) return;
		setTimeout(() => dispatch(getUserData(user?.uid)), 2000);
	}, [dispatch, user?.uid]);
	useEffect(() => {
		dispatch(getAllMovies());
	}, [dispatch]);
	useEffect(() => {
		if (user?.uid === undefined) return;
		dispatch(getUserWatchlist(user?.uid));
	}, [user?.uid, dispatch]);

	return (
		<Router>
			<main className="App">
				<Navbar />
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route exact path="/details/:id" element={<MovieDetailsPage />} />
					<Route exact path="/watchlist" element={<WatchlistPage />} />
					<Route exact path="/nowshowing" element={<NowShowingPage />} />
					<Route exact path="signin" element={<SignInPage />} />
					<Route exact path="signin/imdb" element={<IMDbSignInPage />} />
					<Route
						exact
						path="signin/imdb/resetpassword"
						element={<IMDbForgotPassword />}
					/>
					<Route exact path="signin/register" element={<RegisterPage />} />
					<Route
						exact
						path="/search/:searchOption/:searchValue"
						element={<SearchPage />}
					/>
					<Route exact path="user" element={<UserSettingsPage />} />
				</Routes>
				<Footer />
			</main>
		</Router>
	);
}

export default App;
