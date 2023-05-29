import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeFromWatchlist } from "../../redux/actions/watchlistActions";
import { starStyle } from "../../styles/styles";

import { deleteFromWatchlist } from "../../features/watchlist/watchlistService";
import "./WatchlistMovie.css";
const WatchlistMovie = ({
	movieId,
	image,
	title,
	watchlistId,
	year,
	description,
	imDbRating,
	imDbRatingCount,
	isAdded,
}) => {
	const [isDeleted, setIsDeleted] = useState(!isAdded);
	const dispatch = useDispatch();
	const handleRemove = () => {
		dispatch(deleteFromWatchlist(watchlistId));
		setIsDeleted(true);
		toast("Movie has been deleted!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};
	return (
		!isDeleted && (
			<div
				id="movie--hover"
				className="mx-auto px-3 text-white h-36 max-md:mt-8 md:my-2 rounded flex py-2 items-center justify-start  transition-all translate-y-0 translate-x-0 hover:-translate-x-2 hover:-translate-y-1 duration-300 hover:bg-zinc-700/30"
			>
				<Link
					to={`/details/${movieId}`}
					className="flex items-center justify-center h-full"
				>
					<img
						src={image}
						alt={title}
						className="h-full mt-auto min-w-[86px] w-[86px] max"
					/>
				</Link>
				<div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start">
					<div className="w-[50%] flex flex-col justify-start items-start pt-2 h-full ml-3 max-md:flex-row max-md:w-full max-md:justify-between">
						<div>
							<Link
								to={`/details/${movieId}`}
								className="text-blue-500 cursor-pointer"
							>
								{title}
							</Link>
							<div className="text-sm mb-3">
								{year} <span className="font-thin">| Movie</span>
							</div>{" "}
							<div className="text-sm font-thin max-[500px]:text-ellipsis max-[500px]:whitespace-nowrap max-[500px]:overflow-hidden max-[500px]:w-[100px]">
								{description}
							</div>
						</div>
						{/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
						{/* mobile responsive */}
						{/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
						<div className="md:hidden flex min-w-[135px] max-[460px]:min-w-0 items-end justify-center flex-col h-full">
							<div className="flex items-center pr-4">
								<span className="font-thin max-md:flex-col flex">
									<span className="flex items-start justify-end">
										<div
											style={starStyle}
											className="w-5 h-5 bg-[#f5c518] mx-2 mt-[2px] flex items-center justify-center"
										></div>{" "}
										<span>{imDbRating}</span>
									</span>

									<span className="text-zinc-200/50 text-end">
										({imDbRatingCount})
									</span>
								</span>
							</div>
							<div className="flex items-center font-thin hover:bg-zinc-700/50 p-2 max-md:p-1 rounded cursor-pointer">
								<img
									src={require("../../images/icons8-star-35.png")}
									alt="rating"
									className="w-6 h-6 mr-2"
								/>
								<span className="w-[40px] inline-block">Rate</span>
							</div>
							<div className="p-2 hover:bg-zinc-700/50 rounded-full mr-1 mb-1">
								<img
									src={require("../../images/icons8-trash-32.png")}
									alt="delete"
									className="w-7 h-7 cursor-pointer"
									onClick={handleRemove}
								/>
							</div>
						</div>
					</div>

					<div className="w-fit flex justify-end min-w-[300px] items-center max-md:hidden relative">
						<div className="flex items-center mx-3">
							<span
								style={starStyle}
								className="w-5 h-5 bg-[#f5c518] inline-block mx-2"
							></span>
							<span className="font-thin">
								<span>{imDbRating}</span>
								<span className="text-zinc-200/50">({imDbRatingCount})</span>
							</span>
						</div>

						<div className="flex items-center mr-6 font-thin hover:bg-zinc-700/50 p-2 rounded cursor-pointer">
							<img
								src={require("../../images/icons8-star-35.png")}
								alt="rating"
								className="w-6 h-6 mr-2"
							/>
							<span className="w-[40px] inline-block">Rate</span>
						</div>

						<div className="p-2 hover:bg-zinc-700/50 rounded-full">
							<img
								src={require("../../images/icons8-trash-32.png")}
								alt="delete"
								className="w-7 h-7 cursor-pointer"
								onClick={handleRemove}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default WatchlistMovie;
