import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieSlide from "./MovieSlide";

const SliderBannerMovies = () => {
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
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
	};
	return (
		<div>
			<Slider {...settings}>
				{loading ? (
					mydata.items.map((item, index) => {
						if (index < 10) {
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
						} else {
							return "";
						}
					})
				) : (
					<p>Loading...</p>
				)}
			</Slider>
		</div>
	);
};

export default SliderBannerMovies;
