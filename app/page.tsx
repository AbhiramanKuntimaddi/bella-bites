"use client";

import { Jua } from "next/font/google";
import FloatingActionButton from "@/components/floating-action.button";
import FeedingModal from "@/components/feeding-modal";

const jua = Jua({
	weight: "400",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between text-center p-10">
			<div className="text-2xl sm:text-6xl mb-6">🐱</div>
			<h1 className={`${jua.className} text-2xl sm:text-5xl !top-0`}>
				Every meal matters for your cat. <br />
				Bella agrees!
			</h1>
			<FloatingActionButton />
		</main>
	);
}