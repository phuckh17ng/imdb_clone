import { Dismiss } from "flowbite";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	adminRemoveMovie,
	adminUndoRemoveMovie,
} from "../../../features/admin/adminService";
import { DeleteIcon, FileEditIcon } from "../flowbiteIcon";
import { DeleteModal, UndoRemoveModal } from "./FlowbiteModals";

const MovieItem = ({ movieId, _name, dayCreate, lastModified }) => {
	const movieState = useSelector((state) => state.admin);
	const { movie, isDeleted, isLoading } = movieState;
	const dispatch = useDispatch();

	const [removeAlertModal, setRemoveAlertModal] = useState(false);
	const handleCancleRemove = () => {
		const targetEl = document.getElementById("alert-additional-content-2");
		const triggerEl = document.getElementById("triggerElement");
		const dismiss = new Dismiss(targetEl, triggerEl);
		console.log(targetEl, triggerEl);
		dismiss.hide();
		setRemoveAlertModal(false);
	};

	const handleRemove = () => {
		dispatch(adminRemoveMovie(movieId)).then(() => {
			setRemoveAlertModal(false);
			setRemoveSuccessModal(true);
		});
	};

	const [removeSuccessModal, setRemoveSuccessModal] = useState(false);
	const handleCancleRemoveSuccess = () => {
		const targetEl = document.getElementById("alert-additional-content-1");
		const triggerEl = document.getElementById("cancle-remove-success-btn");
		const dismiss = new Dismiss(targetEl, triggerEl);
		dismiss.hide();
		setRemoveSuccessModal(false);
	};

	const handleUndoDelete = () => {
		dispatch(adminUndoRemoveMovie(movieId)).then(() => {
			setRemoveSuccessModal(false);
		});
	};
	return (
		<div>
			{!isDeleted.some((item) => item === movieId) && (
				<div
					className={`border-b border-zinc-300/50 content-table w-full items-center py-2 px-3 h-full hover:bg-zinc-100/60 ${
						removeAlertModal || removeSuccessModal ? "bg-zinc-100/60" : ""
					}`}
				>
					<div className="text-zinc-500">{movieId}</div>
					<div className="text-zinc-800">
						<span className="hover:underline cursor-pointer">{_name}</span>
					</div>
					<div className="text-end text-zinc-500">{dayCreate}</div>
					<div className="text-end text-zinc-500">--</div>
					<div className="text-end flex justify-end pr-2 items-center">
						{FileEditIcon}
					</div>
					<div className="text-end flex justify-end pr-3 items-center">
						<span onClick={() => setRemoveAlertModal(true)}>{DeleteIcon}</span>
					</div>
				</div>
			)}

			<DeleteModal
				removeAlertModal={removeAlertModal}
				movieId={movieId}
				handleRemove={handleRemove}
				handleCancleRemove={handleCancleRemove}
			/>

			<UndoRemoveModal
				removeSuccessModal={removeSuccessModal}
				movieId={movieId}
				handleUndoDelete={handleUndoDelete}
				handleCancleRemoveSuccess={handleCancleRemoveSuccess}
			/>
		</div>
	);
};

export default MovieItem;
