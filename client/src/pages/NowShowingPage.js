import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/showingMovie/Movie";
import { getShowingMovies } from "../features/show/showService";

const NowShowingPage = () => {
	const dispatch = useDispatch();

	const showingMovies = useSelector((state) => state.show);
	const { showingMovie, isLoading } = showingMovies;
	console.log(showingMovie, isLoading);
	return (
		<div className="w-full h-full bg-white text-black pt-10 pb-32">
			<div className="mt-3 relative w-full flex items-center flex-col">
				<h1 className="text-amber-500 text-5xl font-extrabold z-10 bg-white px-3">
					Now Showing
				</h1>
				<div
					className="w-[80%] h-[2px] bg-slate-500 absolute top-7"
					style={{
						// background: "rgb(255,255,255)",
						background:
							"linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(82,82,82,1) 50%, rgba(255,255,255,1) 100%)",
					}}
				></div>
			</div>

			<div className="grid grid-cols-2 mx-auto gap-y-12 gap-x-12 w-full max-w-[1280px] px-3 mt-20">
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
