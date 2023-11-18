// FeedingCard.tsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Jua } from "next/font/google";

const jua = Jua({
	weight: "400",
	subsets: ["latin"],
});

interface FeedingCardProps {
	entry: {
		selectedDay: string;
		selectedTime: string;
		selectedWho: string;
		selectedWhat: string;
	};
}

export default function FeedingCard({ entry }: FeedingCardProps) {
	const isMorning = entry.selectedTime === "Morning";

	return (
		<div className="mt-8">
			<h2 className={`${jua.className} text-2xl font-bold mb-8`}>Feeding History</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div
					className={`${jua.className} bg-[#a22c29] dark:bg-[#d6d5c9] text-[#d6d5c9] dark:text-[#a22c29] p-4 rounded-lg shadow-md`}>
					<div>Day: {entry.selectedDay}</div>
					<div>Time: {entry.selectedTime}</div>
					<div>Who: {entry.selectedWho}</div>
					<div>What: {entry.selectedWhat}</div>
					{isMorning ? <FaSun size={20} /> : <FaMoon size={20} />}
				</div>
			</div>
		</div>
	);
}
