import {
	addDoc,
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebaseConfig";

const UserSettingsPage = () => {
	const navigate = useNavigate();
	const [user, loading, error] = useAuthState(auth);
	const q = query(collection(db, "users"), where("uid", "==", user?.uid));
	const docs = getDocs(q);
	console.log(docs);
	// useEffect(() => {
	// 	if (loading) return;
	// 	if (user === null) {
	// 		navigate("/");
	// 	}
	// });
	console.log(user);
	return <div className="h-[100vh] text-black">{user?.displayName}</div>;
};

export default UserSettingsPage;
