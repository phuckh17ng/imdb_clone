import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
					<Route
						exact
						path="account/:uid/:displayName"
						element={<UserSettingsPage />}
					/>
				</Routes>
				<Footer />
			</main>
		</Router>
	);
}

export default App;
