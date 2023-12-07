function SampleNextArrow(props) {
	const { className, onClick } = props;
	return <div className={`${className} mr-4`} onClick={onClick}></div>;
}

function SamplePrevArrow(props) {
	const { className, onClick } = props;
	return <div className={`${className} ml-5 z-50`} onClick={onClick} />;
}
export const slickSliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 5,
	lazyLoad: true,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
};
