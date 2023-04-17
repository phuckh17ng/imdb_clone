import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import IMDbSignInPage from "./pages/IMDbSignInPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SignInPage from "./pages/SignInPage";

function App() {
	return (
		<Router>
			<main className="App">
				<Navbar />
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route exact path="/details/:id" element={<MovieDetailsPage />} />
					<Route exact path="signin" element={<SignInPage />} />
					<Route exact path="signin/imdb" element={<IMDbSignInPage />} />
				</Routes>
				<Footer />
			</main>
		</Router>
	);
}

export default App;
