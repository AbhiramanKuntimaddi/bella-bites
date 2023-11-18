"use client";

import React, { useEffect, useState } from "react";
import { Jua } from "next/font/google";
import FloatingActionButton from "@/components/floating-action.button";
import FeedingModal from "@/components/feeding-modal";
import { getFeedingData } from "@/lib/firebase";
import FeedingCard from "@/components/feeding-card";

// Interface for the feeding entry
interface FeedingEntry {
	id: string;
	selectedDay: string;
	selectedTime: string;
	selectedWho: string;
	selectedWhat: string;
}

// Jua font configuration
const jua = Jua({
	weight: "400",
	subsets: ["latin"],
});

// Home component
export default function Home(): JSX.Element {
	// State to store feeding data
	const [feedingData, setFeedingData] = useState<FeedingEntry[]>([]);

	// State for modal visibility
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to close the modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Function to open the modal
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	// Use effect to fetch feeding data when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getFeedingData();
				setFeedingData(data);
			} catch (error) {
				console.error("Error fetching feeding data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<main className="flex flex-col items-center justify-between text-center p-10">
			<div className="text-2xl sm:text-6xl mb-6">🐱</div>
			<h1 className={`${jua.className} text-2xl sm:text-5xl !top-0`}>
				Every meal matters for your cat. <br />
				Bella agrees!
			</h1>
			{feedingData.map((entry) => (
				<FeedingCard key={entry.id} entry={entry} />
			))}
			<FloatingActionButton />
			{isModalOpen && <FeedingModal onClose={handleCloseModal} />}
		</main>
	);
}
