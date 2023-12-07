import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { seatPayment } from "../../features/payment/paymentService";
import { getShowingMovieDetails } from "../../features/show/showSlice";

const PaymentModal = ({ clearForm, ticketInfo, show, click }) => {
	const dispatch = useDispatch();
	const { movieId } = useParams();
	useEffect(() => {
		dispatch(getShowingMovieDetails(movieId));
	}, [movieId, dispatch]);
	let movieInfo = useSelector((state) => state.show.details);
	let paymentState = useSelector((state) => state.payment);
	const form = ticketInfo;
	console.log(form);
	const root = document.getElementById("root");
	const handlePayment = () => {
		if (form?.seat?.length === 0) return;
		dispatch(seatPayment({ form }));
		click();
		show = false;
		clearForm();
		toast.success("Successful Ticket Purchase!");
	};

	if (show) {
		root.style.overflow = "hidden";
		root.style.height = "100%";
	} else {
		root.style.overflow = "auto";
	}
	return (
		<div
			className={`${
				show ? "opacity-100 visible" : "opacity-0 invisible"
			} transition-all fixed duration-500 top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-md bg-zinc-900/50 flex justify-center items-center`}
			onClick={(e) => {
				if (e.currentTarget !== e.target) return;
				click();
				show = false;
			}}
		>
			<div
				className={`${
					show ? "opacity-100 visible" : "opacity-0 invisible"
				} transition-all duration-500 w-[808px] h-[95%] rounded-xl bg-white delay-100 flex justify-center items-center`}
			>
				<div className="w-[90%] h-[93%] flex flex-col">
					<div className="flex border-b-2 pb-2 justify-between">
						<div className="flex">
							<div className="inline-block bg-zinc-800 mr-3 rounded text-white font-black text-2xl px-4 py-3 no-underline">
								IMDb
							</div>
							<div className="ml-3">
								<div className="text-4xl font-bold text-zinc-700">
									Ticket Information
								</div>
								<div className="text-lg text-zinc-500 italic">
									Please double-check before proceeding with the payment.
								</div>
							</div>
						</div>

						<img
							src={require("../../images/icons8-x-50.png")}
							alt="escape"
							className="w-8 h-8"
							onClick={(e) => {
								if (e.currentTarget !== e.target) return;
								click();
								show = false;
							}}
						/>
					</div>

					<div className="mt-3 flex h-fit">
						<div className="w-[150px] h-auto ">
							<img src={movieInfo._banner} alt={movieInfo._name} />
						</div>
						<div className="ml-6 h-full flex flex-col">
							<div className="text-2xl">
								<span className="text-zinc-500 font-thin">Movie: </span>
								<span className="text-zinc-800 font-bold">
									{movieInfo._name}
								</span>
							</div>
							<div>
								<div className="text-2xl mt-1">
									<span className="text-zinc-500 font-thin">Cinema: </span>
									<span className="text-zinc-800 font-bold">
										{ticketInfo?.movieCinema === "HCM"
											? "IMDb Hồ Chí Minh"
											: ticketInfo?.movieCinema === "HP"
											? "IMDb Hải Phòng"
											: ticketInfo?.movieCinema === "DN"
											? "IMDb Đà Nẵng"
											: ticketInfo?.movieCinema === "HN"
											? "IMDb Hà Nội"
											: "IMDb Quảng Bình"}
									</span>
								</div>
								<div className="text-2xl mt-1">
									<span className="text-zinc-500 font-thin">Date: </span>
									<span className="text-zinc-800 font-bold">
										{ticketInfo?.movieDay}
									</span>
								</div>
								<div className="text-2xl mt-1">
									<span className="text-zinc-500 font-thin">Start time: </span>
									<span className="text-zinc-800 font-bold">
										{ticketInfo?.movieTime}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-3 h-12 w-full bg-zinc-300/30 flex">
						<span className="flex items-center pl-3 text-xl font-bold text-zinc-800">
							Seat:{" "}
						</span>
						<div className="flex h-full ml-3 items-center justify-between w-full overflow-auto">
							<div className="w-full h-full">
								{ticketInfo?.seat?.map((seat) => {
									return (
										<span className="text-center inline-block ml-1 text-white font-bold w-12 h-12 bg-zinc-500 rounded-sm">
											<div className="w-full h-full flex items-center justify-center">
												<span className="inline-block">{seat}</span>
											</div>
										</span>
									);
								})}
							</div>

							<div className="mr-3">
								<span className="ml-1 font-bold text-xl text-zinc-800">
									{ticketInfo?.seat?.length}
								</span>
							</div>
						</div>
					</div>

					<div className="mt-3 w-full grid grid-cols-2 gap-3 h-full">
						<div className="border-2 border-zinc-300 rounded-lg px-3 py-2 overflow-y-auto">
							<div
								className="text-xl font-bold"
								style={{
									background:
										"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
									webkitBackgroundClip: "text",
									webkitTextFillColor: "transparent",
								}}
							>
								Ticket Holder
							</div>
							<div className="text-xl mt-1">
								<span className="font-thin">Name:</span>
								<span className="ml-3 text-zinc-800 font-semibold">
									{ticketInfo?.name}
								</span>
							</div>
							<div className="text-xl">
								<span className="font-thin">Email:</span>
								<span className="ml-3 text-zinc-800 font-semibold">
									{ticketInfo?.email}
								</span>
							</div>
							<div className="text-xl">
								<span className="font-thin">Phone number:</span>
								<span className="ml-3 text-zinc-800 font-semibold">
									{ticketInfo?.phoneNumber}
								</span>
							</div>
						</div>
						<div className="text-base flex flex-col justify-end">
							<div className="px-3 border-b pb-1 text-xl">
								<div className="flex justify-between text-zinc-500">
									<span className="text-base">Ticket:</span>
									<span className="">{ticketInfo?.seat?.length} x 90000</span>
								</div>
								<div className="flex justify-between text-zinc-500">
									<span className="text-base">Discount:</span>
									<span className=" text-red-500">-10000</span>
								</div>
							</div>
							<div className="flex justify-between px-3 mt-1 text-xl">
								<span>Total:</span>
								<span className="text-zinc-800">
									{ticketInfo?.seat?.length * 90000 - 10000} VND
								</span>
							</div>
						</div>
						<div className="border-2 border-zinc-300 rounded-lg px-3 py-2">
							<p
								className="text-xl pl-1 font-bold text-[#C850C0]"
								// style={{
								// 	background:
								// 		"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
								// 	webkitBackgroundClip: "text",
								// 	webkitTextFillColor: "transparent",
								// }}
							>
								Voucher
							</p>
							<div className="flex items-center mt-2">
								<input
									tpye="text"
									className=" focus:outline-none border py-2 px-3 rounded"
								/>
								<div className="ml-3 px-3 py-2 rounded bg-zinc-300/30 text-zinc-800/50 font-semibold hover:bg-zinc-800 hover:text-white transition-all duration-200">
									Apply
								</div>
							</div>
						</div>
						<div className="w-full h-full flex items-end justify-end">
							<div
								className={`${
									form?.seat?.length === 0
										? "!opacity-50 !cursor-default"
										: "!opacity-100"
								} cursor-pointer drop-shadow-lg mt-3 h-12 px-6 flex items-center justify-center text-white font-bold text-2xl rounded-xl`}
								style={{
									background:
										"linear-gradient(to top left, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
								}}
								onClick={handlePayment}
							>
								Payment
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;
