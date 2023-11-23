"use client";

import React, { useEffect, useState } from "react";
import { Jua } from "next/font/google";
import FloatingActionButton from "@/components/floating-action.button";
import FeedingModal from "@/components/feeding-modal";
import { getFeedingData, getFeedingDataLast7Days } from "@/lib/firebase";
import FeedingCard from "@/components/feeding-card";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/header";

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

	const fadeInAnimationVariants = {
		initial: { opacity: 0, y: 100 },
		animate: (index: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: 0.05 * index },
		}),
	};

	// Use effect to fetch feeding data when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getFeedingDataLast7Days();
				console.log(data);
				setFeedingData(data);
			} catch (error) {
				console.error("Error fetching feeding data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<main className="App flex flex-col items-center justify-between text-center p-10">
			<Header />
			<motion.div
				className="text-5xl sm:text-8xl mb-6 relative"
				initial={{ y: 0, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 5 }}>
				🐱
				<motion.span
					className="inline-flex items-center absolute rounded-md bg-[#a22c29] text-[#d6d5c9] dark:bg-[#d6d5c9] dark:text-[#a22c29] px-2 py-1 text-sm font-medium ring-1 ring-inset ring-gray-500/10 !top-0 !right-0"
					initial={{ rotate: 45 }}
					animate={{ rotate: [10, 5, -5, -10, 0, 5, 10] }}
					transition={{
						repeat: Infinity,
						duration: 3,
						type: "tween",
						stiffness: 260,
						damping: 20,
					}}>
					Meow!
				</motion.span>
			</motion.div>
			<motion.h1
				className={`${jua.className} text-2xl sm:text-5xl `}
				initial={{ x: -600, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}>
				Every meal matters for your cat. <br />
				<p className="underline hover:decoration-wavy">Bella agrees!</p>
			</motion.h1>
			<div className="mt-8">
				<AnimatePresence>
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 shadow-lg"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						{feedingData.map((entry, index) => (
							<motion.div
								className="shadow-2xl"
								key={entry.id}
								initial={{ opacity: 0, y: 50, rotate: 10 }}
								animate={{ opacity: 1, y: 0, rotate: 0 }}
								transition={{
									duration: 0.7,
									delay: index * 0.2,
									ease: "easeInOut",
								}}>
								<FeedingCard entry={entry} />
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
			<FloatingActionButton />
			{isModalOpen && <FeedingModal onClose={handleCloseModal} />}
		</main>
	);
}
