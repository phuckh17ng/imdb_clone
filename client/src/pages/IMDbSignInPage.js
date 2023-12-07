import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { logInWithEmailAndPassword } from "../firebase/firebaseFunctions";

const IMDbSignInPage = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	const handleLogin = (e) => {
		e.preventDefault();
		logInWithEmailAndPassword(email, password);
	};

	useEffect(() => {
		if (loading) return;
		if (user !== null) {
			navigate("/");
		}
	}, [user, loading, navigate]);

	return (
		<div className="m-auto h-[100vh] flex items-center">
			<div className="w-[400px] m-auto flex justify-center items-center flex-col border py-10 rounded">
				<Link
					to="/"
					className="rounded text-zinc-800 font-black text-4xl px-2 pt-1 pb-[6px]"
				>
					IMDb
				</Link>
				<div className="text-3xl pt-3 pb-12">Sign in</div>
				<form onSubmit={handleLogin}>
					<div class="mb-6">
						<label for="exampleInputEmail1" class="form-label">
							Email address
						</label>
						<input
							type="email"
							name="email"
							class="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div id="emailHelp" class="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div class="mb-3">
						<div
							for="exampleInputPassword1"
							class="form-label"
							style={{ width: "full" }}
						>
							<div className="flex items-center justify-between w-full">
								<span>Password</span>
								<Link
									className="text-sm text-blue-500 underline cursor-pointer"
									to="/signin/imdb/resetpassword"
								>
									Forgot your password?
								</Link>
							</div>
						</div>
						<input
							name="password"
							type="password"
							class="form-control"
							id="exampleInputPassword1"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div class="mb-3 form-check">
						<input
							type="checkbox"
							class="form-check-input"
							id="exampleCheck1"
						/>
						<label class="form-check-label" for="exampleCheck1">
							Remember me
						</label>
					</div>
					<button className="text-zinc-800 w-full rounded py-1 bg-gradient-to-b from-cyan-500 to-blue-500 font-semibold">
						Sign in
					</button>

					<div className="w-full flex items-end justify-between mt-3">
						<span className="text-xs text-zinc-700">New to IMDb?</span>
						<Link
							className=" text-blue-500 underline text-sm"
							to="/signin/register"
						>
							Create an account
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default IMDbSignInPage;
