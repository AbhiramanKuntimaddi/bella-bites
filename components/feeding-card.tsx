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

const getEmoticon = (what: string) => {
	switch (what.toLowerCase()) {
		case "chicken":
			return "🐔";
		case "duck":
			return "🦆";
		case "lamb":
			return "🐑";
		case "tuna":
			return "🐟";
		case "turkey":
			return "🦃";
		default:
			return null;
	}
};

export default function FeedingCard({ entry }: FeedingCardProps) {
	const isMorning = entry.selectedTime === "Morning";
	const isAbhin = entry.selectedWho === "Abhin";

	return (
		<div
			className={`${jua.className} relative bg-[#a22c29] dark:bg-[#d6d5c9] text-[#d6d5c9] dark:text-[#a22c29] p-4 rounded-lg shadow-md w-[25rem] lg:w-[35rem]`}>
			<div className="text-2xl">{entry.selectedDay}</div>
			<div>
				Time: {entry.selectedTime} {isMorning ? "☀️" : "🌒"}
			</div>
			<div>
				Who: {entry.selectedWho}
				{isAbhin ? "👾" : "🐒"}
			</div>
			<div>
				What: {entry.selectedWhat} {getEmoticon(entry.selectedWhat)}{" "}
			</div>
		</div>
	);
}
