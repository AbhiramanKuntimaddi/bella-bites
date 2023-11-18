import { motion } from "framer-motion";
import { useState } from "react";
import FeedingModal from "./feeding-modal";
import { Jua } from "next/font/google";
import { FaBowlFood } from "react-icons/fa6"

const jua = Jua({
	weight: "400",
	subsets: ["latin"],
});

interface FloatingActionButtonProps {}

function FloatingActionButton({}: FloatingActionButtonProps): JSX.Element {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleButtonClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<motion.button
				className={`${jua.className} flex items-center justify-center fixed bottom-8 right-8 bg-[#a22c29] text-[#d6d5c9] text-lg p-4 w-20 rounded-full dark:bg-[#d6d5c9] dark:text-[#a22c29]`}
				whileHover={{ scale: 1.2 }}
				onClick={handleButtonClick}>
				 <FaBowlFood className="mr-1 flex items-center justify-center" /> {" "} Log
			</motion.button>

			{isModalOpen && <FeedingModal onClose={handleCloseModal} />}
		</>
	);
}

export default FloatingActionButton;