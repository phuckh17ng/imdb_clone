import React from "react";
<<<<<<< HEAD

const HomePage = () => {
	const styles = {
		clipPath: "polygon(25% 0, 25% 100%, 100% 50%)",
		width: 40,
		height: 40,
		backgroundColor: "#f5c518",
	};
	return <div style={styles}></div>;
=======
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SliderFanFavoriteMovies from "../components/slider/sliderFanFavoriteMovies/SliderFanFavoriteMovies";
import SliderTopMovies from "../components/slider/sliderTopMovies/SliderTopMovies";
import SliderWatchlistMovies from "../components/slider/sliderWatchlistMovies/SliderWatchlistMovies"
import SliderBannerMovies from "../components/bannerMovies/SliderBannerMovies";

const HomePage = () => {
	return (
		<div className="w-full bg-black">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				limit={1}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<SliderBannerMovies />
			<SliderTopMovies />
			<SliderWatchlistMovies />
			<SliderFanFavoriteMovies />
		</div>
	);
>>>>>>> e05b5f56928029ab4f6c7101a5ce06ba70ea5085
};

export default HomePage;
