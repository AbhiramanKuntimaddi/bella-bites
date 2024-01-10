"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaTimes, FaCat } from "react-icons/fa";
import OptionCard from "./option-card";
import { days, times, whoOptions, whatOptions } from "@/lib/data";
import { addFeedingData } from "@/lib/firebase"; // Assuming you have a module for Firebase functions
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";

interface FeedingModalProps {
	onClose: () => void;
}

const NavigationButton = ({ onClick, text, disabled }: any) => (
	<motion.button
		className={`text-[#a22c29] dark:text-[#d6d5c9] bg-[#d6d5c9] dark:bg-[#a22c29] border border-[#d6d5c9] p-2 rounded-md`}
		whileHover={{ scale: 1.1 }}
		onClick={onClick}
		disabled={disabled}>
		{text}
	</motion.button>
);

export default function FeedingModal({
	onClose,
}: FeedingModalProps): JSX.Element {
	const [selectedDay, setSelectedDay] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [selectedWho, setSelectedWho] = useState("");
	const [selectedWhat, setSelectedWhat] = useState("");
	const [section, setSection] = useState<"DayTime" | "WhoWhat">("DayTime");
	const [isAnimating, setIsAnimating] = useState(false);

	const controls = useAnimation();

	useEffect(() => {
		controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
	}, [controls]);

	const isDayTimeSection = section === "DayTime";

	const allOptionsSelected =
		selectedDay !== "" &&
		selectedTime !== "" &&
		selectedWho !== "" &&
		selectedWhat !== "";

	const handleFeedingSubmit = async () => {
		if (allOptionsSelected) {
			setIsAnimating(true);

			const feedingData = {
				selectedDay,
				selectedTime,
				selectedWho,
				selectedWhat,
				timestamp: Timestamp.fromDate(new Date()),
			};

			// Add data to Firestore
			await addFeedingData(feedingData);

			console.log("Bella is fed!", feedingData);
			setTimeout(() => {
				setIsAnimating(false);
				onClose();
				window.location.reload();
			}, 500); // Adjust the timeout to match your desired animation duration
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
			<motion.div
				className={`relative top-0 w-full max-w-md mx-auto my-6 lg:max-w-2xl xl:max-w-3xl ${
					isAnimating ? "pointer-events-none" : ""
				}`}
				initial={{ opacity: 0, y: -50 }}
				animate={controls}>
				<div className="bg-[#a22c29] text-[#d6d5c9] p-8 rounded-lg shadow-lg dark:bg-[#d6d5c9] dark:text-[#a22c29]">
					<button
						className="absolute top-0 right-0 p-2"
						onClick={onClose}
						aria-label="Close Modal">
						<FaTimes size={20} />
					</button>

					{/* Section Transition */}
					<AnimatePresence mode="wait">
						{isDayTimeSection ? (
							<motion.div key="DayTime">
								<OptionCard
									title="Day"
									options={days}
									selectedOption={selectedDay}
									onSelectOption={setSelectedDay}
								/>
								<OptionCard
									title="Time"
									options={times}
									selectedOption={selectedTime}
									onSelectOption={setSelectedTime}
								/>
							</motion.div>
						) : (
							<motion.div key="WhoWhat">
								<OptionCard
									title="What"
									options={whatOptions}
									selectedOption={selectedWhat}
									onSelectOption={setSelectedWhat}
								/>
								<OptionCard
									title="Who"
									options={whoOptions}
									selectedOption={selectedWho}
									onSelectOption={setSelectedWho}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-5">
						{section === "DayTime" && (
							<>
								<NavigationButton
									onClick={() => setSection("DayTime")}
									text="Previous"
									disabled={true} // Disable the button in the "DayTime" section
								/>
								<NavigationButton
									onClick={() => setSection("WhoWhat")}
									text="Next"
								/>
							</>
						)}
						{section === "WhoWhat" && (
							<>
								<NavigationButton
									onClick={() => setSection("DayTime")}
									text="Previous"
								/>
								<motion.button
									className={`p-2 rounded-md ${
										allOptionsSelected
											? "bg-[#d6d5c9] text-[#a22c29] dark:bg-[#a22c29] dark:text-[#d6d5c9]"
											: "bg-[#a22c29] text-[#d6d5c9] dark:bg-[#d6d5c9] dark:text-[#a22c29] cursor-not-allowed"
									}`}
									whileHover={{ scale: allOptionsSelected ? 1.1 : 1 }}
									onClick={handleFeedingSubmit}
									disabled={!allOptionsSelected}>
									<div className="flex gap-3 justify-center items-center">
										Bella is fed <FaCat />
									</div>
								</motion.button>
							</>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
}
