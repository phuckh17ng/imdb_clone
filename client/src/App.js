import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
function App() {
	return (
		<Router>
			<Navbar />
			<main className="App">
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route exact path="/details/:id" element={<MovieDetailsPage />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
