import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../features/user/userService";
import { auth } from "../firebase/firebaseConfig";
import {
	signInWithFacebook,
	signInWithGoogle,
} from "../firebase/firebaseFunctions";

const SignInPage = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const googleSignin = () => {
		signInWithGoogle();
	};
	useEffect(() => {
		if (loading) return;
		if (user !== null) {
			setTimeout(() => {
				navigate("/");
				dispatch(getUserData(user?.uid));
			}, 2000);
		}
	}, [user, loading, navigate, dispatch]);

	return (
		<div className="w-full h-[100vh] bg-zinc-300">
			<div className="w-full max-w-[1000px] bg-white mx-auto px-3 h-full flex">
				<div className="w-full max-w-[800px] mx-auto flex justify-between">
					<div className="w-2/5 my-auto max-sm:mx-auto max-sm:w-full">
						<div className="text-2xl font-bold text-zinc-800 w-full text-center mb-6">
							Sign in
						</div>
						<div className="mx-auto w-full">
							<Link
								to="/signin/imdb"
								className="w-[242px] rounded border-zinc-300 border text-zinc-600 font-bold h-8 cursor-pointer flex items-center my-3 mx-auto"
							>
								<img
									src={require("../images/icons8-imdb-an-online-database-of-information-related-to-films,-and-television-programs-25.png")}
									alt="imdb"
									className=" w-5 h-5 mx-3"
								/>
								<span>Sign in with IMDb</span>
							</Link>
							<div
								className="w-[242px] rounded border-zinc-300 border text-zinc-600 font-bold h-8 cursor-pointer flex items-center my-3 mx-auto"
								onClick={googleSignin}
							>
								<img
									src={require("../images/icons8-google-30.png")}
									alt="Google"
									className=" w-5 h-5 mx-3"
								/>
								<span>Sign in with Google</span>
							</div>
							<div className="w-[242px] rounded border-zinc-300 border text-zinc-600 font-bold h-8 cursor-pointer flex items-center my-3 mx-auto">
								<img
									src={require("../images/icons8-amazon-30.png")}
									alt="Amazon"
									className=" w-5 h-5 mx-3"
								/>
								<span>Sign in with Amazon</span>
							</div>
							<div className="w-[242px] rounded border-zinc-300 border text-zinc-600 font-bold h-8 cursor-pointer flex items-center my-3 mx-auto">
								<img
									src={require("../images/icons8-apple-logo-30.png")}
									alt="Apple"
									className=" w-5 h-5 mx-3"
								/>
								<span>Sign in with Apple</span>
							</div>
							<div
								className="w-[242px] rounded border-zinc-300 border text-zinc-600 font-bold h-8 cursor-pointer flex items-center my-3 mx-auto"
								onClick={signInWithFacebook}
							>
								<img
									src={require("../images/icons8-facebook-30 (1).png")}
									alt="facebook"
									className=" w-5 h-5 mx-3"
								/>
								<span>Sign in with Facebook</span>
							</div>
						</div>
						<div className="w-[236px] border-b mx-auto border-zinc-900 relative pt-2">
							<div className="absolute left-[42%] top-[-5px] bg-white w-10 text-center text-sm pt-[1.5px]">
								Or
							</div>
						</div>

						<Link
							to="/signin/register"
							className="bg-zinc-800 mt-6 rounded hover:brightness-90 h-9 flex items-center justify-center text-white/90 font-bold pb-1 w-[242px] mx-auto"
						>
							Create a New Account
						</Link>
						<div className="mx-auto text-center text-xs w-[242px] pt-12">
							By signing in, you agree to IMDb's&nbsp;
							<a
								href="https://www.imdb.com/conditions"
								className="text-[#5699ef] hover:underline"
							>
								Conditions of Use&nbsp;
							</a>
							and&nbsp;
							<a
								href="https://www.imdb.com/privacy"
								className="text-[#5699ef] hover:underline"
							>
								Privacy Policy
							</a>
							.
						</div>
					</div>
					<div className="w-1/2 border-l pl-6 h-fit my-auto max-sm:hidden">
						<div className="text-2xl font-bold text-zinc-800">
							Benefits of your free IMDb account
						</div>
						<ul>
							<li className="my-3">
								<div className="font-bold">Personalized Recommendations</div>
								<div className="text-sm">Discover shows you'll love.</div>
							</li>
							<li className="my-3">
								<div className="font-bold">Your Watchlist</div>
								<div className="text-sm">
									Track everything you want to watch and receive e-mail when
									movies open in theaters.
								</div>
							</li>
							<li className="my-3">
								<div className="font-bold">Your Ratings</div>
								<div className="text-sm">
									Rate and remember everything you've seen.
								</div>
							</li>
							<li className="my-3">
								<div className="font-bold">Contribute to IMDb</div>
								<div className="text-sm">
									Add data that will be seen by millions of people and get cool
									badges.
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
