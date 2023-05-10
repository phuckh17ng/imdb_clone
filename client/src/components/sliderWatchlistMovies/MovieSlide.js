import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../../styles/styles";
const MovieSlide = ({
	id,
	title,
	fullTitle,
	imDbRating,
	imDbRatingCount,
	image,
	year,
	description,
	isAdded,
}) => {
	console.log(id);
	return (
		<div className="text-white px-2">
			<div className="relative h-full w-full cursor-pointer transition-all duration-500 hover:brightness-75 ">
				<Link to={`details/${id}`}>
					<img
						src={image}
						alt={title}
						className="z-0 w-full h-[275px] max-[1200px]:h-[295px] max-[1024px]:h-[340px] max-[900px]:h-[275px] max-md:h-[320px]"
					/>
				</Link>

				<div
					style={styles.bookmarkStyle}
					className={`bg-[#f5c518] absolute top-0 left-0 w-[32px] h-[42px] flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:bg-yellow-600`}
				>
					<img
						src={require("../../images/icons8-done-30.png")}
						alt="bookmark"
						style={{ opacity: "1!important" }}
						className="z-10 w-[20px] h-[20px]"
					/>
				</div>
			</div>
			<div className="bg-zinc-800/70 w-full">
				<div className="m-auto w-[90%] pb-2">
					<div className="flex items-center pt-3">
						<div
							style={styles.starStyle}
							className="bg-[#f5c518] w-4 h-4 rounded-lg"
						></div>
						<span className="ml-2">{imDbRating}</span>
					</div>
					<div className="h-[50px] cursor-pointer hover:decoration-solid hover:underline ">
						{title}
					</div>
					<div
						className=" bg-zinc-700/50 rounded h-[36px] flex items-center justify-center mt-4 cursor-pointer hover:bg-blue-400/10"
						// onClick={() => {
						// 	addMovieToWatchlist(user?.uid, movie);
						// 	// setTest(!data?.isAdded);
						// }}
					>
						<img
							src={require("../../images/icons8-plus-24.png")}
							alt="bookmark"
							className="w-[17px] h-[17px]"
						/>
						<div className="text-[#5699ef] font-semibold ml-2">Watchlist</div>
					</div>
					<div className=" text-center mt-2 hover:text-[#f5c518] h-[36px] hover:border-slate-400 border-solid rounded hover:bg-zinc-700/50 flex items-center justify-center w-[70px] m-auto cursor-pointer">
						Trailer
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieSlide;
