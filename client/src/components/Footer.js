import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

const Footer = () => {
	const location = useLocation();
	const [user] = useAuthState(auth);
	return location.pathname === "/signin/imdb" ||
		location.pathname === "/signin/register" ||
		location.pathname === "/signin/imdb/resetpassword" ? null : (
		<div className="bg-black text-white h-full pb-3">
			<div className="w-full max-w-[1280px] mx-auto px-3 pt-16 h-full">
				{!user ? (
					<Link
						to="/signin"
						className="bg-[#f5c518] w-fit rounded hover:brightness-90 h-9 flex items-center justify-center text-black text-sm font-semibold pb-1 px-6 mx-auto"
					>
						Sign in for more access
					</Link>
				) : (
					""
				)}
				<div className="max-sm:flex w-full max-sm:justify-around">
					<ul className="flex justify-center mt-6 max-sm:flex-col">
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Get the IMDb App
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Help
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Site Index
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Site Index
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Box Office Mojo
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							IMDb Developer
						</li>
					</ul>
					<ul className="flex justify-center mt-3 max-sm:flex-col">
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Press Room
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Advertising
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Jobs
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Conditions of Use
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Privacy Policy
						</li>
						<li className="font-semibold px-3 hover:underline text-center max-sm:!text-start cursor-pointer">
							Your Ads Privacy Choices
						</li>
					</ul>
				</div>

				<div className="w-full text-center mt-6 text-zinc-300/50 text-xs">
					© 1990-2023 by IMDb.com, Inc.
				</div>
			</div>
		</div>
	);
};

export default Footer;
