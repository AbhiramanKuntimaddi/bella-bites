import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BellaBites",
	description: "Not that she can!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-[#d6d5c9] text-[#a22c29] relative pt-28 sm:pt-36 dark:bg-[#a22c29] dark:text-[#d6d5c9]`}>
				{children}
			</body>
		</html>
	);
}
