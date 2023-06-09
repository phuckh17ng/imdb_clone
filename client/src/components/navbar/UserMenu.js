import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetWatchlist } from "../../features/watchlist/watchlistSlice";
import { logout } from "../../firebase/firebaseFunctions";

const UserMenu = ({ uid, mouseLeave }) => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		logout();
		dispatch(resetWatchlist());
	};
	return (
		mouseLeave && (
			<div
				onMouseLeave={mouseLeave}
				className="font-normal w-[200px] bg-zinc-800 absolute top-10 right-0 z-50 flex flex-col justify-start items-start py-3 rounded"
			>
				<Link
					to={`/watchlist`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 sm:hidden"
				>
					Watchlist
				</Link>
				<Link
					to="nowshowing"
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				>
					Showing Movie
				</Link>
				<Link
					to={`user`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				>
					Settings
				</Link>
				<Link
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
					onClick={handleLogout}
					to="/"
				>
					Logout
				</Link>
			</div>
		)
	);
};

export default UserMenu;
