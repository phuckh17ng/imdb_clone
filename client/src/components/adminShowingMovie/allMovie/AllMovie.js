import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DotsIcon, FilterIcon, SearchIcon } from "../flowbiteIcon";
import "./AllMovie.css";
import MovieItem from "./MovieItem";

const AllMovie = ({ show }) => {
	const showState = useSelector((state) => state.admin);
	const { all, isLoading } = showState;
	let showingMovieArr = [...all];
	const [showingMovieSearchData, setShowingMovieSearchData] = useState(all);

	useEffect(() => {
		setShowingMovieSearchData(
			showingMovieArr?.sort((a, b) =>
				b.movieId.localeCompare(a.movieId, undefined, {
					numeric: true,
					sensitivity: "base",
				})
			)
		);
	}, [all]);

	const handleSearchShowingMovie = (e) => {
		setShowingMovieSearchData(
			showingMovieArr
				?.sort((a, b) =>
					b.movieId.localeCompare(a.movieId, undefined, {
						numeric: true,
						sensitivity: "base",
					})
				)
				?.filter((item) => {
					return (
						item.movieId.toLowerCase().includes(e.target.value) ||
						item._name.toLowerCase().includes(e.target.value) ||
						item.dayCreate.toLowerCase().includes(e.target.value)
					);
				})
		);
	};
	return (
		show === "show" && (
			<div className="text-zinc-700 min-h-screen w-full h-full flex items-center justify-center py-9">
				<div className="relative w-[90%] min-h-screen bg-white rounded-2xl p-6">
					<div className="flex items-center justify-between">
						<p className="text-3xl font-bold ml-2">Showing Movie</p>
						<div className="flex items-center">
							<div className="border-zinc-500 hover:border-zinc-800 hover border-[2px] flex items-center bg-white rounded-full pl-6 pr-9">
								{SearchIcon}
								<input
									placeholder="Search movie"
									className=" placeholder:text-zinc-500 ml-3 focus:outline-none bg-white h-9"
									type="text"
									onChange={handleSearchShowingMovie}
								/>
							</div>

							<div className="flex">
								<div className="ml-6 rounded-full w-full h-full cursor-pointer">
									{FilterIcon}
								</div>
								<div className="ml-6 rounded-full w-full h-full cursor-pointer">
									{DotsIcon}
								</div>
							</div>
						</div>
					</div>

					<div className="w-full h-full shadow-sm border mt-3">
						<div className="w-full h-full bg-zinc-100/60">
							<div className="text-zinc-500 font-semibold text-sm content-table w-full items-center py-1 px-3 border-b border-zinc-300/50">
								<div className="pr-2">Movie ID</div>
								<div>Name</div>
								<div className="text-end">Date created</div>
								<div className="text-end">Last modified</div>
								<div className="text-end pr-3">Edit</div>
								<div className="text-end">Remove</div>
							</div>
						</div>
						<div className="w-full h-full bg-zinc-50/5">
							{showingMovieSearchData?.map((item) => {
								return (
									<MovieItem
										key={item.movieId}
										_name={item._name}
										movieId={item.movieId}
										dayCreate={item.dayCreate}
										isDeleted={item.isDeleted}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AllMovie;
