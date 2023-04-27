import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SquareLoader from "react-spinners/SquareLoader";
import { getSearchMovies } from "../redux/actions/searchActions";

const SearchPage = () => {
	// const dispatch = useDispatch();
	const getMoviesSearch = useSelector((state) => state.moviesSearch);
	const { moviesSearch, loading } = getMoviesSearch;
	console.log(moviesSearch?.results);
	console.log(getMoviesSearch);

	return loading ? (
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
	) : (
		<div className="w-full bg-black h-full py-6 px-3">
			<div className="w-full max-w-[1250px] px-9 m-auto text-white bg-zinc-800/50 rounded-3xl py-6 flex flex-col justify-between">
				<div className="flex justify-between">
					<div className="w-3/5 pr-3 max-md:w-full">
						<div className="text-white text-3xl border-l-[3.5px] border-[#f5c518] pl-3 mb-3 mr-6">
							Titles
						</div>
						{moviesSearch?.data?.results.map((movie) => {
							if (movie.id.search("tt") !== -1) {
								return (
									<Link
										className="w-full h-28 bg-zinc-700/50 my-2 flex items-center px-2 rounded-r hover:brightness-75"
										key={movie?.id}
										to={`/details/${movie.id}`}
									>
										<Link className="flex items-center justify-center">
											<img
												src={
													movie?.image
														? movie.image
														: require("../images/icons8-no-image-70.png")
												}
												alt={movie.id}
												className="h-[106px] w-[70px] min-w-[70px] object-center hover:brightness-150"
												to={`/details/${movie.id}`}
											/>
										</Link>

										<div className="px-3 h-full pt-3">
											<Link
												to={`/details/${movie.id}`}
												className="text-blue-500 hover:brightness-150"
											>
												{movie.title}
											</Link>
											<div className="text-sm font-thin">
												{movie.description}
											</div>
										</div>
									</Link>
								);
							}
						})}
					</div>
					<div className="w-1/3 max-md:hidden">
						<div className="text-white text-3xl border-l-[3.5px] border-[#f5c518] pl-3 mb-2">
							Advanced search
						</div>
						<div className="text-zinc-100/70">
							Create a more specific search using a variety of options and
							filters
						</div>
						<div className="mt-3">
							<ul className="">
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Movies, TV & more
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									People
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									TV
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Collaborations
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Video Games
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Podcasts
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Movie
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									TV Episodes
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									Music Videos
								</li>
								<li className="mr-2 mt-2 px-3 py-2 cursor-pointer rounded-full bg-zinc-700/50 border !border-zinc-100/30 hover:brightness-125 inline-block">
									All
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="w-full">
					<div className="text-white text-3xl border-l-[3.5px] border-[#f5c518] pl-3 mb-3 mt-12">
						People
					</div>
					<div className="grid grid-cols-2 w-3/5 max-[1024px]:w-full max-md:grid-cols-1">
						{moviesSearch?.data?.results.map((movie) => {
							if (movie.id.search("nm") !== -1) {
								return (
									<Link
										className="h-32 my-2 px-2 mr-3 rounded-full flex hover:bg-zinc-700/50 py-2"
										key={movie?.id}
										to={`/details/${movie.id}`}
									>
										<Link className="min-w-[112px] rounded-full flex items-center justify-center p-[2px] bg-blue-500">
											<img
												src={
													movie?.image
														? movie.image
														: require("../images/blank-people.png")
												}
												alt={movie.id}
												className="hover:brightness-110 object-cover min-w-[104px] h-full rounded-full"
												to={`/details/${movie.id}`}
											/>
										</Link>

										<div className="w-2/3 px-3 mt-2">
											<Link
												to={`/details/${movie.id}`}
												className="text-blue-500 hover:brightness-125"
											>
												{movie.title}
											</Link>
											<div className="text-sm font-thin">
												{movie.description}
											</div>
										</div>
									</Link>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
