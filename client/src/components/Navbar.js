import React from "react";
import { Link } from "react-router-dom";
import { bookmarkStyle } from "../styles/styles";

const Navbar = () => {
	return (
		<div className="bg-black z-50">
			<div className=" bg-black h-14 text-white w-full max-w-[1280px] m-auto px-3">
				<div className="flex items-center h-full">
					<Link
						to="/"
						className="bg-[#f5c518] rounded flex items-center justify-center text-black font-black text-lg w-16 px-4 h-8"
					>
						IMDb
					</Link>
					<div className="flex items-center mx-5">
						<div className="h-[13px] flex flex-col justify-between mr-2">
							<div className="w-4 h-[1.5px] bg-white"></div>
							<div className="w-4 h-[1.5px] bg-white"></div>
							<div className="w-4 h-[1.5px] bg-white"></div>
						</div>
						<label className="font-semibold">Menu</label>
					</div>

					<form className="flex items-center h-8 bg-white rounded pr-3 w-full">
						<div className="flex items-center border-r border-r-zinc-400 h-full w-12 justify-evenly">
							<div className="text-black font-semibold text-[13px]">All</div>
							<img
								src={require("../images/icons8-sort-down-30.png")}
								alt="down-arrow"
								className="w-[10px] h-[10px] mt-1"
							/>
						</div>
						<div className="flex w-full">
							<input
								placeholder="Search IMDb"
								className="text-black outline-none ml-2 w-full"
							/>
							<img
								src={require("../images/icons8-search-50.png")}
								alt="search-icon"
								className="w-5 h-5"
							/>
						</div>
					</form>

					<div className="flex items-center">
						<div className="font-semibold tracking-[-1.25px] w-24 h-9 flex items-center justify-center border-r-2 border-r-zinc-700 mr-2">
							IMDb<span className=" text-blue-300">Pro</span>
						</div>
						<div className="flex items-center">
							<div className="flex items-center mx-3">
								<div
									style={bookmarkStyle}
									className="flex justify-center mr-1 hover:!bg-[#f5c518] w-[14px] h-[18px] bg-white"
								>
									<img
										src={require("../images/icons8-plus-math-15.png")}
										alt="bookmark"
										className="mt-[2px] w-[10px] h-[10px]"
									/>
								</div>
								<label className="font-semibold">Watchlist</label>
							</div>
							<div className="font-semibold mx-3 w-16">Sign in</div>
							<div className="flex items-center justify-evenly mx-3">
								<label className="font-semibold mr-1">EN</label>
								<img
									src={require("../images/icons8-sort-down-30 (1).png")}
									className="w-[10px] h-[10px] mt-1"
									alt="down-arrow"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
