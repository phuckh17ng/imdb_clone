import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
	UserCredential,
	connectAuthEmulator,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { auth } from "../firebaseConfig";

const loginEmail = document.getElementsByName("email");
const loginPassword = document.getElementsByName("password");

// connectAuthEmulator(auth, "http:localhost://9899");
const isSignIn = async (e) => {
	console.log(loginEmail);
	e.preventDefault();
	const UserCredential = await signInWithEmailAndPassword(
		auth,
		loginEmail[0].value,
		loginPassword[0].value
	);
	console.log(UserCredential.user);
};

const IMDbSignInPage = () => {
	return (
		<div className="m-auto h-[100vh] flex items-center">
			<div className="w-[400px] m-auto flex justify-center items-center flex-col border py-10 rounded">
				<span className="bg-[#f5c518] rounded text-zinc-800 font-black text-4xl px-2 pt-1 pb-[6px]">
					IMDb
				</span>
				<div className="text-3xl pt-3 pb-12">Sign in</div>
				<form onSubmit={isSignIn}>
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">
							Email address
						</label>
						<input
							type="email"
							name="email"
							class="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<div id="emailHelp" class="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">
							Password
						</label>
						<input
							name="password"
							type="password"
							class="form-control"
							id="exampleInputPassword1"
						/>
					</div>
					<div class="mb-3 form-check">
						<input
							type="checkbox"
							class="form-check-input"
							id="exampleCheck1"
						/>
						<label class="form-check-label" for="exampleCheck1">
							Check me out
						</label>
					</div>
					<button
						// type="submit"
						className="text-zinc-800 w-full rounded py-1 bg-gradient-to-b from-cyan-500 to-blue-500 font-semibold"
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
};

export default IMDbSignInPage;
