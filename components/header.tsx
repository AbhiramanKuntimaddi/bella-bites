"use client";

import { motion } from "framer-motion";
import React from "react";
import { Jua } from "next/font/google";

const jua = Jua({
	weight: "400",
	subsets: ["latin"],
});

export default function Header() {
	return (
		<header className="z-[999] relative">
			<motion.div
				className="fixed top-6 rounded-full left-1/2 h-[3.5rem] w-[10rem] shadow-lg backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[15rem] sm:rounded-full bg-[#a22c29] dark:bg-[#d6d5c9] dark:text-[#a22c29] text-[#d6d5c9] flex items-center justify-center"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}>
				<div className={`${jua.className} text-2xl`}>😸 BellaBites 😸</div>
			</motion.div>
		</header>
	);
}
