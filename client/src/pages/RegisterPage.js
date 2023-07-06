import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { registerWithEmailAndPassword } from "../firebase/firebaseFunctions";
const RegisterPage = () => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	const handleRegister = (e) => {
		e.preventDefault();
		registerWithEmailAndPassword(name, email, password);
	};
	useEffect(() => {
		if (loading) return;
		if (user) navigate("/");
	}, [user, loading, navigate]);

	return (
		<div className="m-auto h-[100vh] flex items-center">
			<div className="w-[400px] m-auto flex justify-center items-center flex-col border py-10 rounded">
				<Link
					to="/"
					className="rounded text-zinc-800 font-black text-4xl px-2 pt-1 pb-[6px] cursor-pointer"
				>
					IMDb
				</Link>
				<div className="text-3xl pt-3 pb-12">Create account</div>
				<form onSubmit={handleRegister}>
					<div class="mb-3">
						<label class="form-label">User name</label>
						<input
							type="text"
							name="userName"
							class="form-control"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">
							Email address
						</label>
						<input
							type="email"
							name="email"
							value={email}
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
							</div>
						</div>
						<input
							name="password"
							type="password"
							value={password}
							class="form-control"
							id="exampleInputPassword1"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className="text-zinc-800 mt-3 w-full rounded py-1 bg-gradient-to-b from-cyan-500 to-blue-500 font-semibold">
						Create your IMDb account
					</button>

					<div className="w-full flex items-end justify-between mt-3">
						<span className="text-xs text-zinc-700">
							Already have an account?
						</span>
						<Link className=" text-blue-500 underline text-sm" to="/signin/">
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
