import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../../styles/styles";

const WatchlistUnSign = () => {
	return (
		<div className="text-white flex justify-center flex-col items-center">
			<div
				style={styles.bookmarkStyle}
				className=" w-[32px] h-[42px] bg-zinc-800/70 flex items-center justify-center pb-3 z-10 drop-shadow-xl"
			>
				<img
					src={require("../../images/icons8-plus-20.png")}
					alt="bookmark"
					style={{ opacity: "1!important" }}
					className="z-10"
				/>
			</div>
			<div className="mt-4 font-semibold">Sign in to access your Watchlist</div>
			<div>Save shows and movies to keep track of what you want to watch.</div>
			<Link
				to="/signin"
				className=" bg-zinc-700/50 rounded h-[36px] flex items-center justify-center mt-4 w-[160px]"
			>
				<div className="text-[#5699ef] font-semibold ml-2 text-sm">
					Sign in to IMDb
				</div>
			</Link>
		</div>
	);
};

export default WatchlistUnSign;
