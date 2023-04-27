import React from "react";
import SliderBannerMovies from "../components/bannerMovies/SliderBannerMovies";
// import SliderFanFavoriteMovies from "../components/sliderFanFavoriteMovies/SliderFanFavoriteMovies";
import SliderTopMovies from "../components/sliderTopMovies/SliderTopMovies";
import SliderWatchlistMovies from "../components/sliderWatchlistMovies/SliderWatchlistMovies";
// import * as styles from "../styles/styles";

const HomePage = () => {
	return (
		<div className="w-full bg-black">
			<SliderBannerMovies />
			<SliderTopMovies />
			<SliderWatchlistMovies />
			{/* <SliderFanFavoriteMovies /> */}
		</div>
	);
};

export default HomePage;
