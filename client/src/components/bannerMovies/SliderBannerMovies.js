// import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { playButton } from "../../styles/styles";
import "./SliderBanner.css";
const SliderBannerMovies = () => {
	const settings = {
		dots: true,
		// dotsClass: "slick-dots slick-thumb",
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
		arrows: true,
		swipeToSlide: true,
	};
	return (
		// w-[850px]
		<div className="max-w-[1280px] w-full mx-auto px-3 text-white h-full py-3">
			<Slider {...settings} className="w-full relative">
				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[540px] relative">
					<div className="relative">
						<img
							src={require("../../images/slider/slide (3).jpg")}
							alt="slide"
							className="w-full max-h-[477px] h-full object-cover"
						/>
						<div
							style={{
								background:
									"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
							}}
							className="top-0 right-0 w-full h-full absolute"
						></div>
					</div>

					<div className="absolute bottom-0 left-0 flex items-end px-6">
						<img
							src={require("../../images/slider/slide (12).jpg")}
							alt="slide"
							className="w-[165px] h-[244px]"
						/>
						<div className="flex">
							<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
								<div className="w-6 h-6 bg-white" style={playButton}></div>
							</div>

							<div className="w-3/5 bg-gradient-to-t ">
								<div className="text-4xl text-zinc-100">
									4 Upcoming Action Movies We Can't Wait to Watch
								</div>
								<div className="text-xl text-zinc-200/80">
									'Ghosted' and More
								</div>
							</div>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default SliderBannerMovies;
