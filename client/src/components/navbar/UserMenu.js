import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/firebaseFunctions";

const UserMenu = ({ uid, mouseLeave }) => {
	return (
		mouseLeave && (
			<div
				onMouseLeave={mouseLeave}
				className="font-normal w-[170px] bg-zinc-800 absolute top-10 right-0 z-50 flex flex-col justify-start items-start py-3 rounded"
			>
				<Link
					to={`/watchlist`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 sm:hidden"
				>
					Watchlist
				</Link>
				<Link
					to={`account/${uid}`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				>
					Settings
				</Link>
				<Link
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
					onClick={logout}
					to="/"
				>
					Logout
				</Link>
			</div>
		)
	);
};

export default UserMenu;
