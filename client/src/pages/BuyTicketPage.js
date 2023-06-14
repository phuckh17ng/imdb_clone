import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllSeat from "../components/seat/AllSeat";
import { getShowingMovieSeat } from "../features/ticket/ticketService";
import "./BuyTicketPage.css";

const BuyTicketPage = () => {
	const showingMovies = useSelector((state) => state.show);
	const { showingMovie, isLoading } = showingMovies;
	const { movieId } = useParams();

	const movie = showingMovie.filter((movie) => {
		return movie.movieId === movieId;
	});

	const [cinema, setCinema] = useState("");
	const [day, setDay] = useState("");
	const [time, setTime] = useState("");
	console.log(cinema, day, time);
	const dispatch = useDispatch();
	const handleBuyTicket = () => {
		dispatch(getShowingMovieSeat({ cinema, day, time }));
	};

	return (
		<div className="py-9 w-full h-full max-w-[1280px] mx-auto px-3">
			{movie.map((item) => {
				return (
					<div className="text-zinc-800 flex relative" key={item.movieId}>
						<div
							style={{
								backgroundPosition: "",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundBlendMode: "normal",
								filter: "blur(120px)",
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
										className="block w-full text-5xl font-bold text-zinc-800 border-b border-zinc-400 pb-3"
									>
										{item._name}
									</p>
									<div className="mt-3">
										<div className="text-xl">
											<span className="font-bold">Director:</span>{" "}
											{item._director}
										</div>
										<div className="text-xl mt-2">
											<span className="font-bold">Actor:</span> {item._actor}
										</div>
										<div className="text-xl mt-2">
											<span className="font-bold">Gerne:</span> {item._gerne}
										</div>
										<span className="mt-3 font-bold text-xl inline-block border-3 rounded border-zinc-800 p-2">
											{item._type}
										</span>
									</div>
								</div>
								<form className="mt-6 mb-6">
									<div className="grid grid-cols-3 gap-3">
										<select
											className="py-3 px-3 text-bold rounded-tl-2xl text-xl select"
											onChange={(e) => {
												setCinema(e.target.value);
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
											className="py-2 text-xl select"
											onChange={(e) => {
												setDay(e.target.value);
											}}
										>
											<option value="" disabled selected hidden>
												Select Day
											</option>
											{item._day.map((day) => {
												return (
													<option value={day} key={day}>
														{day}
													</option>
												);
											})}
										</select>
										<select
											className="py-2 text-xl select rounded-tr-2xl"
											onChange={(e) => {
												setTime(e.target.value);
											}}
										>
											<option value="" disabled selected hidden>
												Select Time
											</option>
											{item._time.map((time) => {
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
										className="w-full text-white py-3 rounded-b-2xl text-center font-bold text-xl mt-3"
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
			<AllSeat />
		</div>
	);
};

export default BuyTicketPage;
