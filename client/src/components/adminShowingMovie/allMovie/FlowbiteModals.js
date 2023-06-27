import styles from "./MovieItem.module.css";

export const DeleteModal = ({
	removeAlertModal,
	movieId,
	handleRemove,
	handleCancleRemove,
}) => {
	return (
		<div
			id="alert-additional-content-2"
			class={`${
				removeAlertModal
					? "-translate-x-0 !opacity-100 !visible"
					: "translate-x-full opacity-0 invisible"
			} transition-all duration-300 ease-in-out p-4 mt-3 mr-6 fixed top-0 right-0 text-red-800 border border-red-300 rounded-lg bg-red-50 ${
				styles.modal
			}`}
			role="alert"
		>
			<div class="flex items-center">
				<svg
					aria-hidden="true"
					class="w-5 h-5 mr-2"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					></path>
				</svg>
				<span class="sr-only">Info</span>
				<h3 class="text-lg font-medium">
					Warning for operations on{" "}
					<span className="font-extrabold">{movieId}</span>
				</h3>
			</div>
			<div class="mt-2 mb-4 text-sm">
				Select <span className="font-bold">Delete</span> means you will
				permanently remove this movie from the playlist.
				<br /> Please double-check the information before proceeding.
			</div>
			<div class="flex">
				<button
					onClick={handleRemove}
					type="button"
					class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>
					Delete
				</button>
				<button
					type="button"
					id="triggerElement"
					class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
					data-dismiss-target="#alert-additional-content-2"
					aria-label="Close"
					onClick={handleCancleRemove}
				>
					Cancle
				</button>
			</div>
		</div>
	);
};

export const UndoRemoveModal = ({
	movieId,
	handleUndoDelete,
	handleCancleRemoveSuccess,
	removeSuccessModal,
}) => {
	return (
		<div
			id="alert-additional-content-1"
			class={`${
				removeSuccessModal
					? "-translate-x-0 !opacity-100 !visible"
					: "translate-x-full opacity-0 invisible"
			} transition-all ease-in-out duration-300 p-4 mt-3 mr-6 fixed top-0 right-0 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 ${
				styles.modal
			}`}
			role="alert"
		>
			<div class="flex items-center">
				<svg
					aria-hidden="true"
					class="w-5 h-5 mr-2"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					></path>
				</svg>
				<span class="sr-only">Info</span>
				<h3 class="text-lg font-medium">Successfully Deleted</h3>
			</div>
			<div class="mt-2 mb-4 text-sm">
				You have been deleted movie
				<span className="font-bold"> {movieId}</span>
			</div>
			<div class="flex">
				<button
					onClick={handleUndoDelete}
					type="button"
					class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Undo
				</button>
				<button
					id="cancle-remove-success-btn"
					type="button"
					class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
					data-dismiss-target="#alert-additional-content-1"
					aria-label="Close"
					onClick={handleCancleRemoveSuccess}
				>
					Cancle
				</button>
			</div>
		</div>
	);
};
