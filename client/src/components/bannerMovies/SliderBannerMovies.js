import { useEffect } from "react";
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
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
			},
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
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
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
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (3).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/slider/slide (12).jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t mb-1 ml-3 max-sm:w-full">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (34).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-10.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t mb-1 ml-3 max-sm:w-full">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												'White Men Can't Jump'
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												Watch the Trailer With Jack Harlow & Sinqua Walls
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (31).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/slider/slide (11).jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												'Chevalier' Reveals Its "Watchmen" Connections
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												Watch the Cast Interview
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (38).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] min-h-[500px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-7.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (10).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-6.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (29).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-5.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (36).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-1.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (32).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-2.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (16).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-3.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="w-full h-[540px] relative max-md:h-[440px] max-sm:h-[330px]">
								<div className="cursor-pointer relative">
									<img
										src={require("../../images/slider/slide (25).jpg")}
										alt="slide"
										className="cursor-pointer w-full max-h-[477px] h-full object-cover"
									/>
									<div
										style={{
											background:
												"linear-gradient(transparent 0%, transparent 65%, rgba(0, 0, 0, 0.7) 77%, rgb(0, 0, 0) 85%, rgb(0, 0, 0) 100%)",
										}}
										className="top-0 right-0 w-full h-full absolute"
									></div>
								</div>

								<div className="absolute bottom-0 left-0 flex items-end px-3 max-sm:w-full">
									<img
										src={require("../../images/paging/page-4.jpg")}
										alt="slide"
										className="w-[165px] h-[244px] max-md:w-[120px] max-md:h-auto"
									/>
									<div className="banner--description flex max-sm:flex-col">
										<div className="w-fit play--btn-border border-[3px] p-[20px] h-fit rounded-full flex items-center justify-center ml-3 max-sm:p-[12px]">
											<div
												className="w-6 h-6 bg-white play--btn max-sm:w-3 max-sm:h-3"
												style={playButton}
											></div>
										</div>

										<div className="w-4/5 bg-gradient-to-t max-sm:w-full ml-3">
											<div className="text-4xl text-zinc-100 max-md:text-2xl max-sm:text-xl">
												4 Upcoming Action Movies We Can't Wait to Watch
											</div>
											<div className="text-xl text-zinc-200/80 max-md:text-lg max-sm:text-sm">
												'Ghosted' and More
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>

				<div class="swiper-container gallery-thumbs">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-0.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-10.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-8.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											'Chevalier' Reveals Its "Watchmen" Connections
										</div>
										<div className="text-sm text-zinc-200/80">
											Watch the Cast Interview
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-7.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-6.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-5.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-1.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-2.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-3.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div className="flex cursor-pointer">
								<img
									src={require("../../images/paging/page-4.jpg")}
									alt="Slide 01"
									className=" w-[114.75px] object-cover"
								/>
								<div className="banner--description">
									<div className="play--btn-border border-[2px] p-[10px] w-fit h-fit rounded-full flex items-center justify-center mx-3">
										<div
											className="play--btn w-4 h-4 bg-white"
											style={playButton}
										></div>
									</div>

									<div className="w-full bg-gradient-to-t mb-1 ml-4 mt-2">
										<div className=" text-zinc-100">
											4 Upcoming Action Movies We Can't Wait to Watch
										</div>
										<div className="text-sm text-zinc-200/80">
											'Ghosted' and More
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SliderBannerMovies;
