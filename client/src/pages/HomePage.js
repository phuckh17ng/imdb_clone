import React from "react";
import SliderBannerMovies from "../components/bannerMovies/SliderBannerMovies";
import SliderFanFavoriteMovies from "../components/sliderFanFavoriteMovies/SliderFanFavoriteMovies";
import SliderTopMovies from "../components/sliderTopMovies/SliderTopMovies";
import SliderWatchlistMovies from "../components/sliderWatchlistMovies/SliderWatchlistMovies";
// import * as styles from "../styles/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
};

export default HomePage;
