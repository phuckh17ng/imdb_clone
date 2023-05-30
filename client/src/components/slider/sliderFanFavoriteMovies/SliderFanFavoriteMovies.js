import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import * as style from "../../../styles/styles";
import MovieSlide from "../MovieSlide";
import PropagateLoading from "../PropagateLoading";
import { slickSliderSettings } from "../slickSliderSettings";

const SliderFanFavoriteMovies = () => {
	const getMovies = useSelector((state) => state.movies);
	const { movies, isLoading, isError } = getMovies;

	return (
		<div className="bg-black m-auto max-w-[1280px] px-3 pt-12 ">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					Favourite Movies
				</label>
				<div
					style={style.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			<div className="text-zinc-400 pt-3 pb-4">
				This week's top TV and movies
			</div>
			<div>
				{isLoading ? (
					<div className="w-full h-12 flex items-center justify-center">
						<PropagateLoading loading={isLoading} />
					</div>
				) : isError ? (
					<h2>{isError}</h2>
				) : (
					<Slider {...slickSliderSettings}>
						{movies.items?.map((movie, index) => {
							if (index < 40 && index > 20) {
								return (
									<MovieSlide
										key={movie.id}
										id={movie.id}
										title={movie.title}
										fullTitle={movie.title}
										imDbRating={movie.imDbRating}
										imDbRatingCount={movie.imDbRatingCount}
										image={movie.image}
										year={movie.year}
										description={movie.description}
									/>
								);
							}
							return "";
						})}
					</Slider>
				)}
			</div>
		</div>
	);
};

export default SliderFanFavoriteMovies;
