// import React, { useEffect, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { playButton } from "../../styles/styles";
import "./SliderBanner.css";

const SliderBannerMovies = () => {
	useEffect(() => {
		var galleryThumbs = new Swiper(".gallery-thumbs", {
			centeredSlides: true,
			centeredSlidesBounds: true,
			slidesPerView: 3,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: "vertical",
		});

		var galleryMain = new Swiper(".gallery-main", {
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			thumbs: {
				swiper: galleryThumbs,
			},
		});

		galleryMain.on("slideChangeTransitionStart", function () {
			galleryThumbs.slideTo(galleryMain.activeIndex);
		});

		galleryThumbs.on("transitionStart", function () {
			galleryMain.slideTo(galleryThumbs.activeIndex);
		});
	}, []);

	return (
		// w-[850px]
		<div className="max-w-[1280px] w-full mx-auto px-3 text-white h-full py-3">
			<div class="gallery-container">
				<div class="swiper-container gallery-main">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
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

								<div className="absolute bottom-0 left-0 flex items-end px-3">
									<img
										src={require("../../images/slider/slide (12).jpg")}
										alt="slide"
										className="w-[165px] h-[244px]"
									/>
									<div className="flex">
										<div className="border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center mx-3">
											<div
												className="w-6 h-6 bg-white"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t mb-1">
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
						</div>
						<div class="swiper-slide">
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
											<div
												className="w-6 h-6 bg-white"
												style={playButton}
											></div>
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
						</div>
						<div class="swiper-slide">
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
											<div
												className="w-6 h-6 bg-white"
												style={playButton}
											></div>
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
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 04</div>
							<img
								src="https://picsum.photos/seed/slide4/600/300"
								alt="Slide 04"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 04</div>
							<img
								src="https://picsum.photos/seed/slide5/600/300"
								alt="Slide 05"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 06</div>
							<img
								src="https://picsum.photos/seed/slide6/600/300"
								alt="Slide 06"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 07</div>
							<img
								src="https://picsum.photos/seed/slide7/600/300"
								alt="Slide 07"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 08</div>
							<img
								src="https://picsum.photos/seed/slide8/600/300"
								alt="Slide 08"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 09</div>
							<img
								src="https://picsum.photos/seed/slide9/600/300"
								alt="Slide 09"
							/>
						</div>
						<div class="swiper-slide">
							<div class="gallery-title">Slide 10</div>
							<img
								src="https://picsum.photos/seed/slide10/600/300"
								alt="Slide 10"
							/>
						</div>
					</div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
				<div class="swiper-container gallery-thumbs">
					<div class="swiper-wrapper">
						{}
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide1/115/100"
								alt="Slide 01"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide2/115/100"
								alt="Slide 02"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide3/115/100"
								alt="Slide 03"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide4/115/100"
								alt="Slide 04"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide5/115/100"
								alt="Slide 05"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide6/115/100"
								alt="Slide 06"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide7/115/100"
								alt="Slide 07"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide8/115/100"
								alt="Slide 08"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide9/115/100"
								alt="Slide 09"
							/>
						</div>
						<div class="swiper-slide">
							<img
								src="https://picsum.photos/seed/slide10/115/100"
								alt="Slide 10"
							/>
						</div>
					</div>
				</div>
			</div>
			<script></script>
		</div>
	);
};

export default SliderBannerMovies;
