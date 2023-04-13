import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import * as style from "../../styles/styles";
import MovieSlide from "./MovieSlide";

const SliderFanFavoriteMovies = () => {
	const [mydata, setMyData] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			"https://imdb-api.com/en/API/IMDbList/k_98o8xknz/ls004285275",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => {
				console.log(result);
				const data = JSON.parse(result);
				setMyData(data);
				setLoading(true);
			})
			.catch((error) => console.log("error", error));
		return () => {};
	}, []);

	console.log(mydata.items);
	console.log(loading);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 5,
		lazyLoad: true,
	};

	return (
		<div className="bg-black m-auto max-w-[1280px] px-3 pt-12">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					Fan favorites
				</label>
				<div
					style={style.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			<div className="text-zinc-400 pt-3 pb-4">
				This week's top TV and movies
			</div>
			<Slider {...settings}>
				{loading === true ? (
					mydata.items.map((item, index) => {
						if (index > 10 && index < 30) {
							return (
								<MovieSlide
									key={item.id}
									id={item.id}
									title={item.title}
									fullTitle={item.title}
									imDbRating={item.imDbRating}
									imDbRatingCount={item.imDbRatingCount}
									image={item.image}
									year={item.year}
									description={item.description}
								/>
							);
						}
						return "";
					})
				) : (
					<p className="text-white">Loading...</p>
				)}
			</Slider>
		</div>
	);
};

export default SliderFanFavoriteMovies;
