import { Box, Button, Modal, Slider } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserImage } from "../features/user/userService";

// Styles
const boxStyle = {
	width: "300px",
	height: "300px",
	display: "flex",
	flexFlow: "column",
	justifyContent: "center",
	alignItems: "center",
};
const modalStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

// Modal
const CropImage = ({ src, modalOpen, setModalOpen, uid }) => {
	const dispatch = useDispatch();
	const [slideValue, setSlideValue] = useState(10);
	const cropRef = useRef(null);
	const handleChangeUserImage = async () => {
		if (cropRef) {
			const dataUrl = cropRef.current.getImage().toDataURL();
			const result = await fetch(dataUrl);
			const img = await result.blob();
			if (img === null || img === undefined) {
				return;
			}
			dispatch(setUserImage({ uid, img }));
			setModalOpen(false);
			toast("User image has been changed!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<Modal sx={modalStyle} open={modalOpen}>
			<Box sx={boxStyle}>
				<AvatarEditor
					ref={cropRef}
					image={src}
					style={{ width: "100%", height: "100%" }}
					border={50}
					borderRadius={150}
					color={[0, 0, 0, 0.72]}
					scale={slideValue / 50}
					rotate={0}
				/>

				{/* MUI Slider */}
				<Slider
					min={10}
					max={50}
					sx={{
						margin: "0 auto",
						width: "80%",
						color: "cyan",
					}}
					size="medium"
					defaultValue={slideValue}
					value={slideValue}
					onChange={(e) => setSlideValue(e.target.value)}
				/>
				<Box
					sx={{
						display: "flex",
						padding: "10px",
						background: "black",
					}}
				>
					<Button
						size="small"
						sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
						variant="outlined"
						onClick={(e) => setModalOpen(false)}
					>
						cancel
					</Button>
					<Button
						sx={{ background: "#5596e6" }}
						size="small"
						variant="contained"
						onClick={handleChangeUserImage}
					>
						Save
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

// Container

// const CropImage = () => {
// 	const [src, setSrc] = useState(null);
// 	// preview
// 	const [preview, setPreview] = useState(null);
// 	// modal state
// 	const [modalOpen, setModalOpen] = useState(false);
// 	// ref to control input element
// 	const inputRef = useRef(null);
// 	// handle Click
// 	const handleInputClick = (e) => {
// 		e.preventDefault();
// 		inputRef.current.click();
// 	};
// 	// handle Change
// 	const handleImgChange = (e) => {
// 		setSrc(e.target.files[0]);
// 		setModalOpen(true);
// 	};
// 	return (
// 		<>
// 			<main className="container">
// 				<CropperModal
// 					modalOpen={modalOpen}
// 					src={src}
// 					setPreview={setPreview}
// 					setModalOpen={setModalOpen}
// 				/>
// 				<a href="/" onClick={handleInputClick}>
// 					<div className="add-icon" />
// 				</a>
// 				<small>Click to select image</small>
// 				<input
// 					type="file"
// 					accept="image/*"
// 					ref={inputRef}
// 					onChange={handleImgChange}
// 				/>
// 				<div className="img-container">
// 					<img
// 						src={
// 							preview ||
// 							" https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
// 						}
// 						alt=""
// 						width="200"
// 						height="200"
// 					/>
// 				</div>
// 			</main>
// 		</>
// 	);
// };

export default CropImage;
