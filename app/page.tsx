"use client";

import React, { useEffect, useState } from "react";
import { Jua } from "next/font/google";
import FloatingActionButton from "@/components/floating-action.button";
import FeedingModal from "@/components/feeding-modal";
import { getFeedingData } from "@/lib/firebase";
import FeedingCard from "@/components/feeding-card";
import { motion } from "framer-motion";

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
			<motion.h1
				className={`${jua.className} text-2xl`}
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				BellaBites
			</motion.h1>
			<motion.div
				className="text-2xl sm:text-8xl mb-6"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				🐱
			</motion.div>
			<motion.h1 className={`${jua.className} text-2xl sm:text-5xl `}
			initial={{ x: -600, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.8 }}>
				Every meal matters for your cat. <br />
				<p className="underline hover:decoration-wavy">Bella agrees!</p>
			</motion.h1>
			<div className="mt-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
					{feedingData.map((entry) => (
						<FeedingCard key={entry.id} entry={entry} />
					))}
				</div>
			</div>
			<FloatingActionButton />
			{isModalOpen && <FeedingModal onClose={handleCloseModal} />}
		</main>
	);
}
