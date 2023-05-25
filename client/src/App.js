import "./App.css";

import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./redux/actions/userSettingActions";

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

function App() {
	const [user, userLoading] = useAuthState(auth);
	const dispatch = useDispatch();
	const userDataState = useSelector((state) => state.userData);
	const { loading, userData } = userDataState;
	console.log(userData);

	// useEffect(() => {
	// 	// debugger;
	// 	if (!userLoading && user) {
	// 		const fetchUserData = setTimeout(() => {
	// 			dispatch(getUserData(user?.uid));
	// 		}, 100);
	// 		if (userData?.data !== undefined) {
	// 			clearTimeout(fetchUserData);
	// 		}
	// 	}
	// }, [user, dispatch]);

	return (
		<Router>
			<main className="App">
				<Navbar />
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route exact path="/details/:id" element={<MovieDetailsPage />} />
					<Route exact path="/watchlist" element={<WatchlistPage />} />
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
					<Route exact path="account/:uid" element={<UserSettingsPage />} />
				</Routes>
				<Footer />
			</main>
		</Router>
	);
}

export default App;
