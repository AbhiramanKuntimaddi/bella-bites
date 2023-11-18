import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BellaBites",
	description:
		"Not that she can! Well, a fun practical website for a brother and a sister who sometimes forget what food they fed their cat!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="!scroll-smooth">
			<body
				className={`${inter.className} bg-[#d6d5c9] text-[#a22c29] relative pt-20 sm:pt-16 dark:bg-[#a22c29] dark:text-[#d6d5c9] flex flex-col min-h-screen`}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
