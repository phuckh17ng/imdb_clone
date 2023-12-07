import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SquareLoader from "react-spinners/SquareLoader";
import { auth } from "../firebase/firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWatchlist } from "../features/watchlist/watchlistService";

import {
	getMovieDetails,
	getMovieTrailer,
} from "../features/movie/movieService";
import * as styles from "../styles/styles";

const MovieDetailsPage = () => {
	const [user] = useAuthState(auth);

	const movieState = useSelector((state) => state.movies);
	const watchlistState = useSelector((state) => state.watchlist);

	const { movieDetails, movieTrailer, isLoading, isError } = movieState;
	const { id } = useParams();
	const dispatch = useDispatch();
	const movieAdd = {
		uid: user?.uid,
		id: movieDetails?.id,
		image: movieDetails?.image,
		title: movieDetails?.title,
		fullTitle: movieDetails?.fullTitle,
		year: movieDetails?.year,
		imDbRating: movieDetails?.imDbRating,
		imDbRatingCount: movieDetails?.imDbRatingVotes,
		description: movieDetails?.stars,
	};
	useEffect(() => {
		dispatch(getMovieDetails(id));
		dispatch(getMovieTrailer(id));
	}, [dispatch, id]);

	var isAdded = false;
	for (var i = 0; i < watchlistState.watchlist.length; i++) {
		if (watchlistState.watchlist[i].movieId === id) {
			isAdded = true;
			break;
		}
	}
	const handleAddToWatchlist = (e) => {
		e.preventDefault();
		if (user) {
			dispatch(addToWatchlist(movieAdd));
		} else {
			toast("Sign in for more access!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			toast.clearWaitingQueue();
		}
	};

	return (
		<div className="w-full bg-zinc-900 max-[1024px]:pb-40">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				limit={1}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{isLoading ? (
				<div className="w-full h-[100vh] flex items-center justify-center bg-zinc-900">
					<SquareLoader
						loading={isLoading}
						aria-label="Loading Spinner"
						data-testid="loader"
						size="50"
						color="#f5c518"
						className="m-auto"
					/>
				</div>
			) : isError ? (
				<h2>{isError}</h2>
			) : (
				<div className="w-full max-w-[1280px] px-3 mx-auto h-[845px] relative z-10 max-[1280px]:max-w-[1024px]">
					<div
						style={{
							backgroundPosition: "",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundBlendMode: "normal",
							filter: "blur(120px)",
							backgroundImage: `url(${movieDetails.image})`,
						}}
						className="w-full m-auto h-[600px] relative top-[120px]"
					></div>

					<div className="text-white font-semibold absolute top-0 left-0 w-full pt-3 pl-3">
						<div className="w-full">
							<div className="flex justify-end w-full max-md:flex-col max-md:justify-end">
								<ul className="flex px-3 list-disc max-md:justify-end">
									<li className=" list-none mx-3 hover:decoration-solid hover:underline">
										Cast & crew
									</li>
									<li className=" list-item mx-3 hover:decoration-solid hover:underline">
										User reviews
									</li>
									<li className=" list-item ml-3 hover:decoration-solid hover:underline">
										Trivia
									</li>
								</ul>
								<div className="flex items-center max-md:justify-end max-md:mt-3">
									<div className=" border-l border-zinc-500 px-3 hover:decoration-solid hover:underline">
										IMDbPro
									</div>
									<div className=" border-l border-zinc-500 px-3 hover:decoration-solid hover:underline">
										All topics
									</div>
									<div className=" border-l border-zinc-500 px-3">
										<img
											src={require("../images/icons8-share-40.png")}
											alt="share"
											className=" w-6 h-6"
										/>
									</div>
								</div>
							</div>

							<div className="w-full flex justify-between pt-3">
								<p className="text-5xl max-sm:text-4xl">{movieDetails.title}</p>
								<ul className="flex">
									<li className="mx-6">
										<p className="text-zinc-400 text-sm font-bold tracking-widest max-md:text-end">
											IMDb RATING
										</p>
										<div className="flex justify-end mt-2">
											<img
												src={require("../images/icons8-star-35 (1).png")}
												alt="rating"
												className="w-6 h-6 mr-3"
											/>
											<div className="text-xl font-semibold">
												{movieDetails.imDbRating}
												<span className=" text-lg text-zinc-400">/10</span>
											</div>
										</div>
									</li>
									<li className="pr-3">
										<p className="text-zinc-400 text-sm font-bold tracking-widest max-md:text-end">
											YOUR RATING
										</p>
										<div className="flex justify-center mt-1 hover:rounded border-solid hover:bg-zinc-700/50 py-1">
											<img
												src={require("../images/icons8-star-35.png")}
												alt="rating"
												className="w-6 h-6 mr-3"
											/>
											<div className="text-xl font-semibold text-[#5699ef] ">
												Rate
											</div>
										</div>
									</li>
								</ul>
							</div>
							<ul className="flex list-disc text-zinc-400 text-sm font-bold mb-3">
								<li className="list-none mr-3">{movieDetails.year}</li>
								<li className="mx-3">{movieDetails.runtimeMins} min</li>
							</ul>
						</div>

						<div className="h-[415px] w-full flex justify-between pr-3 max-[1280px]:h-[334px] max-[1024px]:flex-col max-[1024px]:h-full">
							<div className="flex w-full h-full max-[1280px]:h-[334px]">
								<div className="relative h-full max-w-[275px] max-[1280px]:max-w-[234px] w-full cursor-pointer hover:brightness-[.85] transition-all duration-500">
									<img
										src={movieDetails.image}
										alt={movieDetails.title}
										className="z-0 h-full w-fit object-cover"
									/>

									<div
										style={styles.bookmarkStyle}
										className={
											isAdded
												? `bg-[#f5c518] absolute top-0 left-0 w-[32px] h-[42px] flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:bg-yellow-600`
												: `bg-zinc-800/50 absolute top-0 left-0 w-[32px] h-[42px] flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:bg-zinc-500/80`
										}
									>
										<img
											src={
												isAdded
													? require("../images/icons8-done-30.png")
													: require("../images/icons8-plus-20.png")
											}
											alt="bookmark"
											style={{ opacity: "1!important" }}
											className="z-10 w-[20px] h-[20px]"
										/>
									</div>
								</div>
								<div className="ml-1 relative w-full h-full max-[1280px]:h-[334px] max-[1024px]:h-fit">
									<div className="w-full h-full top-0 left-0 max-[1280px]:h-[334px] max-[1024px]:h-full">
										<iframe
											scrolling="no"
											disableremoteplayback
											webkit-playsinline
											playsInline
											src={movieTrailer?.linkEmbed}
											title="movie trailer"
											allowfullscreen
											marginheight="0"
											frameborder="0"
											border="0"
											className="h-[415px] w-full max-[1280px]:h-[334px]"
											loading="lazy"
										></iframe>
									</div>
								</div>
							</div>

							<div className="ml-1 h-full w-full max-[1024px]:!h-10 max-[1024px]:!ml-0 max-w-[208px] max-[1280px]:max-w-[170px] max-[1024px]:w-full max-[1024px]:max-w-none max-[1024px]:flex justify-between">
								<div className=" h-[49.5%] max-[1024px]:!h-10 bg-zinc-700/50 max-[1024px]:mr-1 flex flex-col max-[1024px]:flex-row items-center justify-center rounded-r hover:brightness-125 max-[1024px]:w-1/2 max-[1024px]:rounded-r-none max-[1024px]:!rounded-b">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="35"
										height="35"
										class="ipc-icon ipc-icon--video-library ipc-icon--inline sc-f81a065-0 kcCkmR"
										id="iconContext-video-library"
										viewBox="0 0 24 24"
										fill="currentColor"
										role="presentation"
										className="max-[1024px]:w-4 max-[1024px]:h-4"
									>
										<path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
									</svg>
									<div className="text-sm font-bold tracking-widest mt-2 max-[1024px]:!mt-0 max-[1024px]:!text-xs">
										24 VIDEOS
									</div>
								</div>
								<div className="h-[49.5%] max-[1024px]:!h-10 mt-1 max-[1024px]:!mt-0 bg-zinc-700/50 flex flex-col max-[1024px]:flex-row items-center justify-center rounded-r hover:brightness-125 max-[1024px]:w-1/2 max-[1024px]:rounded-r-none max-[1024px]:!rounded-b">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="35"
										height="35"
										class="ipc-icon ipc-icon--collections ipc-icon--inline sc-f81a065-0 kcCkmR"
										id="iconContext-collections"
										viewBox="0 0 24 24"
										fill="currentColor"
										role="presentation"
										className="max-[1024px]:w-4 max-[1024px]:h-4"
									>
										<path fill="none" d="M0 0h24v24H0V0z"></path>
										<path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
									</svg>
									<div className="text-sm font-bold max-[1024px]:!text-xs tracking-widest mt-2 max-[1024px]:!mt-0">
										99+ PHOTOS
									</div>
								</div>
							</div>
						</div>

						<div className="mt-3">
							{movieDetails.genreList?.map((values) => (
								<span
									className="border text-sm border-zinc-400 hover:bg-zinc-600/50 rounded-full px-3 pt-[2px] pb-[6px] mr-3"
									key={values.key}
								>
									{values.value}
								</span>
							))}
						</div>

						<div className="flex justify-between h-full max-[1024px]:flex-col max-[1024px]:mr-3">
							<div className="w-full h-full max-w-[813px]">
								<div className="py-3 text-zinc-100 h-full">
									{movieDetails.plot}
								</div>
								<div className="h-12 border-y flex items-center border-zinc-400">
									<span className="font-bold">Creators</span>
									<span className="pl-3">
										{movieDetails.directorList?.map((list) => (
											<span key={list.id}>
												<span className="text-white mr-3">-</span>
												<span className=" text-[#5699ef] hover:underline mr-3">
													{list.name}
												</span>
											</span>
										))}
									</span>
								</div>
								<div className="h-12 border-b flex items-center border-zinc-400">
									<span className="font-bold">Stars</span>
									<span className="pl-3">
										{movieDetails.starList?.map((list) => (
											<span key={list.id}>
												<span className="text-white mr-3">-</span>
												<span className=" text-[#5699ef] hover:underline mr-3">
													{list.name}
												</span>
											</span>
										))}
									</span>
								</div>
								<div className="h-12 flex items-center">
									<span className="font-semibold tracking-[-1.25px] mr-2">
										IMDb<span className=" text-[#5699ef]">Pro</span>
									</span>
									<span>See production, box office & company info</span>
								</div>
							</div>

							<div className="flex mx-3 max-[1024px]:!mx-0">
								<div
									onClick={handleAddToWatchlist}
									className="h-12 w-[308px] cursor-pointer bg-zinc-700/50 flex items-center rounded-l hover:brightness-125"
								>
									<img
										src={
											isAdded
												? require("../images/icons8-checked-30.png")
												: require("../images/icons8-plus-20.png")
										}
										alt="watchlist"
										className="w-[18px] h-[18px] mx-2"
									/>
									<div>
										<div className="text-sm">Add to Watchlist</div>
										<div className="text-xs text-zinc-300">
											Added by 65.0K user
										</div>
									</div>
								</div>
								<div className="w-[50px] h-12 bg-zinc-700/50 ml-1 rounded-r hover:brightness-125 flex items-center justify-center">
									<img
										src={require("../images/icons8-down-20 (1).png")}
										alt="down"
										className="w-[15px] h-[15px]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieDetailsPage;
