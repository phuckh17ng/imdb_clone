import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Movie = ({
	movieId,
	banner,
	actor,
	cinema,
	day,
	director,
	gerne,
	name,
	time,
	trailer,
	type,
	isDeleted,
}) => {
	const showingMovies = useSelector((state) => state.show);
	const { isLoading } = showingMovies;

	return (
		!isDeleted && (
			<div className="bg-zinc-100 rounded-2xl shadow-sm h-full flex hover:-translate-x-[6px] hover:-translate-y-[6px] min-h-[440px] min-w-full hover:shadow-xl transition-all duration-300 linear">
				{isLoading ? (
					<div
						role="status"
						className="px-6 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
					>
						<div className="flex items-center justify-center min-w-1/2 w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-400">
							{/* <svg
							className="w-12 h-12 text-gray-200"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 640 512"
						>
							<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
						</svg> */}
						</div>
						<div className="min-w-1/2 w-full">
							<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
							<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-full max-w-[480px] mb-2.5"></div>
							<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-full mb-2.5"></div>
							<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-full max-w-[440px] mb-2.5"></div>
							<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-full max-w-[460px] mb-2.5"></div>
							<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-full max-w-[360px]"></div>
						</div>
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<div className="flex w-full min-w-full">
						<img
							src={banner}
							alt={name}
							className="w-1/2 min-w-1/2"
							loading="lazy"
						/>

						<div className="w-1/2 max-w-1/2 py-6 mr-3 pl-6 flex flex-col justify-between">
							<div className="text-zinc-800">
								<p className="block border-b border-zinc-300 w-full text-3xl font-bold text-zinc-800 pb-3">
									{name}
								</p>
								<div className="mt-2">
									<div className="text-xl font-base">Director: {director}</div>
									{/* <div className="text-xl mt-2">Actor: {actor}</div> */}
									<div className="text-xl font-base mt-2">Gerne: {gerne}</div>
									<span
										style={{
											background:
												"linear-gradient(to bottom right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
										}}
										className="mt-3 text-white font-bold text-xl inline-block p-2"
									>
										{type}
									</span>
								</div>
							</div>

							<div className="flex justify-between bg-zinc-900/80 rounded-full">
								<Link
									to={trailer}
									className="font-bold text-white text-md flex items-center pl-3 pr-2"
								>
									<img
										src={require("../../images/icons8-youtube-50.png")}
										alt="youtube"
										className="w-[40px]"
									></img>
									<p>TRAILER</p>
								</Link>
								<Link
									to={`/nowshowing/${name}/${movieId}/ticket`}
									className="w-[55%] text-white font-bold text-md text-center bg-zinc-900 h-full rounded-full py-3 px-3"
								>
									BUY TICKET
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	);
};

export default Movie;
