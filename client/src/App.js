import "./App.css";
import logo from "./logo.svg";
import HomePage from "./pages/HomePage";

function App() {
	var requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	fetch("https://imdb-api.com/en/API/Top250Movies/k_m9cyoeja", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));

	return (
		<div className="App">
			<HomePage />
		</div>
	);
}

export default App;
