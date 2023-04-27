import React from "react";
import Slider from "react-slick";
import * as style from "../../styles/styles";
import MovieSlide from "./MovieSlide";

const SliderWatchlistMovies = () => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 5,
	};
	return (
		<div className="bg-black m-auto max-w-[1280px] px-3 pt-12">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					From your watchlist
				</label>
				<div
					style={style.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			<div className="text-zinc-400 pt-3 pb-4">
				This week's top TV and movies
			</div>
			{/* <Slider {...settings}>
				<MovieSlide />
			</Slider> */}
			<MovieSlide />
		</div>
	);
};

export default SliderWatchlistMovies;
