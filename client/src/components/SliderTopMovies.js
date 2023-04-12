import axios from "axios";
import React from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick-theme.css";
// import "~slick-carousel/slick/slick.css";
import * as style from "../styles/styles";
import MovieSlide from "./MovieSlide";
// const options = {
// 	method: "GET",
// 	url: "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
// 	params: { homeCountry: "US", purchaseCountry: "US", currentCountry: "US" },
// 	headers: {
// 		"X-RapidAPI-Key": "bd07387548msh14594e64c16fd9fp19d3adjsn5520e10a3ffd",
// 		"X-RapidAPI-Host": "imdb8.p.rapidapi.com",
// 	},
// };

// axios
// 	.request(options)
// 	.then(function (response) {
// 		console.log(response.data);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

const options = {
	method: "GET",
	url: "https://imdb8.p.rapidapi.com/title/get-details",
	params: { tconst: "tt0944947" },
	headers: {
		"X-RapidAPI-Key": "",
		"X-RapidAPI-Host": "",
	},
};

var data = {};

function getMovie() {
	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
			return response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
}
data = getMovie();

console.log(data);
console.log("data");

const SliderTopMovies = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};
	return (
		<div className="bg-black">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					Top 10 on IMDb this week
				</label>
				<div
					style={style.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			<div className="text-white">This week's top TV and movies</div>
			<Slider {...settings}>
				<MovieSlide />
			</Slider>
		</div>
	);
};

export default SliderTopMovies;
