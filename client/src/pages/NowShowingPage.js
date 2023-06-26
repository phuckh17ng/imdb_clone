import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/showingMovie/Movie";
import { getShowingMovies } from "../features/show/showService";

const NowShowingPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShowingMovies());
	}, [dispatch]);
	const showingMovies = useSelector((state) => state.show);
	const { showingMovie, isLoading } = showingMovies;
	let showingMovieArr = [...showingMovie];
	return (
		<div className="w-full min-h-screen h-full bg-white text-black pt-9 pb-32">
			<div className="w-full max-w-[1280px] mx-auto mt-3 px-3">
				<div className="h-full bg-white z-10">
					<h1
						// style={{
						// 	background:
						// 		"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
						// 	webkitBackgroundClip: "text",
						// 	webkitTextFillColor: "transparent",
						// }}
						className="text-zinc-800 text-7xl font-bold z-10 bg-white"
					>
						Now Showing
					</h1>
				</div>
				<div className="mt-3 relative h-full">
					<div
						style={{
							background:
								"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
						}}
						className="bg-black w-[10%] h-6 absolute top-0 left-0 z-10"
					></div>
					{/* <div
						// style={{
						// 	background:
						// 		"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
						// }}
						className="bg-zinc-100 absolute w-[45%] h-1 top-5 left-0"
					></div> */}
				</div>
			</div>

			<div className="grid grid-cols-2 mx-auto gap-y-20 gap-x-16 w-full max-w-[1280px] px-3 mt-28">
				{showingMovieArr
					?.sort((a, b) =>
						b.movieId.localeCompare(a.movieId, undefined, {
							numeric: true,
							sensitivity: "base",
						})
					)
					.map((movie) => {
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
								isLoading={isLoading}
								isDeleted={movie.isDeleted}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default NowShowingPage;
