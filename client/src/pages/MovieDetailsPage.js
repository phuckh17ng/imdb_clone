import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SquareLoader from "react-spinners/SquareLoader";
import {
	getMovieDetails,
	getMovieTrailer,
} from "../redux/actions/moviesActions";
import { addToWatchlist } from "../redux/actions/watchlistActions";
import * as styles from "../styles/styles";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const MovieDetailsPage = () => {
	// const [mydata, setMyData] = useState({});
	// const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const movieDispatcher = useDispatch();
	const trailerDispatcher = useDispatch();
	const watchlistDisatcher = useDispatch();
	const movieDetails = useSelector((state) => state.getMovieDetails);
	const movieTrailer = useSelector((state) => state.getMovieTrailer);
	const watchlist = useSelector((state) => state.watchlist);

	console.log(watchlist);

	const { loading, error, movie } = movieDetails;
	const { trailer } = movieTrailer;
	const { id } = useParams();
	const history = useNavigate();

	console.log(id);
	console.log(movie);
	useEffect(() => {
		if (movie && id !== movie.id) {
			movieDispatcher(getMovieDetails(id));
		}
	}, [movieDispatcher, movie, id]);

	useEffect(() => {
		if (trailer && id !== trailer.imDbId) {
			trailerDispatcher(getMovieTrailer(id));
		}
	}, [trailerDispatcher, trailer, id]);

	const handleAddToWatchlist = () => {
		watchlistDisatcher(addToWatchlist(movie?.id));
		// history(`/${user?.uid}/watchlist`);
	};

	return (
		<div className="w-full bg-zinc-900">
			{loading ? (
				<div className="w-full h-[100vh] flex items-center justify-center bg-zinc-900">
					<SquareLoader
						loading={loading}
						// cssOverride={override}
						aria-label="Loading Spinner"
						data-testid="loader"
						size="50"
						color="#f5c518"
						className="m-auto"
					/>
				</div>
			) : error ? (
				<h2>{error}</h2>
			) : (
				<div className="w-full max-w-[1280px] px-3 mx-auto h-[845px] relative z-10">
					<div
						style={{
							backgroundPosition: "",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundBlendMode: "normal",
							filter: "blur(120px)",
							backgroundImage: `url(${movie.image})`,
						}}
						className="w-full m-auto h-[600px] relative top-[120px]"
					></div>

					<div className="text-white font-semibold absolute top-0 left-0 w-full pt-3 pl-3">
						<div className="w-full">
							<div className="flex justify-end w-full">
								<ul className="flex px-3 list-disc">
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

							<div className="w-full flex justify-between pt-3">
								<p className="text-5xl">{movie.title}</p>
								<ul className="flex">
									<li className="mx-6">
										<p className="text-zinc-400 text-sm font-bold tracking-widest">
											IMDb RATING
										</p>
										<div className="flex justify-end mt-2">
											<img
												src={require("../images/icons8-star-35 (1).png")}
												alt="rating"
												className="w-6 h-6 mr-3"
											/>
											<div className="text-xl font-semibold">
												{movie.imDbRating}
												<span className=" text-lg text-zinc-400">/10</span>
											</div>
										</div>
									</li>
									<li className="pr-3">
										<p className="text-zinc-400 text-sm font-bold tracking-widest">
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
								<li className="list-none mr-3">{movie.year}</li>
								<li className="mx-3">{movie.runtimeMins} min</li>
							</ul>
						</div>

						<div className="h-[415px] w-full flex justify-between pr-3">
							<div className="relative h-full max-w-[278px] w-full cursor-pointer hover:brightness-[.85] transition-all duration-500">
								<img
									src={movie.image}
									alt={movie.title}
									className="z-0 h-full w-full object-cover"
								/>

								<div
									style={styles.bookmarkStyle}
									className="absolute top-0 left-0 w-[32px] h-[42px] bg-zinc-800/70 flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:brightness-200 hover:bg-zinc-800"
								>
									<img
										src={require("../images/icons8-plus-20.png")}
										alt="bookmark"
										style={{ opacity: "1!important" }}
										className="z-10"
									/>
								</div>
							</div>
							<div className="relative w-full h-full">
								<div className="w-full h-full absolute top-0 left-0">
									<iframe
										scrolling="no"
										playsInline="playinline"
										src={trailer?.linkEmbed}
										title="movie trailer"
										allowfullscreen
										marginheight="0"
										frameborder="0"
										border="0"
										className="ml-1 h-[415px] w-full"
										loading="lazy"
									></iframe>
								</div>
							</div>
							<div className="ml-2 h-full w-full max-w-[208px]">
								<div className=" h-[206px] bg-zinc-700/50 flex flex-col items-center justify-center rounded-r hover:brightness-125">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="35"
										height="35"
										class="ipc-icon ipc-icon--video-library ipc-icon--inline sc-f81a065-0 kcCkmR"
										id="iconContext-video-library"
										viewBox="0 0 24 24"
										fill="currentColor"
										role="presentation"
									>
										<path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
									</svg>
									<div className="text-sm font-bold tracking-widest mt-2">
										24 VIDEOS
									</div>
								</div>
								<div className="mt-1 h-[206px] bg-zinc-700/50 flex flex-col items-center justify-center rounded-r hover:brightness-125">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="35"
										height="35"
										class="ipc-icon ipc-icon--collections ipc-icon--inline sc-f81a065-0 kcCkmR"
										id="iconContext-collections"
										viewBox="0 0 24 24"
										fill="currentColor"
										role="presentation"
									>
										<path fill="none" d="M0 0h24v24H0V0z"></path>
										<path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
									</svg>
									<div className="text-sm font-bold tracking-widest mt-2">
										99+ PHOTOS
									</div>
								</div>
							</div>
						</div>

						<div className="mt-3">
							{movie.genreList?.map((values) => (
								<span
									className="border text-sm border-zinc-400 hover:bg-zinc-600/50 rounded-full px-3 pt-[2px] pb-[6px] mr-3"
									key={values.key}
								>
									{values.value}
								</span>
							))}
						</div>

						<div className="flex justify-between">
							<div className="w-full max-w-[813px]">
								<div className="py-3 text-zinc-100">{movie.plot}</div>
								<div className="h-12 border-y flex items-center border-zinc-400">
									<span className="font-bold">Creators</span>
									<span>
										{movie.directorList?.map((list) => (
											<span key={list.id}>
												<span className="text-white mx-3">-</span>
												<span className=" text-[#5699ef] hover:underline">
													{list.name}
												</span>
											</span>
										))}
									</span>
								</div>
								<div className="h-12 border-b flex items-center border-zinc-400">
									<span className="font-bold">Stars</span>
									<span>
										{movie.starList?.map((list) => (
											<span key={list.id}>
												<span className="text-white mx-3">-</span>
												<span className=" text-[#5699ef] hover:underline">
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

							<div className="flex mx-3">
								<div
									onClick={handleAddToWatchlist}
									className="h-12 w-[308px] cursor-pointer bg-zinc-700/50 flex items-center rounded-l hover:brightness-125"
								>
									<img
										src={require("../images/icons8-plus-20.png")}
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
