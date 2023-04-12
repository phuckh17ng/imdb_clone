import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick-theme.css";
// import "~slick-carousel/slick/slick.css";
import * as style from "../styles/styles";
// import MovieSlide from "./MovieSlide";

const SliderTopMovies = () => {
	const [mydata, setMyData] = useState([]);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
			params: {
				homeCountry: "US",
				purchaseCountry: "US",
				currentCountry: "US",
			},
			headers: {
				"X-RapidAPI-Key": "",
				"X-RapidAPI-Host": "",
			},
		};
		// This code will be executed after the component has mounted
		// Make an API request with axios here
		axios
			.request(options)
			.then(function (response) {
				// console.log(response.data);
				setMyData(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});

		// You can return a cleanup function that will be executed when the component is unmounted
		return () => {
			// Cleanup code here
		};
	}, []);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};
	console.log(mydata);

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
				{/* {mydata.map((items, index) => {
					if (index < 10) {
						return <MovieSlide key={items} id={items} />;
					}
				})} */}
				{/* <MovieSlide /> */}
			</Slider>
		</div>
	);
};

export default SliderTopMovies;
