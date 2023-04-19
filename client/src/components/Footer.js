import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();
	return (
		<div className="bg-black text-white">
			{location.pathname === "/signin/imdb" ||
			location.pathname === "/signin/register" ? null : (
				<div className="w-full max-w-[1280px] mx-auto px-3 pt-16 h-[260px]">
					<button className="bg-[#f5c518] rounded hover:brightness-90 h-9 flex items-center justify-center text-black text-sm font-semibold pb-1 px-6 mx-auto">
						Sign in for more access
					</button>

					<ul className="flex justify-center mt-6">
						<li className="font-semibold px-3 hover:underline">
							Get the IMDb App
						</li>
						<li className="font-semibold px-3 hover:underline">Help</li>
						<li className="font-semibold px-3 hover:underline">Site Index</li>
						<li className="font-semibold px-3 hover:underline">Site Index</li>
						<li className="font-semibold px-3 hover:underline">
							Box Office Mojo
						</li>
						<li className="font-semibold px-3 hover:underline">
							IMDb Developer
						</li>
					</ul>
					<ul className="flex justify-center mt-3">
						<li className="font-semibold px-3 hover:underline">Press Room</li>
						<li className="font-semibold px-3 hover:underline">Advertising</li>
						<li className="font-semibold px-3 hover:underline">Jobs</li>
						<li className="font-semibold px-3 hover:underline">
							Conditions of Use
						</li>
						<li className="font-semibold px-3 hover:underline">
							Privacy Policy
						</li>
						<li className="font-semibold px-3 hover:underline">
							Your Ads Privacy Choices
						</li>
					</ul>
					<div className="w-full text-center mt-6 text-zinc-300/50 text-xs">
						© 1990-2023 by IMDb.com, Inc.
					</div>
				</div>
			)}
		</div>
	);
};

export default Footer;
