import React from "react";
import Seat from "./Seat";
import "./SeatRow.css";

const SeatRow = ({ row, name, ticket }) => {
	return (
		<div className="flex justify-between">
			<div className="grid grid-cols-7 gap-2 w-[65%]">
				{row.map((item, index) => {
					if (index < 7) {
						return (
							<Seat
								name={name}
								number={item.seat}
								key={item.seat}
								ticket={ticket}
								status={item.status}
							/>
						);
					}
				})}
			</div>
			<div className="grid grid-cols-3 w-[28%] gap-2">
				{row.map((item, index) => {
					if (index >= 7) {
						return (
							<Seat
								name={name}
								number={item.seat}
								key={item.seat}
								ticket={ticket}
								status={item.status}
							/>
						);
					}
				})}
			</div>
		</div>
	);
};

export default SeatRow;
