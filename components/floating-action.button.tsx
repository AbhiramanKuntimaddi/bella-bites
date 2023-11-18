import { motion } from "framer-motion";
import { useState } from "react";
import FeedingModal from "./feeding-modal";
import { Jua } from "next/font/google";
import { FaBowlFood } from "react-icons/fa6";

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
				className={`${jua.className} flex items-center justify-center fixed bottom-8 right-8 bg-[#a22c29] text-[#d6d5c9] text-lg p-4 w-24 rounded-full dark:bg-[#d6d5c9] dark:text-[#a22c29] shadow-2xl`}
				whileHover={{  }}
				onClick={handleButtonClick}
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ ease: "easeOut", duration: 2 }}>
				🍛 Log
			</motion.button>

			{isModalOpen && <FeedingModal onClose={handleCloseModal} />}
		</>
	);
}

export default FloatingActionButton;
