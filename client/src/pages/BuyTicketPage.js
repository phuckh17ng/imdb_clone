import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllSeat from "../components/seat/AllSeat";
import { getShowingMovieSeat } from "../features/ticket/ticketService";
import { getAllSeatRealTime } from "../firebase/firebaseFunctions";
import "./BuyTicketPage.css";

const BuyTicketPage = () => {
	const showingMovies = useSelector((state) => state.show);
	const [searchBtnState, setSearchBtnState] = useState(false);
	const [searchState, setSearchState] = useState(false);
	const { showingMovie } = showingMovies;
	const { movieId } = useParams();

	const movie = showingMovie.filter((movie) => {
		return movie.movieId === movieId;
	});
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	const [cinema, setCinema] = useState("");
	const [day, setDay] = useState("");
	const [time, setTime] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		if (cinema === "" || day === "" || time === "") {
			setSearchBtnState(false);
		} else {
			setSearchBtnState(true);
		}
	}, [cinema, day, time]);
	const [showAllSeats, setShowAllSeats] = useState(false);

	const name = movie[0]?._name;
	const handleBuyTicket = () => {
		if (cinema === "" || day === "" || time === "") {
			return;
		}
		if (!searchState) return;
		dispatch(getShowingMovieSeat({ name, cinema, day, time }));
		setSearchState(false);
		setShowAllSeats(true);
	};

	let currentDate = new Date();
	const currentTime = new Date().toLocaleTimeString("en-US", {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
	});

	const getShowDate = (dateArr) => {
		let showDate = [];
		showDate = dateArr.filter((date) => {
			const x = new Date(date);
			x.setDate(x.getDate());
			x.setUTCHours(23, 59, 59, 999);
			console.log("date: " + x, "current date: " + currentDate);
			return x > currentDate;
		});
		return showDate;
	};

	const dateArr = [
		"2023-06-20",
		"2023-06-21",
		"2023-06-22",
		"2023-06-23",
		"2023-06-24",
	];
	console.log(getShowDate(dateArr));

	const getShowTime = (currentTime, showTimeArr) => {
		var movieLength = "01:30";

		const date = new Date(day);
		date.setDate(date.getDate() + 1);
		if (currentDate.getMonth() !== date.getMonth()) {
			if (currentDate.getDate() !== date.getDate()) return showTimeArr;
		}
		if (date > currentDate) {
			return showTimeArr;
		}
		// Chuyển đổi chuỗi thành giờ và phút
		var [hours1, minutes1] = currentTime.split(":").map(Number);
		var [hours2, minutes2] = movieLength.split(":").map(Number);
		// Cộng giờ và phút
		var sumHours = hours1 + hours2;
		var sumMinutes = minutes1 + minutes2;

		// Xử lý khi tổng phút vượt quá 60
		if (sumMinutes >= 60) {
			sumHours += Math.floor(sumMinutes / 60);
			sumMinutes %= 60;
		}

		// Định dạng lại chuỗi kết quả
		var timePoint =
			sumHours.toString().padStart(2, "0") +
			":" +
			sumMinutes.toString().padStart(2, "0");

		var showTime = [];
		showTime = showTimeArr.filter((time) => {
			console.log(time, timePoint);
			return time >= timePoint;
		});
		return showTime;
	};

	return (
		<div className="py-9 w-full h-full min-h-screen max-w-[1280px] mx-auto px-3">
			<ToastContainer />
			{movie.map((item) => {
				return (
					<div className="text-zinc-800 flex relative" key={item.movieId}>
						<div
							style={{
								backgroundPosition: "center center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundBlendMode: "normal",
								filter: "blur(100px)",
								backgroundImage: `url(${item._banner})`,
							}}
							className="w-full m-auto h-[600px] relative top-[120px]"
						></div>
						<div className="absolute flex backdrop-blur-xl bg-white/50">
							<img src={item._banner} alt={item._name} className="w-1/3" />
							<div className="w-2/3 px-6 mt-6 flex justify-between flex-col">
								<div>
									<p
										style={{
											background:
												"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
											webkitBackgroundClip: "text",
											webkitTextFillColor: "transparent",
										}}
										className="block w-full text-5xl font-bold text-zinc-800 border-b border-zinc-400/30 pb-6"
									>
										{item._name}
									</p>
									<div className="mt-3">
										<div className="text-2xl">
											<span className="font-bold">Director: </span>
											<span className="font-light">{item._director}</span>
										</div>
										<div className="text-2xl mt-2">
											<span className="font-bold">Actor: </span>
											<span className="font-light">{item._actor}</span>
										</div>
										<div className="text-2xl mt-2">
											<span className="font-bold">Gerne: </span>
											<span className="font-light">{item._gerne}</span>
										</div>
										<span
											style={{
												background:
													"linear-gradient(to top right, #C850C0 0%, #FFCC70 100%)",
											}}
											className=" drop-shadow mt-3 font-extrabold text-white/90 text-2xl inline-block rounded py-2 px-[10px]"
										>
											{item._type}
										</span>
									</div>
								</div>
								<form className="mt-6 mb-6">
									<div className="grid grid-cols-3 gap-2">
										<select
											className="cursor-pointer focus:outline-none py-3 px-3 text-bold rounded-tl-2xl text-xl select font-light"
											onChange={(e) => {
												setCinema(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Cinema
											</option>
											{item._cinema.map((cinema) => {
												return (
													<option value={cinema} key={cinema}>
														{cinema === "HN"
															? "IMDb Hà Nội"
															: cinema === "HCM"
															? "IMDb Hồ Chí Minh"
															: cinema === "DN"
															? "IMDb Đà Nẵng"
															: cinema === "HP"
															? "IMDb Hải Phòng"
															: "IMDb Quảng Bình"}
													</option>
												);
											})}
										</select>
										<select
											className="cursor-pointer focus:outline-none py-2 text-xl select font-light"
											onChange={(e) => {
												setDay(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Day
											</option>
											{getShowDate(item._day).map((day) => {
												console.log(item._day);
												return (
													<option value={day} key={day}>
														{day}
													</option>
												);
											})}
										</select>
										<select
											className="cursor-pointer focus:border-none focus:outline-none outline-none py-2 text-xl select rounded-tr-2xl font-light"
											onChange={(e) => {
												setTime(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Time
											</option>
											{getShowTime(currentTime, item._time).map((time) => {
												return (
													<option value={time} key={time}>
														{time}
													</option>
												);
											})}
										</select>
									</div>
									<div
										style={{
											background:
												"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
										}}
										className={`transition-all duration-300 ease-linear w-full text-white/90 cursor-default py-2 rounded-b-2xl text-center font-bold text-5xl mt-2 opacity-50 ${
											searchBtnState && "opacity-100 !cursor-pointer"
										}`}
										onClick={handleBuyTicket}
									>
										Search
									</div>
								</form>
							</div>
						</div>
					</div>
				);
			})}
			{showAllSeats && cinema && day && time && !isLoading && <AllSeat />}
		</div>
	);
};

export default BuyTicketPage;
