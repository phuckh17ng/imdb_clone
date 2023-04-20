import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { addMovieToWatchlist, auth, db } from "../firebaseConfig";

const WatchlistPage = () => {
	const [user, loading] = useAuthState(auth);
	console.log(user?.uid);
	const watchlist = useSelector((state) => state.watchlist);
	console.log(watchlist.watchlistItems);
	useEffect(() => {
		addMovieToWatchlist(user?.uid, watchlist?.watchlistItems);
	}, [user?.uid, watchlist?.watchlistItems]);
	useEffect(() => {
		const fetchUserData = async () => {
			if (user !== null) {
				const q = query(collection(db, "users"), where("uid", "==", user?.uid));
				const docs = await getDocs(q);
				console.log(docs);
				docs.forEach((docc) => {
					console.log(docc.data());
					// updateDoc(doc(db, "users", docc.ref.id), {
					// 	watchlist: [{ id: "123123" }, { id: "gkdjsgkj" }],
					// });
				});
			}
		};
		fetchUserData();
	}, [user, user?.uid]);
	return <div>WatchlistPage</div>;
};

export default WatchlistPage;
