"use client";

import React from "react";
import { motion } from "framer-motion";

interface OptionCardProps {
	title: string;
	options: readonly string[];
	selectedOption: string;
	onSelectOption: (option: string) => void;
}

export default function OptionCard({
	title,
	options,
	selectedOption,
	onSelectOption,
}: OptionCardProps): JSX.Element {
	return (
		<motion.div
			className="p-4 border border-[#d6d5c9] rounded-md mb-4 mt-5 dark:border-[#a22c29]"
			initial={{ opacity: 0}}
			animate={{ opacity: 1}}
			transition={{ duration: 0.7, ease: "easeInOut" }}>
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<div className="grid grid-cols-2 gap-4 text-[#a22c29] dark:text-[#d6d5c9]">
				{options.map((option, index) => (
					<motion.button
						key={option}
						className={`p-2 border ${
							selectedOption === option
								? "bg-[#a22c29] dark:bg-[#a22c29] text-[#d6d5c9] dark:text-[#d6d5c9]"
								: " !text-[#a22c29] dark:text-[#d6d5c9] bg-[#d6d5c9]"
						} rounded-md`}
						onClick={() => onSelectOption(option)}
						initial={{ opacity: 0, y: 50, rotate: 10 }}
						animate={{ opacity: 1, y: 0, rotate: 0 }}
						transition={{
							duration: 0.7,
							delay: index * 0.2,
							ease: "easeInOut",
						}}>
						{option}
					</motion.button>
				))}
			</div>
		</motion.div>
	);
}
