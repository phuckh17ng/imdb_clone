import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/showingMovie/Movie";
import { getShowingMovies } from "../features/show/showService";

const NowShowingPage = () => {
	const dispatch = useDispatch();

	const showingMovies = useSelector((state) => state.show);
	const { showingMovie, isLoading } = showingMovies;
	return (
		<div className="w-full h-full bg-white text-black pt-10 pb-32">
			<div className="mt-3 relative w-full flex items-center flex-col">
				<div className="h-full bg-white flex items-center justify-center z-10">
					<h1
						style={{
							background:
								"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
							webkitBackgroundClip: "text",
							webkitTextFillColor: "transparent",
						}}
						className="text-amber-500 text-6xl font-extrabold z-10 bg-white px-3 py-3"
					>
						Now Showing
					</h1>
				</div>

				<div
					className="w-[80%] h-[2px] bg-slate-500 absolute top-12 z-0"
					style={{
						// background: "rgb(255,255,255)",
						background:
							"linear-gradient(90deg,#fff 0%, #4158D0 25%, #C850C0 50%, #FFCC70 75%, #fff 100%)",
					}}
				></div>
			</div>

			<div className="grid grid-cols-2 mx-auto gap-y-20 gap-x-16 w-full max-w-[1280px] px-3 mt-20">
				{showingMovie?.map((movie) => {
					return (
						<Movie
							key={movie.movieId}
							movieId={movie.movieId}
							dayCreate={movie.dayCreate}
							actor={movie._actor}
							banner={movie._banner}
							cinema={movie._cinema}
							day={movie._day}
							director={movie._director}
							gerne={movie._gerne}
							name={movie._name}
							time={movie._time}
							trailer={movie._trailer}
							type={movie._type}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NowShowingPage;
