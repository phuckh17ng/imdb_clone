import React from "react";
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
};

export default HomePage;
