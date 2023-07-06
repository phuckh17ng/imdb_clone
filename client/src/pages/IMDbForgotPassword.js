import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../firebase/firebaseFunctions";
const IMDbForgotPassword = () => {
	const [email, setEmail] = useState();
	const handleResetPassword = (e) => {
		e.preventDefault();
		sendPasswordReset(email);
		alert("Login to your email to reset password");
	};
	return (
		<div className="m-auto h-[100vh] flex items-center">
			<div className="w-[400px] m-auto flex justify-center items-center flex-col border py-10 rounded">
				<Link
					to="/"
					className="rounded text-zinc-800 font-black text-4xl px-2 pt-1 pb-[6px]"
				>
					IMDb
				</Link>
				<div className="text-3xl pt-3 pb-12">Reset your password</div>
				<form onSubmit={handleResetPassword}>
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

					<button className="text-zinc-800 w-full rounded py-1 bg-gradient-to-b from-cyan-500 to-blue-500 font-semibold">
						Reset password
					</button>
				</form>
			</div>
		</div>
	);
};

export default IMDbForgotPassword;
